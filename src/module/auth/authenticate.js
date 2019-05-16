import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken'; // used to create, sign, and verify tokens

import config from '../../config';
import { users } from '../../models';

export const getToken = (user) => {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
}

var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey,
};

export const jwtPassport = passport.use(new JwtStrategy(opts,
  (jwt_payload, done) => {
    // check if user exists with id same as that present in jwt_payload
    users.findOne({_id: jwt_payload._id}, (err, user) => {
      if (err) {
        // Some error occured user returned as false
        return done(err, false);
      } else if (user) {
        // User found error returned as null and user returned as user
        return done(null, user);
      } else {
        // User not found error returned as null and user as false
        return done(null, false);
      }
    });
  }));

export const verifyUser = passport.authenticate('jwt', { session: false });

export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    next(err);
  }
}

passport.use(new LocalStrategy(users.authenticate()));
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());
