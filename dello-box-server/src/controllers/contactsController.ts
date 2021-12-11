import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from 'config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';
import { contactNegativeOrNanInputError, contactDNEError } from 'utils/errorMessages';
import { getItems } from './requestTemplates/getAllRequest';

const NAMESPACE = 'Contact List Control';
const TABLE_NAME = 'contact_list';

const getAllContactLists = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME, 'id');
};

const getContactsOfUserId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING ${TABLE_NAME.toLocaleUpperCase()} BY USER ID`);
  const userId: number = +req.params.userId;
  if (isInvalidInput(userId)) {
    res.status(400).send(contactNegativeOrNanInputError);
    return;
  }

  try {
    const userId: number = +req.params.userId;
    const listOfContacts = await Knex.select(`${TABLE_NAME}.contacts`).from(TABLE_NAME).where('user_id', userId).first(); //stores ID's of my contacts
    const listOfNicknames = await Knex.select('user_info.contact_nicknames').from('user_info').where('user_id', userId).first();
    const retrievedUserInfo = await Knex.select('user_info.first_name', 'user_info.last_name', 'user_info.email', 'user_info.phone')
      .from('user_info')
      .where(`user_info.user_id`, 'in', listOfContacts['contacts'])
      .andWhere(`user_info.user_id`, '<>', userId);

    listOfNicknames['contact_nicknames'] = JSON.parse(listOfNicknames['contact_nicknames']);

    /*
    Does not need to cover the case where the list of contacts contains yourself. Adding a contact, the query will exclude yourself as an option
    */
    listOfContacts['contacts'].forEach((id: number, contact: number) => {
      if (String(id) in listOfNicknames['contact_nicknames']) {
        retrievedUserInfo[contact]['nickname'] = listOfNicknames['contact_nicknames'][String(id)];
      }
    });

    if (!retrievedUserInfo) {
      res.status(404).send(contactDNEError);
      return;
    }
    res.status(200).send(retrievedUserInfo);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const getUsersByUsername = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING USER INFO BY USERNAME`);
  const userId: number = +req.params.userId;
  const userName: string = req.body.username;
  if (isInvalidInput(userId)) {
    res.status(400).send(contactNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedUserInfo = await Knex.select('username', 'first_name', 'last_name')
      .from('user')
      .join('user_info', 'user.id', 'user_info.user_id')
      .where('username', 'like', '%' + userName + '%')
      .andWhere(`user_info.user_id`, '<>', userId);

    if (!retrievedUserInfo) {
      res.status(404).send(contactDNEError);
      return;
    }
    res.status(200).send(retrievedUserInfo);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const editNicknameOfContacts = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = +req.params.userId;
  const contactId: number = req.body.contactId;
  const newNickname: string = req.body.newNickname;

  logging.info(NAMESPACE, `EDITING A ${TABLE_NAME.toUpperCase()} BY ID`);
  if (isInvalidInput(userId)) {
    res.status(400).send(contactNegativeOrNanInputError);
    return;
  }

  try {
    const listOfNicknames = await Knex.select('user_info.contact_nicknames').from('user_info').where('user_id', userId).first();
    listOfNicknames['contact_nicknames'] = JSON.parse(listOfNicknames['contact_nicknames']);
    listOfNicknames['contact_nicknames'][String(contactId)] = newNickname;
    var new_list = [JSON.stringify(listOfNicknames['contact_nicknames'])];

    for (let i = 0; i < listOfNicknames['contact_nicknames'].length; i++) {
      if (new_list[i] == '"') {
        new_list[i] = '\\"';
      }
    }

    const editByItemId = await Knex.update({ contact_nicknames: new_list }).into('user_info').where('user_info.user_id', '=', userId);
    if (!editByItemId) {
      res.status(404).send(contactDNEError);
      return;
    }
    const retrievedEditedItem = await Knex.select('contact_nicknames').from('user_info').where('user_info.user_id', '=', userId);
    logging.info(NAMESPACE, `EDITED USER_INFO WITH ID ${userId}`, retrievedEditedItem);
    res.status(201).send(retrievedEditedItem);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const deleteContactById = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = +req.params.userId;
  const contactId: number = +req.body.contactId;

  logging.info(NAMESPACE, `EDITING CONTACTS IN ${TABLE_NAME.toUpperCase()} BY ID`);
  if (isInvalidInput(userId)) {
    res.status(400).send(contactNegativeOrNanInputError);
    return;
  }

  try {
    const listOfContacts = await Knex.select('contacts').from(`${TABLE_NAME}`).where('user_id', userId).first();
    const index = listOfContacts['contacts'].indexOf(contactId);
    if (index == -1) {
      res.status(404).send(contactDNEError);
      return;
    }
    listOfContacts['contacts'].splice(index, 1);
    const editByItemId = await Knex.update({ contacts: listOfContacts['contacts'] }).into(`${TABLE_NAME}`).where('user_id', '=', userId);
    if (!editByItemId) {
      res.status(404).send(contactDNEError);
      return;
    }
    const retrievedEditedItem = await Knex.select('contacts').from(`${TABLE_NAME}`).where('user_id', '=', userId);
    logging.info(NAMESPACE, `EDITED CONTACTS_LIST WITH ID ${userId}`, retrievedEditedItem);
    res.status(201).send(retrievedEditedItem);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const addContactById = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = +req.params.userId;
  const contactId: number = +req.body.contactId;
  if (userId == contactId) {
    res.status(400).send('Cannot Add Yourself');
    return;
  }

  logging.info(NAMESPACE, `EDITING CONTACTS IN ${TABLE_NAME.toUpperCase()} BY ID`);
  if (isInvalidInput(userId)) {
    res.status(400).send(contactNegativeOrNanInputError);
    return;
  }

  try {
    const listOfContacts = await Knex.select('contacts').from(`${TABLE_NAME}`).where('user_id', userId).first();
    if (listOfContacts['contacts'].includes(contactId)) {
      res.status(400).send('Contact already exists');
      return;
    }

    const userExists = await Knex.select('user_id').from('user_info').where('user_id', contactId).andWhere('user_id', '<>', userId);
    if (!userExists.length) {
      res.status(404).send(contactDNEError);
      return;
    }

    listOfContacts['contacts'].push(contactId);
    listOfContacts['contacts'].sort(function (a: number, b: number) {
      return a - b;
    });

    const editByItemId = await Knex.update({ contacts: listOfContacts['contacts'] }).into(`${TABLE_NAME}`).where('user_id', '=', userId);
    if (!editByItemId) {
      res.status(404).send(contactDNEError);
      return;
    }

    const retrievedEditedItem = await Knex.select('contacts').from(`${TABLE_NAME}`).where('user_id', '=', userId);
    logging.info(NAMESPACE, `EDITED CONTACTS_LIST WITH ID ${userId}`, retrievedEditedItem);
    res.status(201).send(retrievedEditedItem);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getAllContactLists, getContactsOfUserId, getUsersByUsername, editNicknameOfContacts, deleteContactById, addContactById };
