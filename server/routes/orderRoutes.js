import express from 'express';
import { createOrder, getMyOrders, getOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateOrder } from '../middleware/validate.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(validateOrder, createOrder)
  .get(getMyOrders);

router.route('/:id')
  .get(getOrder);

export default router;
