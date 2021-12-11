import { check } from 'express-validator';

const fileSchema = [check('isPublic').trim().escape().notEmpty().isBoolean().withMessage('Must be a boolean')];

export { fileSchema as registerFile };
