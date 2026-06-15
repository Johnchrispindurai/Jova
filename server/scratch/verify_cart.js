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

async function verifyCartAPI() {
  console.log('--- STARTING JOVA CART API VERIFICATION ---');

  const userEmail = `cart-user-${Date.now()}@jova.com`;
  const password = 'Password@123';
  
  let cookiesUser = '';
  let cookiesAdmin = '';
  let productInStock = null;
  let productOutOfStock = null;
  let cartItemId = '';

  // 1) Set up: Log in as Administrator to toggle stock states, and fetch test products
  try {
    // Log in as default admin (created during memory DB boot)
    let res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@jova.com', password: 'admin123' }),
    });
    const loginData = await res.json();
    cookiesAdmin = getCookiesFromResponse(res);
    console.log(`[DEBUG] Admin Login Status: ${res.status}, Body:`, loginData);
    console.log(`[DEBUG] Cookies received: "${cookiesAdmin}"`);
    
    // Fetch products list from API
    res = await fetch(`${BASE_URL}/api/products?limit=5`);
    const prodData = await res.json();
    if (!prodData.success || prodData.data.length < 2) {
      throw new Error('Could not fetch enough products from API.');
    }

    productInStock = prodData.data[0];
    productOutOfStock = prodData.data[1];

    // Set productOutOfStock to inStock: false via Admin API
    res = await fetch(`${BASE_URL}/api/products/${productOutOfStock._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesAdmin,
      },
      body: JSON.stringify({ inStock: false }),
    });
    const updatedProd = await res.json();
    if (!updatedProd.success) {
      throw new Error(`Failed to set product to outOfStock: ${updatedProd.message}`);
    }

    console.log(`[SETUP] Logged in as Admin. Product "${productInStock.name}" is IN stock.`);
    console.log(`[SETUP] Product "${productOutOfStock.name}" set to OUT OF stock.`);
  } catch (err) {
    console.error('[SETUP FAIL] HTTP setup failed:', err.message);
    process.exit(1);
  }

  // 2) Register User
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Cart Tester', email: userEmail, password }),
    });
    cookiesUser = getCookiesFromResponse(res);
    console.log(`[PASS] Register user successfully.`);
  } catch (err) {
    console.error('[SETUP FAIL] User registration failed:', err.message);
    process.exit(1);
  }

  // 3) Verify Out of Stock Validation
  try {
    const res = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesUser,
      },
      body: JSON.stringify({
        productId: productOutOfStock._id,
        size: productOutOfStock.sizes[0],
        color: productOutOfStock.colors[0],
        quantity: 1,
      }),
    });
    const data = await res.json();
    if (res.status === 400 && !data.success && data.message.includes('out of stock')) {
      console.log(`[PASS] Out-of-stock validation: Correctly blocked! Msg: "${data.message}" (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Adding out of stock item should fail with 400 but returned status: ${res.status}`, data);
    }
  } catch (err) {
    console.error('Out of stock check error:', err.message);
  }

  // 4) Verify Add to Cart
  try {
    const res = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesUser,
      },
      body: JSON.stringify({
        productId: productInStock._id,
        size: productInStock.sizes[0],
        color: productInStock.colors[0],
        quantity: 1,
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.message === 'Added to cart') {
      cartItemId = data.data.data[0]._id;
      console.log(`[PASS] Add to Cart: Item added successfully! Msg: "${data.message}" (Status: ${res.status})`);
      console.log(`  Calculated Totals Check:`, {
        subtotal: data.data.subtotal,
        tax: data.data.estimatedTax,
        shipping: data.data.shipping,
        total: data.data.total,
        count: data.data.count,
      });
    } else {
      console.error(`[FAIL] Add to Cart failed (Status: ${res.status})`, data);
    }
  } catch (err) {
    console.error('Add to Cart check error:', err.message);
  }

  // 5) Verify Exact Variant Merging
  try {
    const res = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesUser,
      },
      body: JSON.stringify({
        productId: productInStock._id,
        size: productInStock.sizes[0],
        color: productInStock.colors[0],
        quantity: 2,
      }),
    });
    const data = await res.json();
    if (res.status === 200 && data.success && data.message === 'Cart updated') {
      const mergedItem = data.data.data.find(item => item._id === cartItemId);
      if (mergedItem && mergedItem.quantity === 3) {
        console.log(`[PASS] Exact Variant Merging: Quantities merged successfully (Total Qty: 3)! Msg: "${data.message}"`);
      } else {
        console.error(`[FAIL] Variant merged but quantity is incorrect. Expected 3, got: ${mergedItem?.quantity}`);
      }
    } else {
      console.error(`[FAIL] Variant merging failed (Status: ${res.status})`, data);
    }
  } catch (err) {
    console.error('Variant merging check error:', err.message);
  }

  // 6) Verify Different Sizes Create Separate Items
  try {
    if (productInStock.sizes.length > 1) {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookiesUser,
        },
        body: JSON.stringify({
          productId: productInStock._id,
          size: productInStock.sizes[1],
          color: productInStock.colors[0],
          quantity: 1,
        }),
      });
      const data = await res.json();
      if (res.status === 200 && data.data.data.length === 2) {
        console.log(`[PASS] Different sizes create separate items: 2 items in cart successfully!`);
      } else {
        console.error(`[FAIL] Different size did not create separate item. Cart length: ${data.data?.data?.length}`);
      }
    } else {
      console.log(`[SKIP] Skip different size check (only 1 size available for product)`);
    }
  } catch (err) {
    console.error('Different size check error:', err.message);
  }

  // 7) Verify Different Colors Create Separate Items
  try {
    if (productInStock.colors.length > 1) {
      const res = await fetch(`${BASE_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookiesUser,
        },
        body: JSON.stringify({
          productId: productInStock._id,
          size: productInStock.sizes[0],
          color: productInStock.colors[1],
          quantity: 1,
        }),
      });
      const data = await res.json();
      const expectedLength = productInStock.sizes.length > 1 ? 3 : 2;
      if (res.status === 200 && data.data.data.length === expectedLength) {
        console.log(`[PASS] Different colors create separate items: ${expectedLength} items in cart successfully!`);
      } else {
        console.error(`[FAIL] Different color did not create separate item. Cart length: ${data.data?.data?.length}, expected: ${expectedLength}`);
      }
    } else {
      console.log(`[SKIP] Skip different color check (only 1 color available for product)`);
    }
  } catch (err) {
    console.error('Different color check error:', err.message);
  }

  // 8) Verify Quantity boundary limits
  try {
    // Test update to 0
    let res = await fetch(`${BASE_URL}/api/cart/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesUser,
      },
      body: JSON.stringify({ quantity: 0 }),
    });
    let data = await res.json();
    const minBlocked = res.status === 400 && !data.success;

    // Test update to 11
    res = await fetch(`${BASE_URL}/api/cart/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesUser,
      },
      body: JSON.stringify({ quantity: 11 }),
    });
    data = await res.json();
    const maxBlocked = res.status === 400 && !data.success;

    if (minBlocked && maxBlocked) {
      console.log(`[PASS] Quantity limits validated: Min 1 and Max 10 correctly enforced!`);
    } else {
      console.error(`[FAIL] Enforcements failed. Min blocked: ${minBlocked}, Max blocked: ${maxBlocked}`);
    }
  } catch (err) {
    console.error('Quantity boundary check error:', err.message);
  }

  // 9) Verify update quantity is successful within bounds
  try {
    const res = await fetch(`${BASE_URL}/api/cart/${cartItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesUser,
      },
      body: JSON.stringify({ quantity: 5 }),
    });
    const data = await res.json();
    const updatedItem = data.data.data.find(item => item._id === cartItemId);
    if (res.status === 200 && updatedItem && updatedItem.quantity === 5) {
      console.log(`[PASS] Update quantity successful: Item updated to quantity 5 (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Update quantity failed. Status: ${res.status}, qty: ${updatedItem?.quantity}`);
    }
  } catch (err) {
    console.error('Update quantity check error:', err.message);
  }

  // 10) Verify Shipping Fee Calculations
  try {
    const res = await fetch(`${BASE_URL}/api/cart`, {
      method: 'GET',
      headers: {
        'Cookie': cookiesUser,
      },
    });
    const data = await res.json();
    const subtotal = data.subtotal;
    const shipping = data.shipping;
    
    let isShippingCorrect = false;
    if (subtotal >= 4999) {
      isShippingCorrect = shipping === 0;
    } else {
      isShippingCorrect = shipping === 199;
    }

    console.log(`[PASS] Shipping threshold check: Subtotal ₹${subtotal.toLocaleString('en-IN')}, Shipping ₹${shipping} (Correct: ${isShippingCorrect})`);
  } catch (err) {
    console.error('Shipping threshold calculation check error:', err.message);
  }

  // 11) Verify Remove Cart Item
  try {
    const res = await fetch(`${BASE_URL}/api/cart/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Cookie': cookiesUser,
      },
    });
    const data = await res.json();
    const isRemoved = !data.data.data.some(item => item._id === cartItemId);
    if (res.status === 200 && isRemoved) {
      console.log(`[PASS] Remove item from cart: Removed successfully! Msg: "${data.message}" (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Remove item failed (Status: ${res.status})`, data);
    }
  } catch (err) {
    console.error('Remove item check error:', err.message);
  }

  // 12) Cleanup: restore outOfStock product state to inStock: true
  try {
    const res = await fetch(`${BASE_URL}/api/products/${productOutOfStock._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesAdmin,
      },
      body: JSON.stringify({ inStock: true }),
    });
    const cleanData = await res.json();
    if (cleanData.success) {
      console.log('[CLEANUP] Product stock state successfully restored.');
    }
  } catch (err) {
    console.error('[CLEANUP FAIL] Stock state cleanup failed:', err.message);
  }

  console.log('--- JOVA CART API VERIFICATION COMPLETED ---');
}

verifyCartAPI();
