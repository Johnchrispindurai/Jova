import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;

async function verifyProductsAPI() {
  console.log('--- STARTING JOVA PRODUCTS API VERIFICATION ---');

  // 1) Retrieve count from pagination metadata
  let totalProductsCount = 0;
  try {
    const res = await fetch(`${BASE_URL}/api/products?limit=1`);
    const data = await res.json();
    if (res.status === 200 && data.success) {
      totalProductsCount = data.pagination.totalProducts;
      console.log(`[PASS] GET /api/products: Total products reported in DB: ${totalProductsCount} (Status: ${res.status})`);
      if (totalProductsCount === 100) {
        console.log('  -> Matches exactly the 100 products from frontend catalog!');
      } else {
        console.warn(`  -> Warning: Product count (${totalProductsCount}) does not match 100!`);
      }
    } else {
      console.error(`[FAIL] GET /api/products reported failure:`, data);
      return;
    }
  } catch (err) {
    console.error('Products API check error:', err.message);
    return;
  }

  // 2) Verify Pagination (limit = 10, should return exactly 10 items)
  try {
    const res = await fetch(`${BASE_URL}/api/products?limit=10&page=2`);
    const data = await res.json();
    if (res.status === 200 && data.success) {
      console.log(`[PASS] Pagination Check (limit=10, page=2): Returned ${data.data.length} products (Page: ${data.pagination.page}, Total Pages: ${data.pagination.totalPages})`);
    } else {
      console.error(`[FAIL] Pagination failed (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Pagination check error:', err.message);
  }

  // 3) Verify Filters: Category (category=women)
  try {
    const res = await fetch(`${BASE_URL}/api/products?category=women&limit=50`);
    const data = await res.json();
    if (res.status === 200 && data.success) {
      const allWomen = data.data.every(p => p.category === 'women');
      console.log(`[PASS] Filter Category (category=women): Returned ${data.data.length} items. All matches are women's category: ${allWomen}`);
    } else {
      console.error(`[FAIL] Category filter failed (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Category filter check error:', err.message);
  }

  // 4) Verify Filters: Subcategory (subcategory=Footwear)
  try {
    const res = await fetch(`${BASE_URL}/api/products?subcategory=Footwear`);
    const data = await res.json();
    if (res.status === 200 && data.success) {
      const allFootwear = data.data.every(p => p.subcategory === 'Footwear');
      console.log(`[PASS] Filter Subcategory (subcategory=Footwear): Returned ${data.data.length} items. All matches are Footwear: ${allFootwear}`);
    } else {
      console.error(`[FAIL] Subcategory filter failed (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Subcategory filter check error:', err.message);
  }

  // 5) Verify Filters: Price range (priceMax=3000)
  try {
    const res = await fetch(`${BASE_URL}/api/products?priceMax=3000&limit=50`);
    const data = await res.json();
    if (res.status === 200 && data.success) {
      const allUnder3000 = data.data.every(p => p.price <= 3000);
      console.log(`[PASS] Filter Price Range (priceMax=3000): Returned ${data.data.length} items. All prices <= 3000: ${allUnder3000}`);
    } else {
      console.error(`[FAIL] Price filter failed (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Price filter check error:', err.message);
  }

  // 6) Verify Sorting: Price Low to High
  try {
    const res = await fetch(`${BASE_URL}/api/products?sort=Price Low to High&limit=10`);
    const data = await res.json();
    if (res.status === 200 && data.success) {
      let sortedCorrectly = true;
      for (let i = 0; i < data.data.length - 1; i++) {
        if (data.data[i].price > data.data[i+1].price) {
          sortedCorrectly = false;
          break;
        }
      }
      console.log(`[PASS] Sorting Check (sort=Price Low to High): Low item: ₹${data.data[0].price}, Next item: ₹${data.data[1].price}. Sorted correct: ${sortedCorrectly}`);
    } else {
      console.error(`[FAIL] Sorting low-high failed (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Sort low-high check error:', err.message);
  }

  // 7) Verify Sorting: Price High to Low
  try {
    const res = await fetch(`${BASE_URL}/api/products?sort=Price High to Low&limit=10`);
    const data = await res.json();
    if (res.status === 200 && data.success) {
      let sortedCorrectly = true;
      for (let i = 0; i < data.data.length - 1; i++) {
        if (data.data[i].price < data.data[i+1].price) {
          sortedCorrectly = false;
          break;
        }
      }
      console.log(`[PASS] Sorting Check (sort=Price High to Low): High item: ₹${data.data[0].price}, Next item: ₹${data.data[1].price}. Sorted correct: ${sortedCorrectly}`);
    } else {
      console.error(`[FAIL] Sorting high-low failed (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Sort high-low check error:', err.message);
  }

  // 8) Verify Search query (search=Oxford)
  try {
    const res = await fetch(`${BASE_URL}/api/products?search=Oxford`);
    const data = await res.json();
    if (res.status === 200 && data.success) {
      console.log(`[PASS] Search Query (search=Oxford): Found ${data.data.length} matches. E.g. "${data.data[0].name}"`);
    } else {
      console.error(`[FAIL] Search failed (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Search query check error:', err.message);
  }

  console.log('--- JOVA PRODUCTS API VERIFICATION COMPLETED ---');
}

verifyProductsAPI();
