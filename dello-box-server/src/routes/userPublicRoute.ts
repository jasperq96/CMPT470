import express from 'express';
import controller from '../controllers/userController';
import { registerUser, registerUUID } from 'db/schema/registerUser';
import { validateUser } from 'middlewares/validateUser.mw';

const router = express.Router();

router.post('', registerUser, validateUser, controller.createUser);
router.delete('/:userId', registerUUID, validateUser, controller.deleteUserByUserId);

export = router;
