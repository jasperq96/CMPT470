import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const userInfoErrors = validationResult(req);
  if (!userInfoErrors.isEmpty()) {
    return res.status(422).send({ errors: userInfoErrors.array() });
  }
  next();
};
