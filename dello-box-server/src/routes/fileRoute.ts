import express from 'express';
import controller from '../controllers/fileController';
import { fileUpload } from 'middlewares/multerValidation';

const router = express.Router();

router.get('/:fileId', controller.getFileById);
router.post('', fileUpload.single('file'), controller.addFile);

export = router;
