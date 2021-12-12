import { check } from 'express-validator';

const createEditColumnSchema = [check('title').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character')];

const editOrderColumnSchema = [
  check('columns.*.id').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character'),
  check('columns.*.col_order').trim().escape().notEmpty().isNumeric().withMessage('Must be a number')
];

export { createEditColumnSchema as registerCreateEditColumn, editOrderColumnSchema as registerEditOrderColumn };
