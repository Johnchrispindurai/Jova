import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../models/Product.js';

// Load environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const seedProducts = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is not set in environment variables');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for product seeding...');

    // Resolve products.ts path
    const filePath = path.join(__dirname, '../../src/data/products.ts');
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

    // Delete existing products
    await Product.deleteMany({});
    console.log('Cleared existing products from database.');

    // Map products to remove id, ensuring mongoose auto-generates ObjectIds
    const mappedProducts = productsArray.map((p) => {
      const newProduct = { ...p };
      delete newProduct.id;
      delete newProduct.reviews;
      return newProduct;
    });

    await Product.insertMany(mappedProducts);
    console.log(`Successfully seeded ${productsArray.length} products into MongoDB.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
