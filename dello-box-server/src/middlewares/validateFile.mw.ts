import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateFile = (req: Request, res: Response, next: NextFunction) => {
  const fileErrors = validationResult(req);
  if (!fileErrors.isEmpty()) {
    return res.status(422).send({ errors: fileErrors.array() });
  }
  next();
};
