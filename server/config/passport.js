import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User.js';
console.log("PASSPORT CLIENT ID:", process.env.GOOGLE_CLIENT_ID);
console.log("PASSPORT CLIENT SECRET:", process.env.GOOGLE_CLIENT_SECRET);
console.log("PASSPORT CALLBACK:", process.env.GOOGLE_CALLBACK_URL);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const googleId = profile.id;
        const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : undefined;

        // Find user by googleId or email
        let user = await User.findOne({ $or: [{ googleId }, { email }] });

        if (user) {
          // If user exists but doesn't have Google ID linked yet, link it
          let modified = false;
          if (!user.googleId) {
            user.googleId = googleId;
            modified = true;
          }
          if (avatar && (!user.avatar || user.avatar.includes('unsplash.com'))) {
            user.avatar = avatar;
            modified = true;
          }
          if (!user.isEmailVerified) {
            user.isEmailVerified = true;
            modified = true;
          }
          if (modified) {
            await user.save();
          }
        } else {
          // Auto-create new user
          user = await User.create({
            name,
            email,
            googleId,
            avatar,
            role: 'user',
            isEmailVerified: true,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
