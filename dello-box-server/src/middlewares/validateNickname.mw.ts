import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateNickname = (req: Request, res: Response, next: NextFunction) => {
  const nicknameErrors = validationResult(req);
  if (!nicknameErrors.isEmpty()) {
    return res.status(422).send({ errors: nicknameErrors.array() });
  }
  next();
};
