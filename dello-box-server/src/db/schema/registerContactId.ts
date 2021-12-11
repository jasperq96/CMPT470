import { check } from 'express-validator';

const userIdSchema = [
  check('contactId')
    .custom((val) => /^([1-9])\d*$/.test(val))
    .withMessage('Has to be an integer that does not start with a 0')
];

export { userIdSchema as registerContactId };
