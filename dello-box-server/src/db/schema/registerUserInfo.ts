import { check } from 'express-validator';

const userInfoSchema = [
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

export { userInfoSchema as registerUserInfo };
