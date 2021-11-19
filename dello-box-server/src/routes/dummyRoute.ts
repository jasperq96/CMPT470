import express from 'express';
import controller from '../controllers/dummyController';

const router = express.Router();

router.get('', controller.getDummies);

export = router;
