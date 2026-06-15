import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;

// Helper to extract cookie values from response headers
const getCookiesFromResponse = (res) => {
  if (typeof res.headers.getSetCookie === 'function') {
    return res.headers.getSetCookie().map(c => c.split(';')[0]).join('; ');
  }
  // Fallback for older environments
  const setCookie = res.headers.get('set-cookie');
  if (!setCookie) return '';
  return setCookie.split(',').map(c => c.split(';')[0].trim()).join('; ');
};

async function verifyAuthAPI() {
  console.log('--- STARTING JOVA AUTHENTICATION API VERIFICATION ---');

  const testEmail = `jova-customer-${Date.now()}@jova.com`;
  const invalidEmail = 'not-an-email';
  const weakPassword = '123';
  const strongPassword = 'Password@123';
  
  let userCookies = '';
  let refreshTokenCookie = '';

  // 1) Test Registration Validation: Invalid Email format
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Valid Name', email: invalidEmail, password: strongPassword }),
    });
    const data = await res.json();
    if (res.status === 400) {
      console.log(`[PASS] Validation check - Invalid Email rejected: ${data.message} (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Validation check - Invalid Email should return 400 but returned: ${res.status}`);
    }
  } catch (err) {
    console.error('Validation test error:', err.message);
  }

  // 2) Test Registration Validation: Weak Password
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Valid Name', email: testEmail, password: weakPassword }),
    });
    const data = await res.json();
    if (res.status === 400) {
      console.log(`[PASS] Validation check - Weak Password rejected: ${data.message} (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Validation check - Weak Password should return 400 but returned: ${res.status}`);
    }
  } catch (err) {
    console.error('Validation test error:', err.message);
  }

  // 3) Test Successful Registration
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'JOVA Client', email: testEmail, password: strongPassword }),
    });
    const data = await res.json();
    if (res.status === 201) {
      userCookies = getCookiesFromResponse(res);
      console.log(`[PASS] Register Success: User "${data.data.user.name}" created! (Status: ${res.status})`);
      console.log(`  Set-Cookies header response: ${userCookies}`);
    } else {
      console.error(`[FAIL] Register failed: ${data.message} (Status: ${res.status})`);
      return; // Stop tests if register fails
    }
  } catch (err) {
    console.error('Registration test error:', err.message);
    return;
  }

  // 4) Test Duplicate Email Rejection
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Duplicate User', email: testEmail, password: strongPassword }),
    });
    const data = await res.json();
    if (res.status === 400) {
      console.log(`[PASS] Duplicate Email rejected: ${data.message} (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Duplicate Email did not trigger 400. Status: ${res.status}`);
    }
  } catch (err) {
    console.error('Duplicate registration test error:', err.message);
  }

  // 5) Test Login with Invalid Credentials
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'WrongPassword@123' }),
    });
    const data = await res.json();
    if (res.status === 401) {
      console.log(`[PASS] Login failure - Incorrect credentials rejected: ${data.message} (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Login should fail with 401 but returned status: ${res.status}`);
    }
  } catch (err) {
    console.error('Invalid login test error:', err.message);
  }

  // 6) Test Login with Valid Credentials
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: strongPassword }),
    });
    const data = await res.json();
    if (res.status === 200) {
      userCookies = getCookiesFromResponse(res);
      
      // Store refreshToken for verification test
      const refreshMatch = userCookies.match(/refreshToken=([^;]+)/);
      if (refreshMatch) {
        refreshTokenCookie = `refreshToken=${refreshMatch[1]}`;
      }

      console.log(`[PASS] Login Success: User "${data.data.user.name}" logged in! (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] Login failed: ${data.message} (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Valid login test error:', err.message);
  }

  // 7) Test Protected Profile API - Authorized
  try {
    const res = await fetch(`${BASE_URL}/api/auth/profile`, {
      method: 'GET',
      headers: {
        'Cookie': userCookies,
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      console.log(`[PASS] GET /api/auth/profile (Authorized): Welcome "${data.data.user.name}" [Role: ${data.data.user.role}]! (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] GET /api/auth/profile (Authorized) failed: ${data.message} (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Authorized profile test error:', err.message);
  }

  // 8) Test Protected Profile API - Unauthorized (No Cookies)
  try {
    const res = await fetch(`${BASE_URL}/api/auth/profile`, {
      method: 'GET',
    });
    const data = await res.json();
    if (res.status === 401) {
      console.log(`[PASS] GET /api/auth/profile (Unauthorized): Blocked correctly! ${data.message} (Status: ${res.status})`);
    } else {
      console.error(`[FAIL] GET /api/auth/profile (Unauthorized) should return 401 but returned: ${res.status}`);
    }
  } catch (err) {
    console.error('Unauthorized profile test error:', err.message);
  }

  // 9) Test Session Refresh Token Endpoint
  if (refreshTokenCookie) {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Cookie': refreshTokenCookie,
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        const newCookies = getCookiesFromResponse(res);
        console.log(`[PASS] POST /api/auth/refresh: New Access Token issued successfully! (Status: ${res.status})`);
        console.log(`  New Cookie received: ${newCookies}`);
      } else {
        console.error(`[FAIL] POST /api/auth/refresh: ${data.message} (Status: ${res.status})`);
      }
    } catch (err) {
      console.error('Refresh token test error:', err.message);
    }
  }

  // 10) Test Logout API
  try {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
    });
    const data = await res.json();
    if (res.status === 200) {
      const clearedCookies = getCookiesFromResponse(res);
      console.log(`[PASS] POST /api/auth/logout: Logged out! (Status: ${res.status})`);
      console.log(`  Cleared Cookies: ${clearedCookies}`);
    } else {
      console.error(`[FAIL] POST /api/auth/logout failed: ${data.message} (Status: ${res.status})`);
    }
  } catch (err) {
    console.error('Logout test error:', err.message);
  }

  console.log('--- JOVA AUTHENTICATION API VERIFICATION COMPLETED ---');
}

verifyAuthAPI();
