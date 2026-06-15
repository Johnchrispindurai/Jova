import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { upload, handleImageUploads } from '../services/uploadService.js';
import { validateProduct } from '../middleware/validate.js';

const router = express.Router();

router.route('/')
  .get(getAllProducts)
  .post(
    protect,
    restrictTo('admin'),
    upload.array('images', 5),
    handleImageUploads,
    validateProduct,
    createProduct
  );

router.route('/:id')
  .get(getProduct)
  .put(
    protect,
    restrictTo('admin'),
    upload.array('images', 5),
    handleImageUploads,
    updateProduct
  )
  .delete(
    protect,
    restrictTo('admin'),
    deleteProduct
  );

export default router;
