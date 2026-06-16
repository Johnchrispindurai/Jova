import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in env");
  process.exit(1);
}

const orderSchema = new mongoose.Schema({}, { strict: false });
const Order = mongoose.model('Order', orderSchema, 'orders');

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model('User', userSchema, 'users');

async function checkOrders() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas successfully.");

    const users = await User.find({}).limit(5);
    console.log("\n--- USERS IN DB ---");
    users.forEach(u => {
      console.log(`User: ${u.get('name')} | Email: ${u.get('email')} | ID: ${u._id}`);
    });

    const orders = await Order.find({});
    console.log(`\nFound ${orders.length} orders in total.`);

    console.log("\n--- ORDERS IN DB ---");
    orders.forEach((o, index) => {
      console.log(`\nOrder #${index + 1}:`);
      console.log(`  ID: ${o._id}`);
      console.log(`  User: ${o.get('user')} (Type: ${typeof o.get('user')}, Constructor: ${o.get('user')?.constructor?.name})`);
      console.log(`  Date: ${o.get('date')}`);
      console.log(`  Total Amount: ${o.get('totalAmount')}`);
      console.log(`  Payment Method: ${o.get('paymentMethod')}`);
      console.log(`  Items Count: ${o.get('items')?.length}`);
      console.log(`  Items preview:`, JSON.stringify(o.get('items')));
    });

    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB.");
  } catch (error) {
    console.error("Error checking orders:", error);
  }
}

checkOrders();
