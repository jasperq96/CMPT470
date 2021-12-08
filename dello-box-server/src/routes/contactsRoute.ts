import express from 'express';
import controller from '../controllers/contactsController';
import { registerNickName } from 'db/schema/registerNickname';
import { registerUserId } from 'db/schema/registerUserId';
import { validateNickname } from 'middlewares/validateNickname.mw';
import { validateUserId } from 'middlewares/validateUserId.mw';

const router = express.Router();

router.get('', controller.getContacts);
router.get('/:userId', controller.getContactsByUserId);
router.put('/:userId', registerNickName, validateNickname, controller.editNicknameOfContacts);
router.delete('/:userId', registerUserId, validateUserId, controller.deleteContactById);
router.post('/:userId', registerUserId, validateUserId, controller.addContactById);

export = router;
