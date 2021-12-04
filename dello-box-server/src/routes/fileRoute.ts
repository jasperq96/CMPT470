import express from 'express';
import controller from '../controllers/fileController';
import { fileUpload } from 'middlewares/multerValidation.mw';

const router = express.Router();

router.get('/:fileId', controller.getFileById);
router.post('/:userId', fileUpload.single('file'), controller.addFileByUserId);
router.delete('/:fileId', controller.deleteFileById);

export = router;
