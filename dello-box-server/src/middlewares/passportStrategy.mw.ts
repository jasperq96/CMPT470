import passport from 'passport';
import PassportJWT from 'passport-jwt';
import config from '../config/config';
import logging from '../config/logging';
import { Request } from 'express';
import userAuth from '../controllers/requestTemplates/authUserController';

const NAMESPACE = 'PASSPORT MIDDLEWARE';

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  logging.info(NAMESPACE, 'cookie', token);
  return token;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.jwt.secret
};

const strategyAll = new PassportJWT.Strategy(jwtOptions, async (payload, done) => {
  logging.info(NAMESPACE, 'JWT VERIFICATION: INCOMING PAYLOAD', payload);
  const id = payload.sub;
  try {
    const user: any = await userAuth.findUser('user.id', id);
    if (!user[0]) {
      return done(null, false);
    } else {
      user[0].password && delete user[0].password;
      return done(null, user[0]);
    }
  } catch (error) {
    done(error, false);
  }
});

passport.use('authAll', strategyAll);
