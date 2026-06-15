import express from 'express';
import {
  getUsers,
  updateUserRole,
  updateOrderStatus,
  getAnalytics
} from '../controllers/adminController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes and restrict them to admin only
router.use(protect, restrictTo('admin'));

router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/analytics', getAnalytics);

export default router;
