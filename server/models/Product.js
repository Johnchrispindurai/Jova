import mongoose from 'mongoose';

const colorOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
    min: [0, 'Price must be positive'],
  },
  description: {
    type: String,
    required: [true, 'A product must have a description'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'A product must belong to a category (men/women)'],
    enum: {
      values: ['men', 'women'],
      message: 'Category is either: men or women',
    },
  },
  subcategory: {
    type: String,
    required: [true, 'A product must have a subcategory'],
    trim: true,
  },
  images: {
    type: [String],
    required: [true, 'A product must have at least one image'],
  },
  colors: {
    type: [colorOptionSchema],
    required: [true, 'A product must have at least one color option'],
  },
  sizes: {
    type: [String],
    required: [true, 'A product must have sizes'],
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  isEditorsPick: {
    type: Boolean,
    default: false,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  isSeasonal: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  badge: {
    type: String,
    enum: ['New', 'Trending', 'Best Seller', 'Limited Edition', null],
    default: null,
  },
  details: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual populate for reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

export const Product = mongoose.model('Product', productSchema);
export default Product;
