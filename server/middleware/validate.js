import AppError from '../utils/AppError.js';

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !name.trim()) return next(new AppError('Name is required', 400));
  if (!email || !email.trim()) return next(new AppError('Email is required', 400));
  if (!password) return next(new AppError('Password is required', 400));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError('Please provide a valid email address', 400));
  }
  if (password.length < 8) {
    return next(new AppError('Password must be at least 8 characters long', 400));
  }
  if (!/[A-Z]/.test(password)) {
    return next(new AppError('Password must contain at least one uppercase letter', 400));
  }
  if (!/[a-z]/.test(password)) {
    return next(new AppError('Password must contain at least one lowercase letter', 400));
  }
  if (!/\d/.test(password)) {
    return next(new AppError('Password must contain at least one number', 400));
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !email.trim()) return next(new AppError('Email is required', 400));
  if (!password) return next(new AppError('Password is required', 400));
  next();
};

export const validateProduct = (req, res, next) => {
  const { name, price, category, subcategory, colors, sizes } = req.body;
  if (!name || !name.trim()) return next(new AppError('Product name is required', 400));
  if (price === undefined || price < 0) return next(new AppError('Valid product price is required', 400));
  if (!category || !['men', 'women'].includes(category)) {
    return next(new AppError('Product category must be either "men" or "women"', 400));
  }
  if (!subcategory || !subcategory.trim()) return next(new AppError('Product subcategory is required', 400));
  next();
};

export const validateReview = (req, res, next) => {
  const { productId, rating, comment } = req.body;
  if (!productId) return next(new AppError('Product ID is required', 400));
  if (rating === undefined || rating < 1 || rating > 5) {
    return next(new AppError('Rating must be an integer between 1 and 5', 400));
  }
  if (!comment || !comment.trim()) return next(new AppError('Review comment text is required', 400));
  next();
};

export const validateOrder = (req, res, next) => {
  const { items, shippingAddress, paymentMethod } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new AppError('Order items are required and must be an array', 400));
  }
  if (!shippingAddress) return next(new AppError('Shipping address is required', 400));
  const { firstName, lastName, email, phone, address, city, postalCode, country } = shippingAddress;
  if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode || !country) {
    return next(new AppError('Complete shipping address (first/last name, email, phone, address, city, postalCode, country) is required', 400));
  }
  if (!paymentMethod || !['card', 'upi', 'cod', 'COD'].includes(paymentMethod)) {
    return next(new AppError('Valid payment method ("card", "upi", "cod", "COD") is required', 400));
  }
  next();
};
