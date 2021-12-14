import { check } from 'express-validator';

const userSchema = [
  check('username').trim().escape().isLength({ min: 4 }).withMessage('Must have a length of at least 4 characters'),
  check('password').trim().escape().isLength({ min: 8 }).withMessage('Must have a length of at least 8 characters'),
  check('firstName').trim().escape().isLength({ min: 1 }).isString().withMessage('Must have a length of at least 1 character'),
  check('lastName').trim().escape().isLength({ min: 1 }).isString().withMessage('Must have a length of at least 1 character'),
  check('email').isEmail().trim().escape().normalizeEmail().withMessage('Must be a valid email'),
  check('phone')
    .notEmpty()
    .custom((val) => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val))
    .trim()
    .escape()
    .withMessage('Must be in format XXX-XXX-XXXX')
];

const uuidSchema = [check('uuid').trim().escape().isLength({ min: 1 }).isString().withMessage('Must have a length of at least 1 character')];

export { userSchema as registerUser, uuidSchema as registerUUID };
