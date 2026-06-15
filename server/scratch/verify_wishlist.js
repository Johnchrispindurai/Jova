import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;

const getCookiesFromResponse = (res) => {
  if (typeof res.headers.getSetCookie === 'function') {
    return res.headers.getSetCookie().map(c => c.split(';')[0]).join('; ');
  }
  const setCookie = res.headers.get('set-cookie');
  if (!setCookie) return '';
  return setCookie.split(',').map(c => c.split(';')[0].trim()).join('; ');
};

async function verifyWishlistAPI() {
  console.log('--- STARTING JOVA WISHLIST API VERIFICATION ---');

  const userAEmail = `wishlist-user-a-${Date.now()}@jova.com`;
  const userBEmail = `wishlist-user-b-${Date.now()}@jova.com`;
  const password = 'Password@123';
  
  let cookiesUserA = '';
  let cookiesUserB = '';
  let productId = '';
  let wishlistEntryId = '';

  // 1) Set up Users & Login
  try {
    // Register User A
    let res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'User A', email: userAEmail, password }),
    });
    cookiesUserA = getCookiesFromResponse(res);

    // Register User B
    res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'User B', email: userBEmail, password }),
    });
    cookiesUserB = getCookiesFromResponse(res);

    // Get a valid Product ID
    res = await fetch(`${BASE_URL}/api/products?limit=1`);
    const data = await res.json();
    productId = data.data[0]._id;
    console.log(`[SETUP] Users registered. Test Product ID: "${productId}"`);
  } catch (err) {
    console.error('[SETUP FAIL] Could not set up test users:', err.message);
    return;
  }

  // 2) Test Add to Wishlist
  try {
    const res = await fetch(`${BASE_URL}/api/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesUserA,
      },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();
    if (res.status === 201 && data.success) {
      wishlistEntryId = data.data._id;
      console.log(`[PASS] Add to Wishlist: Product added successfully! Msg: "${data.message}" (Status: ${res.status})`);
      console.log(`  Sample Response data:`, JSON.stringify(data.data, null, 2));
    } else {
      console.error(`[FAIL] Add to Wishlist failed (Status: ${res.status})`, data);
    }
  } catch (err) {
    console.error('Add to wishlist check error:', err.message);
  }

  // 3) Test Reject Duplicate Addition
  try {
    const res = await fetch(`${BASE_URL}/api/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesUserA,
      },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();
    if (res.status === 400 && !data.success) {
      console.log(`[PASS] Reject Duplicate Addition: Correctly blocked! Msg: "${data.message}" (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Duplicate addition should return 400 but returned status: ${res.status}`);
    }
  } catch (err) {
    console.error('Duplicate wishlist check error:', err.message);
  }

  // 4) Test Reject Invalid Product ID
  try {
    const res = await fetch(`${BASE_URL}/api/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesUserA,
      },
      body: JSON.stringify({ productId: '60c72b2f9b1d8a23456789a0' }), // non-existent object ID
    });
    const data = await res.json();
    if (res.status === 404) {
      console.log(`[PASS] Reject Invalid Product ID: Correctly blocked! Msg: "${data.message}" (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Invalid product should return 404 but returned status: ${res.status}`);
    }
  } catch (err) {
    console.error('Invalid product wishlist check error:', err.message);
  }

  // 5) Test Retrieve Wishlist & Verify populate + newest-first sort order
  try {
    // Add second product to test ordering
    const resProd = await fetch(`${BASE_URL}/api/products?limit=2`);
    const dataProd = await resProd.json();
    const secondProductId = dataProd.data[1]._id;

    await fetch(`${BASE_URL}/api/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookiesUserA,
      },
      body: JSON.stringify({ productId: secondProductId }),
    });

    const res = await fetch(`${BASE_URL}/api/wishlist`, {
      method: 'GET',
      headers: {
        'Cookie': cookiesUserA,
      },
    });
    const data = await res.json();
    if (res.status === 200 && data.success) {
      const isPopulated = data.data[0].product && data.data[0].product.name;
      // Check sorting: newest first (element 0 should be second product added)
      const isSortedNewestFirst = data.data[0].product._id === secondProductId;

      console.log(`[PASS] GET /api/wishlist: Retrieved wishlist with count: ${data.count} (Status: ${res.status})`);
      console.log(`  Product Populate verified: ${isPopulated}`);
      console.log(`  Newest-first ordering verified: ${isSortedNewestFirst}`);
    } else {
      console.error(`[FAIL] GET /api/wishlist failed (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Retrieve wishlist check error:', err.message);
  }

  // 6) Test Authorization: Prevent Deleting Another User's Wishlist Item
  try {
    // Attempt to delete User A's item using User B's cookies
    const res = await fetch(`${BASE_URL}/api/wishlist/${wishlistEntryId}`, {
      method: 'DELETE',
      headers: {
        'Cookie': cookiesUserB,
      },
    });
    const data = await res.json();
    if (res.status === 404 || res.status === 403) {
      console.log(`[PASS] Delete Protection - Cross-User delete blocked: ${data.message} (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Cross-User delete should be blocked with 403/404 but returned status: ${res.status}`);
    }
  } catch (err) {
    console.error('Cross-user delete check error:', err.message);
  }

  // 7) Test Remove from Wishlist - Owner Authorized
  try {
    const res = await fetch(`${BASE_URL}/api/wishlist/${wishlistEntryId}`, {
      method: 'DELETE',
      headers: {
        'Cookie': cookiesUserA,
      },
    });
    const data = await res.json();
    if (res.status === 200 && data.success) {
      console.log(`[PASS] Delete Wishlist Item (Owner): Removed successfully! Msg: "${data.message}" (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Delete wishlist item failed (Status: ${res.status})`, data);
    }
  } catch (err) {
    console.error('Remove wishlist item check error:', err.message);
  }

  console.log('--- JOVA WISHLIST API VERIFICATION COMPLETED ---');
}

verifyWishlistAPI();
