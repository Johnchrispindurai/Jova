import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Cart item must refer to a product.'],
  },
  color: {
    name: { type: String, required: true },
    hex: { type: String, required: true },
  },
  size: {
    type: String,
    required: [true, 'Cart item must have a selected size.'],
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1.'],
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Cart must belong to a user.'],
    unique: true,
  },
  items: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
