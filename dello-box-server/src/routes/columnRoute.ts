import express from 'express';
import controller from '../controllers/columnController';
import { registerCreateColumn, registerEditColumnLabel } from 'db/schema/registerColumn';
import { validateColumn } from 'middlewares/validateColumn.mw';

const router = express.Router();

router.get('', controller.getColumns);
router.post('', registerCreateColumn, validateColumn, controller.createColumn);
router.put('/:id/label', registerEditColumnLabel, validateColumn, controller.editColumnLabelById);

export = router;
