import express from 'express';
import controller from '../controllers/userInfoController';

const router = express.Router();

router.get('', controller.getUserInfo);

export = router;
