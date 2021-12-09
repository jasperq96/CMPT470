import { check } from 'express-validator';

const usernameSchema = [
  check('username')
    .custom((val) => /^[^<>]+$/.test(val))
    .withMessage('Cannot contain < or >')
];

export { usernameSchema as registerUsername };
