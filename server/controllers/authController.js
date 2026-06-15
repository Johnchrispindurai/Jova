import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { TempUser } from '../models/TempUser.js';
import AppError from '../utils/AppError.js';
import { sendAuthCookies, clearAuthCookies, signAccessToken, signRefreshToken } from '../utils/jwt.js';
import { sendOtpEmail } from '../services/emailService.js';

// Helper to set cookies and send a standard 2FA response payload
const sendAuthSession = (user, message, res) => {
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);
  
  const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
};
  

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 mins
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  user.password = undefined;

  res.status(200).json({
    success: true,
    message,
    accessToken,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    },
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email is already registered', 400));
    }

    // Clean up any stale temp registration sessions for this email
    await TempUser.findOneAndDelete({ email });

    // Generate secure 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otpCode, 12);

    // Save temporary registration details
    await TempUser.create({
      name,
      email,
      password, // hashed inside TempUser schema pre-save hook
      otp: {
        code: hashedOtp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        attempts: 0,
        generatedAt: new Date(),
      },
    });

    // Send OTP via Nodemailer
    await sendOtpEmail(email, otpCode);

    res.status(200).json({
      success: true,
      message: 'Verification code sent successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user and select password
    const user = await User.findOne({ email }).select('+password');

    // Generic credentials validation error for security
    if (!user) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // If user registered via Google strategy, restrict login
    if (!user.password && user.googleId) {
      return next(new AppError('This account uses Google Sign-In. Please continue with Google.', 400));
    }

    // Compare credentials password
    if (!(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // Cooldown check (60 seconds)
    if (user.otp && user.otp.generatedAt) {
      const elapsedSeconds = Math.floor((Date.now() - new Date(user.otp.generatedAt).getTime()) / 1000);
      if (elapsedSeconds < 60) {
        return next(new AppError(`Please wait ${60 - elapsedSeconds} seconds before requesting a new code.`, 429));
      }
    }

    // Generate secure 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store bcrypt hashed OTP
    const hashedOtp = await bcrypt.hash(otpCode, 12);
    user.otp = {
      code: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      attempts: 0,
      generatedAt: new Date(),
    };

    await user.save();

    // Send OTP via Nodemailer
    await sendOtpEmail(email, otpCode);

    res.status(200).json({
      success: true,
      message: 'Verification code sent successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  clearAuthCookies(res);
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

export const getProfile = (req, res) => {
  // Profile endpoint returns sanitized user details
  const { _id, name, email, role, avatar, createdAt } = req.user;
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: _id,
        name,
        email,
        role,
        avatar,
        createdAt,
      },
    },
  });
};

export const refreshToken = async (req, res, next) => {
  try {
    const refresh = req.cookies.refreshToken;
    if (!refresh) {
      return next(new AppError('No refresh token provided. Please log in again.', 401));
    }

    // Verify refresh token
    const decoded = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);

    // Check user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    // Issue a new access token
    const accessToken = signAccessToken(user._id);

    // Refresh access token cookie
    // Refresh access token cookie
res.cookie('accessToken', accessToken, {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 15 * 60 * 1000, // 15 mins
});

    res.status(200).json({
      status: 'success',
      accessToken,
    });
  } catch (error) {
    // If jwt verification fails, throw a custom 401
    return next(new AppError('Invalid or expired refresh token. Please log in again.', 401));
  }
};

// POST /api/auth/verify-register-otp
export const verifyRegisterOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next(new AppError('Email and verification code are required', 400));
    }

    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return next(new AppError('No pending registration found for this email', 400));
    }

    // Check expiry
    if (Date.now() > new Date(tempUser.otp.expiresAt).getTime()) {
      return next(new AppError('Verification code has expired. Please register again.', 400));
    }

    // Check attempts limit (max 3)
    if (tempUser.otp.attempts >= 3) {
      return next(new AppError('Maximum verification attempts exceeded. Please register again.', 400));
    }

    // Increment attempts count
    tempUser.otp.attempts += 1;
    await tempUser.save();

    // Verify code match using bcrypt.compare
    const isCodeMatch = await bcrypt.compare(otp.toString().trim(), tempUser.otp.code);
    if (!isCodeMatch) {
      return next(new AppError('Incorrect verification code. Please try again.', 400));
    }

    // Success: create permanent user account
    const newUser = await User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password, // already hashed in tempUser pre-save
      role: 'user',
      isEmailVerified: true,
    });

    // Delete temporary record
    await TempUser.findOneAndDelete({ email });

    // Issue JWT cookies and auto log in
    sendAuthSession(newUser, 'Account created successfully', res);
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/resend-register-otp
export const resendRegisterOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return next(new AppError('Email is required', 400));
    }

    const tempUser = await TempUser.findOne({ email });
    if (!tempUser) {
      return next(new AppError('No pending registration found for this email', 404));
    }

    // Cooldown check (60 seconds)
    if (tempUser.otp && tempUser.otp.generatedAt) {
      const elapsedSeconds = Math.floor((Date.now() - new Date(tempUser.otp.generatedAt).getTime()) / 1000);
      if (elapsedSeconds < 60) {
        return next(new AppError(`Please wait ${60 - elapsedSeconds} seconds before requesting a new code.`, 429));
      }
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otpCode, 12);

    // Update OTP fields
    tempUser.otp = {
      code: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      attempts: 0,
      generatedAt: new Date(),
    };

    await tempUser.save();

    // Dispatch email
    await sendOtpEmail(email, otpCode);

    res.status(200).json({
      success: true,
      message: 'Verification code resent successfully',
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/verify-login-otp
export const verifyLoginOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next(new AppError('Email and verification code are required', 400));
    }

    const user = await User.findOne({ email });
    if (!user || !user.otp || !user.otp.code) {
      return next(new AppError('No active verification code found for this email', 400));
    }

    // Check expiry
    if (Date.now() > new Date(user.otp.expiresAt).getTime()) {
      return next(new AppError('Verification code has expired. Please request a new one.', 400));
    }

    // Check attempts limit (max 3)
    if (user.otp.attempts >= 3) {
      return next(new AppError('Maximum verification attempts exceeded. Please request a new code.', 400));
    }

    // Increment attempts count
    user.otp.attempts += 1;
    await user.save();

    // Verify code match using bcrypt.compare
    const isCodeMatch = await bcrypt.compare(otp.toString().trim(), user.otp.code);
    if (!isCodeMatch) {
      return next(new AppError('Incorrect verification code. Please try again.', 400));
    }

    // Clear OTP fields immediately after success
    user.otp = undefined;
    await user.save();

    // Issue cookies and login
    sendAuthSession(user, 'Login successful', res);
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/resend-login-otp
export const resendLoginOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return next(new AppError('Email is required', 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('No user found with this email address', 404));
    }

    // Cooldown check (60 seconds)
    if (user.otp && user.otp.generatedAt) {
      const elapsedSeconds = Math.floor((Date.now() - new Date(user.otp.generatedAt).getTime()) / 1000);
      if (elapsedSeconds < 60) {
        return next(new AppError(`Please wait ${60 - elapsedSeconds} seconds before requesting a new code.`, 429));
      }
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otpCode, 12);

    // Update OTP fields
    user.otp = {
      code: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      attempts: 0,
      generatedAt: new Date(),
    };

    await user.save();

    // Dispatch email
    await sendOtpEmail(email, otpCode);

    res.status(200).json({
      success: true,
      message: 'Verification code resent successfully',
    });
  } catch (error) {
    next(error);
  }
};
