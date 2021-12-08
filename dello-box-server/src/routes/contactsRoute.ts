import express from 'express';
import controller from '../controllers/contactsController';
import { registerNickName } from 'db/schema/registerNickname';
import { validateNickname } from 'middlewares/validateNickname.mw';

const router = express.Router();

router.get('', controller.getContacts);
router.get('/:userId', controller.getContactsByUserId);
router.put('/:userId', registerNickName, validateNickname, controller.editNicknameOfContacts);
router.delete('/:userId', controller.deleteContactById);
router.post('/:userId', controller.addContactById);

export = router;
