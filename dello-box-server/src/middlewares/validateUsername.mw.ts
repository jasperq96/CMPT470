import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateUsername = (req: Request, res: Response, next: NextFunction) => {
  const userIdErrors = validationResult(req);
  if (!userIdErrors.isEmpty()) {
    return res.status(422).send({ errors: userIdErrors.array() });
  }
  next();
};
