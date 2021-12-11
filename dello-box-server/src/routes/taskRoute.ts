import express from 'express';
import controller from '../controllers/taskController';
import { registerCreateTask, registerEditFieldsTask } from 'db/schema/registerTask';
import { validateTask } from 'middlewares/validateTask.mw';

const router = express.Router();

router.get('', controller.getTasks);
router.get('/:userId', controller.getTasksByUserId);
router.get('/view/:id', controller.getTaskById);
router.post('/:userId', registerCreateTask, validateTask, controller.createTask);
router.put('/:id', registerEditFieldsTask, validateTask, controller.editTaskFieldsById);
router.delete('/:id', controller.deleteTaskById);

export = router;
