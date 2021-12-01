import express from 'express';
import controller from '../controllers/userInfoController';
import { registerUserInfo } from 'db/schema/registerUserInfo';
import { validateUserInfo } from 'middlewares/validateUserInfo.mw';

const router = express.Router();

router.get('', controller.getUserInfo);
router.get('/:userId', controller.getUserInfoByUserId);
router.put('/:userId', registerUserInfo, validateUserInfo, controller.editUserInfoByUserId);

export = router;
