import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import { getRoleIdByName } from '../utils/roleUtils.js';

const initializePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:1337/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            const roleId = await getRoleIdByName('user');
            
            user = await User.create({
              googleId: profile.id,
              fullName: profile.displayName,
              email: profile.emails[0].value,
              userType: 'individual',
              phoneNumber: '',
              roleId: roleId,
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
};

initializePassport();

export default passport;