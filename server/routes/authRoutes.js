import express from 'express';
import passport from 'passport';
import '../config/passport.js'; // Initialize Google Strategy configuration
import { register, login, logout, getProfile, refreshToken, verifyRegisterOtp, resendRegisterOtp, verifyLoginOtp, resendLoginOtp } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middleware/validate.js';
import { protect } from '../middleware/authMiddleware.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';

const router = express.Router();

// Password Auth
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.get('/profile', protect, getProfile);

// Email OTP Auth
router.post('/verify-register-otp', verifyRegisterOtp);
router.post('/resend-register-otp', resendRegisterOtp);
router.post('/verify-login-otp', verifyLoginOtp);
router.post('/resend-login-otp', resendLoginOtp);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    session: false, 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile?error=oauth_failed` 
  }),
  (req, res) => {
    // Issue secure cookies upon successful google auth callback
    const accessToken = signAccessToken(req.user._id);
    const refreshToken = signRefreshToken(req.user._id);

res.cookie('accessToken', accessToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 15 * 60 * 1000, // 15 mins
});

res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

    // Redirect user back to the profile dashboard page on frontend
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/profile`);
  }
);

export default router;
