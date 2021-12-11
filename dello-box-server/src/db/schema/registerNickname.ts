import { check } from 'express-validator';

const nickNameSchema = [
  check('newNickname')
    .custom((val) => /^[^<>]+$/.test(val))
    .withMessage('Cannot contain < or >')
];

export { nickNameSchema as registerNickName };
