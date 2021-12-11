import { check } from 'express-validator';

const createEditColumnSchema = [check('title').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character')];

export { createEditColumnSchema as registerCreateEditColumn };
