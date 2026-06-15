import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/Product.js';

// Load environment variables
dotenv.config({ path: './.env' });

const seedProducts = async () => {
  try {
    // 1) Connect to DB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jova';
    await mongoose.connect(mongoUri);
    console.log('Database connected for seeding products...');

    // 2) Read products.ts file from frontend
    const filePath = path.resolve('../src/data/products.ts');
    if (!fs.existsSync(filePath)) {
      throw new Error(`Frontend products file not found at: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Extract JSON part: everything after "MOCK_PRODUCTS: Product[] = "
    const jsonMarker = 'export const MOCK_PRODUCTS: Product[] = ';
    const markerIndex = fileContent.indexOf(jsonMarker);
    if (markerIndex === -1) {
      throw new Error('Could not find MOCK_PRODUCTS marker in products.ts');
    }

    let jsonStr = fileContent.substring(markerIndex + jsonMarker.length).trim();
    
    // Remove trailing semicolon if present
    if (jsonStr.endsWith(';')) {
      jsonStr = jsonStr.slice(0, -1).trim();
    }

    // Parse the products JSON array
    const productsArray = JSON.parse(jsonStr);
    console.log(`Parsed ${productsArray.length} products successfully from frontend.`);

    // 3) Delete existing products
    await Product.deleteMany({});
    console.log('Cleared existing products from database.');

    // 4) Insert products (removing or mapping IDs if mongoose generates them automatically)
    // We map id string to _id or keep it as ID since we lookup by product ID
    const mappedProducts = productsArray.map((p) => {
      // Map id to Mongoose ObjectId if desired, or let mongoose handle it and store id as a string
      // To match frontend, keeping product id as string is fine, but using mongoose ObjectIds is standard.
      // Let's generate _id and keep standard Mongo behavior, keeping product.id as is (e.g. a string).
      const newProduct = { ...p };
      delete newProduct.id; // Let mongoose generate _id
      // Ensure reviews is empty (will populate dynamically)
      delete newProduct.reviews;
      return newProduct;
    });

    await Product.insertMany(mappedProducts);
    console.log('Successfully seeded 100 premium products into MongoDB!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
