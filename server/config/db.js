import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `MongoDB Connected successfully to Atlas: ${conn.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};
