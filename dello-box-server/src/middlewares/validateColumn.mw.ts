import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateColumn = (req: Request, res: Response, next: NextFunction) => {
  const columnErrors = validationResult(req);
  if (!columnErrors.isEmpty()) {
    return res.status(422).send({ errors: columnErrors.array() });
  }
  next();
};
