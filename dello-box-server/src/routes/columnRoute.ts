import express from 'express';
import controller from '../controllers/columnController';
import { registerColumn } from 'db/schema/registerColumn';
import { validateColumn } from 'middlewares/validateColumn.mw';

const router = express.Router();

router.get('', controller.getColumns);
router.post('', registerColumn, validateColumn, controller.createColumn);

export = router;
