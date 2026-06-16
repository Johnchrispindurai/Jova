import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: 'server/.env' });

const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;

const getCookiesFromResponse = (res) => {
  if (typeof res.headers.getSetCookie === 'function') {
    return res.headers.getSetCookie().map(c => c.split(';')[0]).join('; ');
  }
  const setCookie = res.headers.get('set-cookie');
  if (!setCookie) return '';
  return setCookie.split(',').map(c => c.split(';')[0].trim()).join('; ');
};

async function runTests() {
  console.log('--- STARTING JOVA ORDER/COD FLOW VERIFICATION ---');

  const emailA = `order-a-${Date.now()}@jova.com`;
  const emailB = `order-b-${Date.now()}@jova.com`;
  const password = 'Password@123';

  let cookiesA = '';
  let cookiesB = '';
  let userIdA = '';
  let userIdB = '';
  let product = null;

  // 1) Register User A
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'User A', email: emailA, password }),
    });
    const data = await res.json();
    if (res.status === 201) {
      cookiesA = getCookiesFromResponse(res);
      userIdA = data.data.user._id || data.data.user.id;
      console.log(`[PASS] Registered User A (ID: ${userIdA}, Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Register User A failed: ${data.message} (Status: ${res.status})`);
      process.exit(1);
    }
  } catch (err) {
    console.error('User A Register error:', err.message);
    process.exit(1);
  }

  // 2) Register User B
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'User B', email: emailB, password }),
    });
    const data = await res.json();
    if (res.status === 201) {
      cookiesB = getCookiesFromResponse(res);
      userIdB = data.data.user._id || data.data.user.id;
      console.log(`[PASS] Registered User B (ID: ${userIdB}, Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Register User B failed: ${data.message} (Status: ${res.status})`);
      process.exit(1);
    }
  } catch (err) {
    console.error('User B Register error:', err.message);
    process.exit(1);
  }

  // 3) Fetch a product to purchase
  try {
    const res = await fetch(`${BASE_URL}/api/products?limit=1`);
    const data = await res.json();
    if (res.status === 200 && data.success && data.data.length > 0) {
      product = data.data[0];
      console.log(`[PASS] Fetched product for purchase: "${product.name}" (ID: ${product._id})`);
    } else {
      console.error('[FAIL] Could not fetch products for test');
      process.exit(1);
    }
  } catch (err) {
    console.error('Fetch products error:', err.message);
    process.exit(1);
  }

  // 4) Add product to User A's cart
  try {
    const color = product.colors[0];
    const size = product.sizes[0];
    const res = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesA
      },
      body: JSON.stringify({
        productId: product._id,
        color,
        size,
        quantity: 1
      })
    });
    const data = await res.json();
    if (res.status === 200 || res.status === 201) {
      console.log(`[PASS] Added product to User A cart (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Add to cart failed: ${data.message} (Status: ${res.status})`);
      process.exit(1);
    }
  } catch (err) {
    console.error('Add to cart error:', err.message);
    process.exit(1);
  }

  // 5) Verify User A's cart has items
  try {
    const res = await fetch(`${BASE_URL}/api/cart`, {
      method: 'GET',
      headers: { 'Cookie': cookiesA }
    });
    const data = await res.json();
    if (res.status === 200 && data.data && data.data.length > 0) {
      console.log(`[PASS] User A cart verified. Items count: ${data.data.length}`);
    } else {
      console.error(`[FAIL] User A cart was empty after adding item`);
      process.exit(1);
    }
  } catch (err) {
    console.error('Verify cart error:', err.message);
    process.exit(1);
  }

  // 6) Place a Cash on Delivery (COD) order for User A
  let createdOrderId = '';
  try {
    const orderPayload = {
      items: [
        {
          product: product._id,
          quantity: 1,
          color: product.colors[0],
          size: product.sizes[0]
        }
      ],
      shippingAddress: {
        firstName: 'John',
        lastName: 'Doe',
        email: emailA,
        phone: '1234567890',
        address: '12 Luxury Avenue',
        city: 'Delhi',
        postalCode: '110001',
        country: 'India'
      },
      paymentMethod: 'COD' // Testing upper case
    };

    const res = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesA
      },
      body: JSON.stringify(orderPayload)
    });
    const data = await res.json();

    if (res.status === 201) {
      const order = data.data.order;
      createdOrderId = order._id;
      console.log(`[PASS] COD Order successfully created with Status 201!`);
      
      // Verify Schema Stores required fields
      if (order.user.toString() === userIdA) {
        console.log(`[PASS] Schema validation: user ID correctly associated with order`);
      } else {
        console.error(`[FAIL] Schema validation: user ID mismatch. Expected: ${userIdA}, got: ${order.user}`);
      }

      if (order.items && order.items.length === 1 && order.items[0].product.toString() === product._id) {
        console.log(`[PASS] Schema validation: items snapshot correctly stored`);
      } else {
        console.error(`[FAIL] Schema validation: items snapshot missing or incorrect`);
      }

      if (order.totalAmount && typeof order.totalAmount === 'number') {
        console.log(`[PASS] Schema validation: totalAmount is stored correctly: ${order.totalAmount}`);
      } else {
        console.error(`[FAIL] Schema validation: totalAmount is missing or invalid`);
      }

      if (order.paymentMethod === 'COD') {
        console.log(`[PASS] Schema validation: paymentMethod is stored exactly as "COD"`);
      } else {
        console.error(`[FAIL] Schema validation: paymentMethod expected "COD", got: "${order.paymentMethod}"`);
      }

      if (order.paymentStatus === 'Pending') {
        console.log(`[PASS] Schema validation: paymentStatus defaults to "Pending" for COD`);
      } else {
        console.error(`[FAIL] Schema validation: paymentStatus expected "Pending", got: "${order.paymentStatus}"`);
      }

      if (order.orderStatus === 'Pending') {
        console.log(`[PASS] Schema validation: orderStatus is initialized as "Pending"`);
      } else {
        console.error(`[FAIL] Schema validation: orderStatus expected "Pending", got: "${order.orderStatus}"`);
      }

      if (order.createdAt) {
        console.log(`[PASS] Schema validation: createdAt is stored correctly: ${order.createdAt}`);
      } else {
        console.error(`[FAIL] Schema validation: createdAt is missing`);
      }
    } else {
      console.error(`[FAIL] Place order failed: ${data.message} (Status: ${res.status})`);
      process.exit(1);
    }
  } catch (err) {
    console.error('Place order error:', err.message);
    process.exit(1);
  }

  // 7) Verify User A's cart is cleared in MongoDB
  try {
    const res = await fetch(`${BASE_URL}/api/cart`, {
      method: 'GET',
      headers: { 'Cookie': cookiesA }
    });
    const data = await res.json();
    if (res.status === 200 && data.data && data.data.length === 0) {
      console.log(`[PASS] User A cart was successfully cleared in MongoDB after order creation!`);
    } else {
      console.error(`[FAIL] User A cart was NOT cleared. Items count: ${data?.data?.length}`);
    }
  } catch (err) {
    console.error('Verify cart cleared error:', err.message);
  }

  // 8) Verify GET /orders fetches only orders belonging to req.user (Isolation verification)
  try {
    // Check User A's orders
    const resA = await fetch(`${BASE_URL}/api/orders`, {
      method: 'GET',
      headers: { 'Cookie': cookiesA }
    });
    const dataA = await resA.json();
    const ordersA = dataA.data.orders;
    if (resA.status === 200 && ordersA.length === 1 && ordersA[0]._id === createdOrderId) {
      console.log(`[PASS] GET /orders for User A fetched exactly User A's order.`);
    } else {
      console.error(`[FAIL] GET /orders for User A returned wrong count or order mismatch:`, ordersA);
    }

    // Check User B's orders
    const resB = await fetch(`${BASE_URL}/api/orders`, {
      method: 'GET',
      headers: { 'Cookie': cookiesB }
    });
    const dataB = await resB.json();
    const ordersB = dataB.data.orders;
    if (resB.status === 200 && ordersB.length === 0) {
      console.log(`[PASS] Isolation test: GET /orders for User B returned 0 orders (isolated per authenticated user).`);
    } else {
      console.error(`[FAIL] Isolation test failed: GET /orders for User B returned User A's order or non-empty list:`, ordersB);
    }
  } catch (err) {
    console.error('Isolation verification error:', err.message);
  }

  console.log('--- JOVA ORDER/COD FLOW VERIFICATION COMPLETED ---');
}

runTests();
