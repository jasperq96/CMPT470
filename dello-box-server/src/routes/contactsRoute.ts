import express from 'express';
import controller from '../controllers/contactsController';
import { registerNickName } from 'db/schema/registerNickname';
import { registerContactId } from 'db/schema/registerContactId';
import { validateNickname } from 'middlewares/validateNickname.mw';
import { validateContactId } from 'middlewares/validateContactId.mw';

const router = express.Router();

router.get('', controller.getContacts);
router.get('/:userId', controller.getContactsByUserId);
router.put('/:userId', registerNickName, validateNickname, controller.editNicknameOfContacts);
router.delete('/:userId', registerContactId, validateContactId, controller.deleteContactById);
router.post('/:userId', registerContactId, validateContactId, controller.addContactById);

export = router;
