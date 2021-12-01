import express from 'express';
import controller from '../controllers/taskController';

const router = express.Router();

router.get('', controller.getTasks);
router.get('/:userId', controller.getTasksByUserId);

export = router;
