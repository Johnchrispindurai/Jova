import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';

// Load environment variables
dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is not set in environment variables');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for admin seeding...');

    const adminEmail = 'admin@jova.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(`Admin account with email "${adminEmail}" already exists. Skipping creation.`);
      process.exit(0);
    }

    await User.create({
      name: 'JOVA Admin',
      email: adminEmail,
      password: 'Admin@123',
      role: 'admin',
    });

    console.log('Successfully created JOVA Admin account.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
