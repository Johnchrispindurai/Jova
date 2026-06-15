import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';

dotenv.config();

const checkCounts = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is not set in environment variables');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for checking collection counts...');

    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const adminUser = await User.findOne({ role: 'admin' });

    console.log('\n--- JOVA BACKEND VERIFICATION REPORT ---');
    console.log(`Total Users in Database: ${userCount}`);
    console.log(`Total Products in Database: ${productCount}`);
    console.log(`Admin Account Created: ${adminUser ? 'Yes (Verified)' : 'No'}`);
    if (adminUser) {
      console.log(`  Admin Name: ${adminUser.name}`);
      console.log(`  Admin Email: ${adminUser.email}`);
      console.log(`  Admin Role: ${adminUser.role}`);
    }
    console.log('----------------------------------------\n');

    process.exit(0);
  } catch (error) {
    console.error('Error checking counts:', error);
    process.exit(1);
  }
};

checkCounts();
