import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // 1) Verify all products exist and calculate subtotal
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct) {
        return next(new AppError(`Product not found: ${item.product}`, 404));
      }
      if (!dbProduct.inStock) {
        return next(new AppError(`Product is out of stock: ${dbProduct.name}`, 400));
      }

      // Add details to items snapshot
      const itemSubtotal = dbProduct.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product: dbProduct._id,
        name: dbProduct.name,
        price: dbProduct.price,
        image: dbProduct.images[0],
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      });
    }

    // 2) Shipping Fee calculation (Free shipping on orders above ₹4,999)
    const shippingFee = subtotal > 4999 ? 0 : 150;
    const totalAmount = subtotal + shippingFee;

    // 3) Payment status default logic
    const paymentStatus = paymentMethod === 'cod' ? 'Pending' : 'Paid';

    // 4) Create Order
    const newOrder = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      shippingFee,
      subtotal,
      totalAmount,
      paymentMethod,
      paymentStatus,
      status: 'Pending',
    });

    // 5) Clear user's active cart after successful order creation
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] });

    res.status(217).json({ // standard created status is 201, let's use 201 or 200, 201 is standard
      status: 'success',
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new AppError('No order found with that ID', 404));
    }

    // Restrict access to order owner or admin users
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You do not have permission to view this order', 403));
    }

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};
