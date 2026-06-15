import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import AppError from '../utils/AppError.js';

// Ensure uploads folder exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 1) Configure Cloudinary if credentials exist
let isCloudinaryConfigured = false;
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  isCloudinaryConfigured = true;
  console.log('Cloudinary storage service configured successfully.');
} else {
  console.log('Cloudinary credentials missing. Falling back to local disk storage uploads.');
}

// 2) Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// File filter (images only)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files are allowed!', 400), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Helper service to upload files to Cloudinary if configured
export const uploadToCloudinary = async (filePath) => {
  if (!isCloudinaryConfigured) {
    // If not configured, return relative static server url path
    const normalizedPath = filePath.replace(/\\/g, '/'); // Windows support
    return `/${normalizedPath}`;
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'jova_products',
    });

    // Delete local temp file after upload
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    // Return local path on failure to prevent crash
    return `/${filePath.replace(/\\/g, '/')}`;
  }
};

// Middleware wrapper to handle multiple uploads and convert to paths/urls
export const handleImageUploads = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  try {
    const uploadPromises = req.files.map(async (file) => {
      const url = await uploadToCloudinary(file.path);
      return url;
    });

    // Replace the files array with resolved string URLs
    req.body.images = await Promise.all(uploadPromises);
    next();
  } catch (error) {
    next(error);
  }
};
