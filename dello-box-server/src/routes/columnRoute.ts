import express from 'express';
import controller from '../controllers/columnController';
import { registerCreateEditColumn } from 'db/schema/registerColumn';
import { validateColumn } from 'middlewares/validateColumn.mw';

const router = express.Router();

router.get('', controller.getColumns);
router.post('/:userId', registerCreateEditColumn, validateColumn, controller.createColumn);
router.put('/:id/label', registerCreateEditColumn, validateColumn, controller.editColumnLabelById);

export = router;
