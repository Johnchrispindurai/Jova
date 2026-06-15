import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

// Centralized cart calculations utility supporting future coupon discounts
export const calculateCartTotals = (cart) => {
  // Filter out any items with missing products (data integrity check)
  const validItems = cart.items.filter((item) => item.product);

  const subtotal = validItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const estimatedTax = Math.round(subtotal * 0.05);
  // Free shipping if subtotal >= 4,999, else flat 199. 0 shipping fee if cart is empty.
  const shipping = subtotal >= 4999 || subtotal === 0 ? 0 : 199;
  const discount = 0; // Default discount placeholder for future coupons
  const total = subtotal + estimatedTax + shipping - discount;
  const count = validItems.reduce((acc, item) => acc + item.quantity, 0);

  // Sort items newest-first based on createdAt timestamp
  const sortedItems = [...validItems].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return {
    subtotal,
    estimatedTax,
    shipping,
    discount,
    total,
    count,
    data: sortedItems,
  };
};

// Helper to get a populated cart for a user, creating it if it doesn't exist
const getPopulatedUserCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

// GET /api/cart
export const getCart = async (req, res, next) => {
  try {
    const cart = await getPopulatedUserCart(req.user.id);
    const totals = calculateCartTotals(cart);

    res.status(200).json({
      success: true,
      ...totals,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/cart
export const addToCart = async (req, res, next) => {
  try {
    const { productId, color, size, quantity = 1 } = req.body;

    if (!productId || !color || !size) {
      return next(new AppError('Product ID, color, and size are required', 400));
    }

    if (quantity < 1) {
      return next(new AppError('Quantity must be at least 1', 400));
    }

    // 1) Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // 2) Reject products where inStock is false
    if (!product.inStock) {
      return next(new AppError('Product is currently out of stock', 400));
    }

    // 3) Validate size selection
    const isSizeValid = product.sizes.includes(size);
    if (!isSizeValid) {
      return next(new AppError(`Invalid size selection. Available sizes: ${product.sizes.join(', ')}`, 400));
    }

    // 4) Validate color selection
    const isColorValid = product.colors.some(
      (c) => c.name.toLowerCase() === color.name.toLowerCase() && c.hex.toLowerCase() === color.hex.toLowerCase()
    );
    if (!isColorValid) {
      return next(new AppError('Invalid color selection for this product', 400));
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    // 5) Check if exact variant already exists (product, size, color.name)
    const existingIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color.name.toLowerCase() === color.name.toLowerCase()
    );

    let message = 'Added to cart';

    if (existingIndex > -1) {
      // Merge quantity
      cart.items[existingIndex].quantity += quantity;
      message = 'Cart updated';
    } else {
      // Add new cart item
      cart.items.push({
        product: productId,
        color,
        size,
        quantity,
        createdAt: new Date(),
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    // Populate and get latest calculations
    const populatedCart = await getPopulatedUserCart(req.user.id);
    const totals = calculateCartTotals(populatedCart);

    res.status(200).json({
      success: true,
      message,
      data: totals,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/cart/:id
export const updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params; // Subdocument item ID
    const { quantity } = req.body;

    if (quantity === undefined) {
      return next(new AppError('Quantity is required', 400));
    }

    const qtyNum = Number(quantity);
    if (isNaN(qtyNum) || qtyNum < 1 || qtyNum > 10) {
      return next(new AppError('Quantity must be between 1 and 10', 400));
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return next(new AppError('No cart found for this user', 404));
    }

    const itemIndex = cart.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return next(new AppError('No cart item found with that ID', 404));
    }

    // Update quantity
    cart.items[itemIndex].quantity = qtyNum;
    cart.updatedAt = Date.now();
    await cart.save();

    const populatedCart = await getPopulatedUserCart(req.user.id);
    const totals = calculateCartTotals(populatedCart);

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      data: totals,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart/:id
export const removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.params; // Subdocument item ID

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return next(new AppError('No cart found for this user', 404));
    }

    const itemIndex = cart.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return next(new AppError('No cart item found with that ID', 404));
    }

    cart.items.splice(itemIndex, 1);
    cart.updatedAt = Date.now();
    await cart.save();

    const populatedCart = await getPopulatedUserCart(req.user.id);
    const totals = calculateCartTotals(populatedCart);

    res.status(200).json({
      success: true,
      message: 'Removed from cart',
      data: totals,
    });
  } catch (error) {
    next(error);
  }
};
