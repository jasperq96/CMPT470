import express from 'express';
import controller from '../controllers/accountController';

const router = express.Router();

router.get('', controller.getAccounts);

export = router;
