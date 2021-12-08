import { check } from 'express-validator';

const createColumnSchema = [
  check('label').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character'),
  check('order').trim().escape().isNumeric().withMessage('Must be a number')
];

const editColumnLabelSchema = [check('label').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character')];

export { createColumnSchema as registerCreateColumn, editColumnLabelSchema as registerEditColumnLabel };
