import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import authConfig from '../utils/authConfig';
import userAuth from './requestTemplates/authUserController';

const NAMESPACE = 'AUTHENTICATION';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  try {
    const userArray: any = await userAuth.findUser('user.username', username);
    const user: any = userArray[0];
    logging.info(NAMESPACE, 'RETRIEVED USER FROM DB', user);
    if (!user) {
      res.status(401).json({ isAuthenticated: false, msg: 'User not found' });
      return;
    }
    if (user.password !== '') {
      const isValid = await authConfig.validPassword(password, user.password);
      if (isValid) {
        delete user.password;
        const tokenObject = authConfig.issueJWT(user);
        const cookieName = 'jwt';
        res.cookie(cookieName, tokenObject.token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: user, msg: 'success' });
        return;
      }
    }
    return res.status(401).json({ isAuthenticated: false, msg: 'Entered incorrect username or password' });
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).json({ isAuthenticated: false, message: 'Server error from login' });
  }
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('jwt');
  res.status(200).json({ success: true, isAuthenticated: false, user: null });
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
};

export default { login, logout, authenticate };
