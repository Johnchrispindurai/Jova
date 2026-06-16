import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import AppError from '../utils/AppError.js';
import { sendAuthCookies, clearAuthCookies, signAccessToken, signRefreshToken } from '../utils/jwt.js';

// Helper to set cookies and send a standard response payload
const sendAuthSession = (user, message, res, statusCode = 200) => {
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

  res.status(statusCode).json({
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

    // Create permanent user account directly
    const newUser = await User.create({
      name,
      email,
      password, // hashed inside User schema pre-save hook
      role: 'user',
      isEmailVerified: true,
    });

    // Issue cookies and auto log in
    sendAuthSession(newUser, 'Account created successfully', res, 201);
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

    // Issue cookies and login directly
    sendAuthSession(user, 'Login successful', res);
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
