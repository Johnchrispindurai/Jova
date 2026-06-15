import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router.route('/')
  .get(getWishlist)
  .post(addToWishlist);

router.route('/:id')
  .delete(removeFromWishlist);

export default router;
