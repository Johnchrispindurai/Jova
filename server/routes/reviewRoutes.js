import express from 'express';
import { getProductReviews, createReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateReview } from '../middleware/validate.js';

const router = express.Router();

router.get('/:productId', getProductReviews);
router.post('/', protect, validateReview, createReview);

export default router;
