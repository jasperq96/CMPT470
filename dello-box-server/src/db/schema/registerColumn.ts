import { check } from 'express-validator';

const createEditColumnSchema = [check('title').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character')];

const editOrderColumnSchema = [
  check('columns.*.id').trim().escape().isLength({ min: 1 }).isString().isString().withMessage('Must have a length of at least 1 character'),
  check('columns.*.col_order').trim().escape().notEmpty().isNumeric().withMessage('Must be a number')
];

const deleteColumnSchema = [
  check('col_id').trim().escape().isLength({ min: 1 }).isString().withMessage('Must have a length of at least 1 character'),
  check('list_of_tasks_length').trim().escape().notEmpty().isNumeric().withMessage('Must be a number'),
  check('list_of_tasks.*.id').trim().escape().notEmpty().isNumeric().withMessage('Must be a number'),
  check('list_of_tasks.*.col_id').trim().escape().isLength({ min: 1 }).isString().withMessage('Must have a length of at least 1 character'),
  check('list_of_tasks.*.index').trim().escape().notEmpty().isNumeric().withMessage('Must be a number'),
  check('list_of_columns.*.id').trim().escape().isLength({ min: 1 }).isString().withMessage('Must have a length of at least 1 character'),
  check('list_of_columns.*.col_order').trim().escape().notEmpty().isNumeric().withMessage('Must be a number')
];

export { createEditColumnSchema as registerCreateEditColumn, editOrderColumnSchema as registerEditOrderColumn, deleteColumnSchema as registerDeleteColumn };
