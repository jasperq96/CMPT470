import { check } from 'express-validator';

const usernameSchema = [check('username').escape().isLength({ min: 4 }).withMessage('Must be a minimum of 4 characters')];

export { usernameSchema as registerUsername };
