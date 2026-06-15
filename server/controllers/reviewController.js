import Review from '../models/Review.js';
import AppError from '../utils/AppError.js';

export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name avatar')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    // Check if the user already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingReview) {
      return next(new AppError('You have already submitted a review for this product.', 400));
    }

    const newReview = await Review.create({
      user: req.user.id,
      product: productId,
      rating,
      comment,
    });

    const populatedReview = await newReview.populate('user', 'name avatar');

    res.status(201).json({
      status: 'success',
      data: {
        review: populatedReview,
      },
    });
  } catch (error) {
    next(error);
  }
};
