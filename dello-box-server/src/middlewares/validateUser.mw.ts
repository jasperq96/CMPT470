import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const userErrors = validationResult(req);
  if (!userErrors.isEmpty()) {
    return res.status(422).send({ errors: userErrors.array() });
  }
  next();
};
