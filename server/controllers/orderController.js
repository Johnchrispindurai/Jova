import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

export const createOrder = async (req, res, next) => {
  try {
    console.log("createOrder - req.user:", req.user);
    console.log("createOrder - req.user.id:", req.user?.id);
    console.log("createOrder - req.user._id:", req.user?._id);

    const authenticatedUserId = req.user?._id || req.user?.id || req.user?.userId;
    if (!authenticatedUserId) {
      return next(new AppError('User authentication details are missing', 401));
    }

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

      // Resolve image safely
      const itemImage = (Array.isArray(dbProduct.images) && dbProduct.images.length > 0)
        ? dbProduct.images[0]
        : '/placeholder-image.jpg';

      // Resolve color defensively
      let itemColor = { name: 'Default', hex: '#000000' };
      if (item.color && typeof item.color === 'object' && item.color.name && item.color.hex) {
        itemColor = { name: String(item.color.name), hex: String(item.color.hex) };
      } else if (Array.isArray(dbProduct.colors) && dbProduct.colors.length > 0) {
        const firstColor = dbProduct.colors[0];
        itemColor = { name: firstColor.name, hex: firstColor.hex };
      }

      // Resolve size defensively
      const itemSize = item.size 
        ? String(item.size) 
        : (Array.isArray(dbProduct.sizes) && dbProduct.sizes.length > 0 ? dbProduct.sizes[0] : 'One Size');

      // Resolve quantity defensively
      const itemQuantity = (typeof item.quantity === 'number' && item.quantity > 0)
        ? item.quantity
        : 1;

      // Add details to items snapshot
      const itemSubtotal = dbProduct.price * itemQuantity;
      subtotal += itemSubtotal;

      orderItems.push({
        product: dbProduct._id,
        name: dbProduct.name,
        price: dbProduct.price,
        image: itemImage,
        color: itemColor,
        size: itemSize,
        quantity: itemQuantity,
      });
    }

    // 2) Shipping Fee calculation (Free shipping on orders above ₹4,999)
    const shippingFee = subtotal > 4999 ? 0 : 150;
    const totalAmount = subtotal + shippingFee;

    // 3) Payment status default logic
    const paymentStatus = paymentMethod === 'cod' ? 'Pending' : 'Paid';

    // 4) Create Order
    const newOrder = await Order.create({
      user: new mongoose.Types.ObjectId(authenticatedUserId),
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
    console.log("getMyOrders - req.user:", req.user);
    console.log("getMyOrders - req.user.id:", req.user?.id);
    console.log("getMyOrders - req.user._id:", req.user?._id);

    const authenticatedUserId = req.user?._id || req.user?.id || req.user?.userId;
    if (!authenticatedUserId) {
      return next(new AppError('User authentication details are missing', 401));
    }

    const userObjectId = new mongoose.Types.ObjectId(authenticatedUserId);
    const orders = await Order.find({ user: userObjectId }).sort('-createdAt');
    console.log("GET /orders response:", orders);

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

    const authenticatedUserId = req.user?._id || req.user?.id || req.user?.userId;
    if (!authenticatedUserId) {
      return next(new AppError('User authentication details are missing', 401));
    }

    // Restrict access to order owner or admin users
    if (order.user.toString() !== authenticatedUserId.toString() && req.user.role !== 'admin') {
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
