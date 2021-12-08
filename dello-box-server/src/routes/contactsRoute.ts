import express from 'express';
import controller from '../controllers/contactsController';

const router = express.Router();

router.get('', controller.getContacts);
router.get('/:userId', controller.getContactsByUserId);
router.put('/:userId', controller.editUserInfoByUserId);

export = router;
