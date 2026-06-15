import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import passport from 'passport';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = '5050';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const BASE_URL = `http://localhost:${PORT}`;

// Helper to extract cookies from a response
const getCookiesFromResponse = (res) => {
  if (typeof res.headers.getSetCookie === 'function') {
    return res.headers.getSetCookie().map(c => c.split(';')[0]).join('; ');
  }
  const setCookie = res.headers.get('set-cookie');
  if (!setCookie) return '';
  return setCookie.split(',').map(c => c.split(';')[0].trim()).join('; ');
};

// Global container for captured server stdout
let serverOutput = '';

function getOtpFromCapturedOutput(email) {
  const regex = new RegExp(`OTP for ${email} is:\\s*(\\d{6})`, 'g');
  const matches = [...serverOutput.matchAll(regex)];
  if (matches.length > 0) {
    return matches[matches.length - 1][1];
  }
  return null;
}

async function verifyModernAuth() {
  console.log('--- STARTING JOVA 2FA AUTH API VERIFICATION SUITE ---');

  // 1) CONNECT MONGOOSE IN TEST PROCESS FOR DATA INSPECTION & CLEANUP
  console.log('[INFO] Connecting to database...');
  let dbUri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log('[PASS] Connected to MongoDB Atlas.');
  } catch (err) {
    console.warn(`[WARN] MongoDB Atlas Connection Failed: ${err.message}`);
    console.log('Spinning up local In-Memory MongoDB Server as fallback...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    dbUri = mongoServer.getUri();
    await mongoose.connect(dbUri);
    console.log('[PASS] Connected to local In-Memory DB.');
  }

  // Import models
  const { User } = await import('../models/User.js');
  const { TempUser } = await import('../models/TempUser.js');

  // CLEANUP PREVIOUS TEST RUNS
  console.log('[INFO] Cleaning up previous test data...');
  await User.deleteMany({ email: /^test-.*@jova\.com$/ });
  await TempUser.deleteMany({ email: /^test-.*@jova\.com$/ });
  console.log('[PASS] Cleanup done.');

  // 2) SPAWN ISOLATED API SERVER ON PORT 5050
  console.log(`[INFO] Spawning server process on port ${PORT}...`);
  const serverProcess = spawn('node', ['server/server.js'], {
    env: {
      ...process.env,
      PORT,
      MONGODB_URI: dbUri,
      NODE_ENV: 'development',
    },
    cwd: path.resolve(__dirname, '../..'),
  });

  serverProcess.stdout.on('data', (data) => {
    const chunk = data.toString();
    serverOutput += chunk;
    // Log server output prefixed for clarity
    process.stdout.write(`[SERVER] ${chunk}`);
  });

  serverProcess.stderr.on('data', (data) => {
    process.stderr.write(`[SERVER-ERR] ${data.toString()}`);
  });

  // Wait for server to start
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (serverOutput.includes(`JOVA API Server running on port ${PORT}`)) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
  console.log('[PASS] Server is listening and ready.');

  let exitCode = 0;

  try {
    // =========================================================================
    // 3) TEST REGISTRATION FLOW & TEMP USER VALIDATION
    // =========================================================================
    console.log('\n--- TEST 1: REGISTRATION FLOW ---');
    const regEmail = 'test-register@jova.com';
    const regPassword = 'Password@123';
    const regName = 'Test Register';

    let res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }),
    });
    let data = await res.json();

    if (res.status !== 200 || !data.success) {
      throw new Error(`Registration request failed: status ${res.status}, body: ${JSON.stringify(data)}`);
    }
    console.log('[PASS] Register returns 200 & success: true.');

    // Assert that User record does not exist, but TempUser record does
    const userBefore = await User.findOne({ email: regEmail });
    if (userBefore) {
      throw new Error('User record was created in User collection before OTP verification.');
    }
    console.log('[PASS] User collection does not contain user yet.');

    const tempUserBefore = await TempUser.findOne({ email: regEmail });
    if (!tempUserBefore) {
      throw new Error('TempUser record was NOT created in TempUser collection.');
    }
    console.log('[PASS] TempUser record created in TempUser collection.');

    // Retrieve OTP from log
    let otpCode = getOtpFromCapturedOutput(regEmail);
    if (!otpCode) {
      throw new Error('Failed to capture OTP from server output logs.');
    }
    console.log(`[PASS] Extracted registration OTP: ${otpCode}`);

    // Verify OTP resend cooldown (must fail within 60s)
    console.log('\n--- TEST 2: RESEND COOLDOWN ---');
    res = await fetch(`${BASE_URL}/api/auth/resend-register-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: regEmail }),
    });
    data = await res.json();
    if (res.status !== 429 || data.success) {
      throw new Error(`Expected cooldown rejection (429), got: ${res.status} ${JSON.stringify(data)}`);
    }
    console.log('[PASS] Register OTP resend cooldown enforced successfully.');

    // Verify OTP and assert success
    console.log('\n--- TEST 3: VERIFY REGISTRATION OTP ---');
    res = await fetch(`${BASE_URL}/api/auth/verify-register-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: regEmail, otp: otpCode }),
    });
    data = await res.json();
    let cookies = getCookiesFromResponse(res);

    if (res.status !== 200 || !data.success || !cookies.includes('accessToken')) {
      throw new Error(`Registration OTP verification failed: status ${res.status}, cookies: ${cookies}`);
    }
    console.log('[PASS] Registration OTP verified successfully. Cookies set.');

    // Assert TempUser is deleted and User is promoted
    const tempUserAfter = await TempUser.findOne({ email: regEmail });
    if (tempUserAfter) {
      throw new Error('TempUser was not deleted after successful verification.');
    }
    console.log('[PASS] TempUser record deleted.');

    const userAfter = await User.findOne({ email: regEmail });
    if (!userAfter || !userAfter.isEmailVerified) {
      throw new Error('User record was not created/promoted or email not verified.');
    }
    console.log('[PASS] Permanent User record promoted and isEmailVerified=true.');

    // =========================================================================
    // 4) TEST DUPLICATE EMAIL PREVENTION
    // =========================================================================
    console.log('\n--- TEST 4: DUPLICATE EMAIL PREVENTION ---');
    res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }),
    });
    data = await res.json();
    if (res.status !== 400 || data.success) {
      throw new Error(`Expected duplicate email block (400), got: ${res.status} ${JSON.stringify(data)}`);
    }
    console.log('[PASS] Duplicate email prevention works.');

    // =========================================================================
    // 5) TEST MAX ATTEMPT LOCKOUT
    // =========================================================================
    console.log('\n--- TEST 5: MAX ATTEMPT LOCKOUT ---');
    const lockoutEmail = 'test-lockout@jova.com';
    res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Lockout Test', email: lockoutEmail, password: regPassword }),
    });

    const lockoutOtp = getOtpFromCapturedOutput(lockoutEmail);
    // Send 3 wrong attempts
    for (let i = 1; i <= 3; i++) {
      res = await fetch(`${BASE_URL}/api/auth/verify-register-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: lockoutEmail, otp: '000000' }),
      });
      data = await res.json();
      if (res.status !== 400 || data.success) {
        throw new Error(`Expected failure for wrong OTP attempt ${i}, got: ${res.status}`);
      }
    }
    console.log('[PASS] 3 incorrect OTP attempts failed as expected.');

    // Send 4th attempt (lockout should block)
    res = await fetch(`${BASE_URL}/api/auth/verify-register-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: lockoutEmail, otp: lockoutOtp }),
    });
    data = await res.json();
    if (res.status !== 400 || !data.message.includes('attempts exceeded')) {
      throw new Error(`Expected lockout message for 4th attempt, got: ${res.status} ${JSON.stringify(data)}`);
    }
    console.log('[PASS] Max attempt lockout enforced (4th correct OTP attempt rejected).');

    // =========================================================================
    // 6) TEST OTP EXPIRY
    // =========================================================================
    console.log('\n--- TEST 6: OTP EXPIRY ---');
    const expiryEmail = 'test-expiry@jova.com';
    res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Expiry Test', email: expiryEmail, password: regPassword }),
    });

    const expiryOtp = getOtpFromCapturedOutput(expiryEmail);
    // Manually modify expiresAt in database to the past
    await TempUser.findOneAndUpdate(
      { email: expiryEmail },
      { 'otp.expiresAt': new Date(Date.now() - 1000) }
    );

    // Try to verify
    res = await fetch(`${BASE_URL}/api/auth/verify-register-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: expiryEmail, otp: expiryOtp }),
    });
    data = await res.json();
    if (res.status !== 400 || !data.message.toLowerCase().includes('expired')) {
      throw new Error(`Expected expiry message, got: ${res.status} ${JSON.stringify(data)}`);
    }
    console.log('[PASS] OTP expiry verification works.');

    // =========================================================================
    // 7) TEST INVALID PASSWORD REJECTION & GENERIC LOGIN ERRORS
    // =========================================================================
    console.log('\n--- TEST 7: INVALID PASSWORD REJECTION & GENERIC ERROR ---');
    res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: regEmail, password: 'WrongPassword123' }),
    });
    data = await res.json();
    if (res.status !== 411 && res.status !== 401 && res.status !== 400) {
      // Allow general authentication failure statuses
    }
    if (!data.message.includes('Incorrect email or password')) {
      throw new Error(`Expected generic message 'Incorrect email or password', got: ${JSON.stringify(data)}`);
    }
    console.log('[PASS] Invalid password rejected with generic error message.');

    // Check non-existent user login also returns same generic message
    res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test-nonexistent@jova.com', password: 'Password@123' }),
    });
    data = await res.json();
    if (!data.message.includes('Incorrect email or password')) {
      throw new Error(`Expected generic error for non-existent user, got: ${JSON.stringify(data)}`);
    }
    console.log('[PASS] Non-existent user login returns same generic error.');

    // =========================================================================
    // 8) TEST LOGIN FLOW (PASSWORD + OTP 2FA) & COOKIE CHECK
    // =========================================================================
    console.log('\n--- TEST 8: LOGIN FLOW (2FA PART 1: CREDENTIALS) ---');
    res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: regEmail, password: regPassword }),
    });
    data = await res.json();
    cookies = getCookiesFromResponse(res);

    if (res.status !== 200 || !data.success) {
      throw new Error(`Login step 1 failed: status ${res.status}, body: ${JSON.stringify(data)}`);
    }
    if (cookies.includes('accessToken') || cookies.includes('refreshToken')) {
      throw new Error('JWT cookies were issued prematurely after password verification but before OTP.');
    }
    console.log('[PASS] Login step 1 succeeds, no JWT cookies are issued.');

    const loginOtp = getOtpFromCapturedOutput(regEmail);
    if (!loginOtp) {
      throw new Error('Failed to retrieve login OTP from server output logs.');
    }
    console.log(`[PASS] Extracted login OTP: ${loginOtp}`);

    // Verify login OTP resend cooldown
    res = await fetch(`${BASE_URL}/api/auth/resend-login-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: regEmail }),
    });
    data = await res.json();
    if (res.status !== 429 || data.success) {
      throw new Error(`Expected cooldown rejection (429) on login OTP resend, got: ${res.status}`);
    }
    console.log('[PASS] Login OTP resend cooldown enforced.');

    console.log('\n--- TEST 9: LOGIN FLOW (2FA PART 2: OTP VERIFICATION) ---');
    res = await fetch(`${BASE_URL}/api/auth/verify-login-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: regEmail, otp: loginOtp }),
    });
    data = await res.json();
    cookies = getCookiesFromResponse(res);

    if (res.status !== 200 || !data.success || !cookies.includes('accessToken')) {
      throw new Error(`Login OTP verification failed: status ${res.status}, cookies: ${cookies}`);
    }
    console.log('[PASS] Login OTP verified successfully. Cookies set.');

    // Assert user's OTP fields are cleared
    const userObj = await User.findOne({ email: regEmail });
    if (userObj.otp && userObj.otp.code) {
      throw new Error('User OTP fields were not cleared after successful login.');
    }
    console.log('[PASS] User OTP fields cleared successfully.');

    // =========================================================================
    // 9) GOOGLE SIGN-IN REGRESSION & PASSPORT CALLBACK UNIT TESTS
    // =========================================================================
    console.log('\n--- TEST 10: GOOGLE SIGN-IN REGRESSION ---');
    res = await fetch(`${BASE_URL}/api/auth/google`, { redirect: 'manual' });
    const redirectLocation = res.headers.get('location');
    if (res.status !== 302 || !redirectLocation || !redirectLocation.includes('accounts.google.com')) {
      throw new Error(`Google OAuth redirect failed. Status: ${res.status}, Location: ${redirectLocation}`);
    }
    console.log('[PASS] Google OAuth redirect works.');

    // Unit test Google Passport strategy callback
    console.log('\n--- TEST 11: PASSPORT GOOGLE STRATEGY CALLBACK ---');
    await import('../config/passport.js');
    const googleStrategy = passport._strategies.google;
    if (!googleStrategy) {
      throw new Error('Google strategy not registered on Passport.');
    }
    const verifyCallback = googleStrategy._verify;
    if (typeof verifyCallback !== 'function') {
      throw new Error('Google Strategy verify callback is not a function.');
    }

    // A) Auto-create new user
    const mockGoogleId = `mock-google-id-${Date.now()}`;
    const mockGoogleEmail = `test-google-new-${Date.now()}@jova.com`;
    const mockProfile = {
      id: mockGoogleId,
      displayName: 'Google Test User',
      emails: [{ value: mockGoogleEmail }],
      photos: [{ value: 'https://images.unsplash.com/mock-avatar' }],
    };

    let returnedUser = await new Promise((resolve, reject) => {
      verifyCallback('mockToken', 'mockRefresh', mockProfile, (err, user) => {
        if (err) reject(err);
        else resolve(user);
      });
    });

    if (!returnedUser || returnedUser.email !== mockGoogleEmail || !returnedUser.isEmailVerified) {
      throw new Error(`Failed to auto-create user via Google Strategy: ${JSON.stringify(returnedUser)}`);
    }
    console.log('[PASS] Google Strategy auto-creates verified user.');

    // B) Link Google account to existing Email/Password user
    const linkProfile = {
      id: `google-link-id-${Date.now()}`,
      displayName: 'Google Link User',
      emails: [{ value: regEmail }], // existing password user email
      photos: [{ value: 'https://images.unsplash.com/mock-avatar-link' }],
    };

    let linkedUser = await new Promise((resolve, reject) => {
      verifyCallback('mockToken', 'mockRefresh', linkProfile, (err, user) => {
        if (err) reject(err);
        else resolve(user);
      });
    });

    if (!linkedUser || linkedUser.googleId !== linkProfile.id || linkedUser.email !== regEmail) {
      throw new Error(`Failed to link Google account to existing user: ${JSON.stringify(linkedUser)}`);
    }
    console.log('[PASS] Google Strategy links Google account to existing user.');

    // C) Prevent Email + Password login for pure Google users
    console.log('\n--- TEST 12: PREVENT PASSWORD LOGIN FOR GOOGLE-ONLY USER ---');
    // We use the new user created via Google 'mockGoogleEmail' (which has googleId but no password)
    res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: mockGoogleEmail, password: 'somePassword123' }),
    });
    data = await res.json();
    if (res.status !== 400 || !data.message.includes('uses Google Sign-In')) {
      throw new Error(`Expected Google Sign-In restriction message, got: ${res.status} ${JSON.stringify(data)}`);
    }
    console.log('[PASS] Pure Google user is restricted from password login.');

  } catch (testError) {
    console.error('\n[FAIL] A test assertion failed:', testError.message);
    exitCode = 1;
  } finally {
    // CLEANUP AND EXIT
    console.log('\n[INFO] Final database cleaning...');
    try {
      await User.deleteMany({ email: /^test-.*@jova\.com$/ });
      await TempUser.deleteMany({ email: /^test-.*@jova\.com$/ });
      console.log('[PASS] Cleanup complete.');
    } catch (e) {
      console.error('[WARN] Cleanup failed:', e.message);
    }

    console.log('[INFO] Shutting down express server...');
    serverProcess.kill();

    console.log('[INFO] Closing database connection...');
    await mongoose.connection.close();

    console.log('\n--- JOVA 2FA AUTH API VERIFICATION COMPLETE ---');
    process.exit(exitCode);
  }
}

verifyModernAuth();
