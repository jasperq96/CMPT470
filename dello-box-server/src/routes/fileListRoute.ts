import express from 'express';
import controller from '../controllers/fileListController';

const router = express.Router();

router.get('/:userId', controller.getFilesByUserId);

export = router;
