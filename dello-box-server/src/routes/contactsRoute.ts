import express from 'express';
import controller from '../controllers/contactsController';
import { registerNickName } from 'db/schema/registerNickname';
import { registerContactId } from 'db/schema/registerContactId';
import { validateNickname } from 'middlewares/validateNickname.mw';
import { validateContactId } from 'middlewares/validateContactId.mw';

const router = express.Router();

router.get('', controller.getAllContactLists);
router.get('/filter/:userId/:userName', controller.getUsersByUsername);
router.get('/:userId', controller.getContactsOfUserId);

router.put('/:userId/nickname', registerNickName, validateNickname, controller.editNicknameOfContacts);
router.put('/:userId/add', registerContactId, validateContactId, controller.addContactById);

router.delete('/:userId', registerContactId, validateContactId, controller.deleteContactById);

export = router;
