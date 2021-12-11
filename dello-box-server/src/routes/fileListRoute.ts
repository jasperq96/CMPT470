import express from 'express';
import controller from '../controllers/fileListController';

const router = express.Router();

router.get('/:userId/all', controller.getAllFilesByUserId);
router.get('/public', controller.getPublicFiles);
router.get('/:userId/private', controller.getPrivateFilesByUserId);

export = router;
