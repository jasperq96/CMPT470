import { check } from 'express-validator';

const createTaskSchema = [
  check('title').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character'),
  check('notes').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character'),
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
  check('colId').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character')
];

const editFieldsTaskSchema = [
  check('title').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character'),
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
  check('notes').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character')
];

const editOrderTaskSchema = [
  check('tasks.*.id').trim().escape().notEmpty().isNumeric().withMessage('Must be a number'),
  check('tasks.*.col_id').trim().escape().isLength({ min: 1 }).withMessage('Must have a length of at least 1 character'),
  check('tasks.*.index').trim().escape().notEmpty().isNumeric().withMessage('Must be a number')
];

export { createTaskSchema as registerCreateTask, editFieldsTaskSchema as registerEditFieldsTask, editOrderTaskSchema as registerEditOrderTask };
