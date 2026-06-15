import Product from '../models/Product.js';
import AppError from '../utils/AppError.js';

export const getAllProducts = async (req, res, next) => {
  try {
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields', 'search'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // Build Mongo Query Filter
    const filter = {};

    // Category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Subcategory (support comma separated values e.g. "Shirts,T-Shirts")
    if (req.query.subcategory) {
      const subcategories = req.query.subcategory.split(',');
      filter.subcategory = { $in: subcategories };
    }

    // Sizes
    if (req.query.size) {
      const sizes = req.query.size.split(',');
      filter.sizes = { $in: sizes };
    }

    // Colors
    if (req.query.color) {
      const colors = req.query.color.split(',');
      filter['colors.name'] = { $in: colors };
    }

    // Price Max & Min
    if (req.query.priceMin || req.query.priceMax) {
      filter.price = {};
      if (req.query.priceMin) filter.price.$gte = Number(req.query.priceMin);
      if (req.query.priceMax) filter.price.$lte = Number(req.query.priceMax);
    }

    // Badges
    if (req.query.badge) {
      filter.badge = req.query.badge;
    }

    // Search query by name / description / subcategory / details
    if (req.query.search) {
      const q = req.query.search.trim();
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { subcategory: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { details: { $regex: q, $options: 'i' } },
      ];
    }

    // Dynamic Merchandising Flags
    if (req.query.isBestSeller) filter.isBestSeller = req.query.isBestSeller === 'true';
    if (req.query.isNewArrival) filter.isNewArrival = req.query.isNewArrival === 'true';
    if (req.query.isTrending) filter.isTrending = req.query.isTrending === 'true';
    if (req.query.isEditorsPick) filter.isEditorsPick = req.query.isEditorsPick === 'true';
    if (req.query.isSeasonal) filter.isSeasonal = req.query.isSeasonal === 'true';
    if (req.query.isFeatured) filter.isFeatured = req.query.isFeatured === 'true';

    // 2) Sorting
    let sortBy = '-createdAt';
    if (req.query.sort) {
      const sort = req.query.sort;
      if (sort === 'newest' || sort === 'Newest') {
        sortBy = '-createdAt';
      } else if (sort === 'best-selling' || sort === 'bestSelling' || sort === 'Best Selling') {
        sortBy = '-reviewCount';
      } else if (sort === 'price-low' || sort === 'priceLowToHigh' || sort === 'Price Low to High') {
        sortBy = 'price';
      } else if (sort === 'price-high' || sort === 'priceHighToLow' || sort === 'Price High to Low') {
        sortBy = '-price';
      } else if (sort === 'rating' || sort === 'highestRated' || sort === 'Highest Rated') {
        sortBy = '-rating';
      } else if (sort === 'featured' || sort === 'Featured') {
        sortBy = '-isFeatured -createdAt';
      }
    }

    // 3) Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Execute query
    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
      },
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'name avatar',
      },
    });

    if (!product) {
      return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };

    // Parse nested string arrays/objects if sent from forms
    if (typeof productData.colors === 'string') {
      productData.colors = JSON.parse(productData.colors);
    }
    if (typeof productData.sizes === 'string') {
      productData.sizes = JSON.parse(productData.sizes);
    }
    if (typeof productData.details === 'string') {
      productData.details = JSON.parse(productData.details);
    }
    if (typeof productData.images === 'string') {
      productData.images = JSON.parse(productData.images);
    }

    // Apply file path arrays if images are uploaded
    if (req.files && req.files.length > 0) {
      const fileUrls = req.files.map((file) => file.path || `/uploads/${file.filename}`);
      productData.images = fileUrls;
    }

    const newProduct = await Product.create(productData);

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };

    if (typeof productData.colors === 'string') {
      productData.colors = JSON.parse(productData.colors);
    }
    if (typeof productData.sizes === 'string') {
      productData.sizes = JSON.parse(productData.sizes);
    }
    if (typeof productData.details === 'string') {
      productData.details = JSON.parse(productData.details);
    }
    if (typeof productData.images === 'string') {
      productData.images = JSON.parse(productData.images);
    }

    if (req.files && req.files.length > 0) {
      const fileUrls = req.files.map((file) => file.path || `/uploads/${file.filename}`);
      productData.images = fileUrls;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, productData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
