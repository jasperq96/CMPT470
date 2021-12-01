import { check } from 'express-validator';

const taskSchema = [
  check('userId').trim().escape().isNumeric().withMessage('Must be a number'),
  check('startDate')
    .notEmpty()
    .custom((val) => /^(19|20)\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(val))
    .trim()
    .escape()
    .withMessage('Must be in format yyyy:mm:dd hh:mm:ss'),
  check('endDate')
    .notEmpty()
    .custom((val) => /^(19|20)\d\d-(0[1-9]|1[012])-([012]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(val))
    .trim()
    .escape()
    .withMessage('Must be in format yyyy:mm:dd hh:mm:ss'),
  check('title').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character'),
  check('notes').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character')
];

export { taskSchema as registerTask };
