import express from 'express';
import controller from '../controllers/taskController';
import { registerTask } from 'db/schema/registerTask';
import { validateTask } from 'middlewares/validateTask.mw';

const router = express.Router();

router.get('', controller.getTasks);
router.get('/:userId', controller.getTasksByUserId);
router.get('/view/:id', controller.getTaskById);
router.put('/:id', registerTask, validateTask, controller.editTaskById);
router.delete('/:id', controller.deleteTaskById);

export = router;
