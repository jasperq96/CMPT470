import express from 'express';
import controller from '../controllers/userController';
import { registerUser } from 'db/schema/registerUser';
import { validateUser } from 'middlewares/validateUser.mw';

const router = express.Router();

router.get('', controller.getUsers);
router.post('', registerUser, validateUser, controller.createUser);

export = router;
