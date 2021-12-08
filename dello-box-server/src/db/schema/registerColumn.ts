import { check } from 'express-validator';

const columnSchema = [
  check('label').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character'),
  check('order').trim().escape().isNumeric().withMessage('Must be a number')
];

export { columnSchema as registerColumn };
