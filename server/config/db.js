import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../models/Product.js';
import { User } from '../models/User.js';
import bcryptjs from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Auto-seeding function for memory database
const seedInMemoryDB = async () => {
  try {
    // 1) Seed Admin User
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        name: 'Administrator',
        email: 'admin@jova.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('InMemoryDB: Seeded default administrator (admin@jova.com / admin123).');
    }

    // 2) Seed Products from src/data/products.ts
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      const filePath = path.join(__dirname, '../../src/data/products.ts');
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonMarker = 'export const MOCK_PRODUCTS: Product[] = ';
        const markerIndex = fileContent.indexOf(jsonMarker);
        if (markerIndex > -1) {
          let jsonStr = fileContent.substring(markerIndex + jsonMarker.length).trim();
          if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1).trim();
          const productsArray = JSON.parse(jsonStr);
          const mappedProducts = productsArray.map((p) => {
            const newProduct = { ...p };
            delete newProduct.id;
            delete newProduct.reviews;
            return newProduct;
          });
          await Product.insertMany(mappedProducts);
          console.log(`InMemoryDB: Successfully seeded ${productsArray.length} products.`);
        }
      }
    }
  } catch (err) {
    console.error('InMemoryDB: Failed to seed database:', err.message);
  }
};

export const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000, // 3 seconds timeout
    });
    console.log(`MongoDB Connected successfully to Atlas: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB Atlas Connection Failed: ${error.message}`);
    console.log('Spinning up Local In-Memory MongoDB Server as fallback...');
    try {
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB Connected successfully to In-Memory DB: ${conn.connection.host}`);
      await seedInMemoryDB();
    } catch (memError) {
      console.error(`MongoDB Memory Server Failed: ${memError.message}`);
    }
  }
};
