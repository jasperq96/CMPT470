import express from 'express';
import controller from '../controllers/userInfoController';

const router = express.Router();

router.get('', controller.getUserInfo);
router.get('/:userId', controller.getUserInfoByUserId);
router.put('/:userId', controller.editUserInfoByUserId);

export = router;
