import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
  const taskErrors = validationResult(req);
  if (!taskErrors.isEmpty()) {
    return res.status(422).send({ errors: taskErrors.array() });
  }
  next();
};
