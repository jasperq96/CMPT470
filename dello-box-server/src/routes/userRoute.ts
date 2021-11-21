import express from 'express';
import controller from '../controllers/userController';

const router = express.Router();

router.get('', controller.getUsers);

export = router;
