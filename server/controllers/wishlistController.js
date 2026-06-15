import mongoose from 'mongoose';
import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.id })
      .populate('product')
      .sort('-createdAt'); // Sort by newest added first

    res.status(200).json({
      success: true,
      count: wishlist.length,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return next(new AppError('Product ID is required', 400));
    }

    // 1) Verify the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError('No product found with that ID', 404));
    }

    // 2) Prevent duplicate wishlist entries
    const existingItem = await Wishlist.findOne({ user: req.user.id, product: productId });
    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Product already exists in wishlist',
      });
    }

    const newItem = await Wishlist.create({
      user: req.user.id,
      product: productId,
    });

    const populatedItem = await newItem.populate('product');

    res.status(201).json({
      success: true,
      message: 'Added to wishlist',
      data: populatedItem,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find wishlist item belonging to the current user (by either wishlist entry ID or product ID)
    let wishlistItem = await Wishlist.findOne({ user: req.user.id, _id: mongoose.Types.ObjectId.isValid(id) ? id : null });
    
    if (!wishlistItem) {
      // Try searching by product ID
      wishlistItem = await Wishlist.findOne({ user: req.user.id, product: id });
    }

    if (!wishlistItem) {
      return next(new AppError('No wishlist item found with that ID or product ID belonging to you', 404));
    }

    await Wishlist.findByIdAndDelete(wishlistItem._id);

    res.status(200).json({
      success: true,
      message: 'Removed from wishlist',
    });
  } catch (error) {
    next(error);
  }
};
