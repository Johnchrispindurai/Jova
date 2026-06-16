import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getMyOrders } from '../controllers/orderController.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function testController() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas.");

    // Mock request
    const req = {
      user: {
        _id: new mongoose.Types.ObjectId('6a2ffea1a9cc00ed9cded391'),
        role: 'user'
      }
    };

    // Mock response
    const res = {
      statusCode: 200,
      headers: {},
      set: function(hdrs) {
        Object.assign(this.headers, hdrs);
        return this;
      },
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        console.log("\n--- RESPONSE RECEIVED ---");
        console.log("Status Code:", this.statusCode);
        console.log("Response Body:", JSON.stringify(data, null, 2));
      }
    };

    const next = (err) => {
      console.error("Next called with error:", err);
    };

    await getMyOrders(req, res, next);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error running test:", error);
  }
}

testController();
