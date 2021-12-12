import express from 'express';
import controller from '../controllers/columnController';
import { registerCreateEditColumn, registerEditOrderColumn, registerDeleteColumn } from 'db/schema/registerColumn';
import { validateColumn } from 'middlewares/validateColumn.mw';

const router = express.Router();

router.get('', controller.getColumns);
router.get('/:userId', controller.getColumnsByUserId);
router.post('/:userId', registerCreateEditColumn, validateColumn, controller.createColumn);
router.put('/title/:id', registerCreateEditColumn, validateColumn, controller.editColumnTitleById);
router.put('/order', registerEditOrderColumn, validateColumn, controller.editColumnOrder);
router.delete('', registerDeleteColumn, validateColumn, controller.deleteColumn);

export = router;
