import express from 'express';
import controller from '../controllers/fileController';
import { fileUpload } from 'middlewares/multerValidation.mw';
import { registerFile } from 'db/schema/registerFile';
import { validateFile } from 'middlewares/validateFile.mw';

const router = express.Router();

router.get('/:fileId', controller.getFileById);
router.post('/:userId', fileUpload.single('file'), controller.addFileByUserId);
router.put('/:fileId', registerFile, validateFile, controller.editFileById);
router.delete('/:fileId', controller.deleteFileById);

export = router;
