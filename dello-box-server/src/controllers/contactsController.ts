import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from 'config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';
import { contactNegativeOrNanInputError, contactDNEError } from 'utils/errorMessages';
import { getItems } from './requestTemplates/getAllRequest';

const NAMESPACE = 'Contact List Control';
const TABLE_NAME = 'contact_list';

const getContacts = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const getContactsByUserId = async (req: Request, res: Response, next: NextFunction) => {
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
    const retrievedUserInfo = await Knex.select('user_info.first_name', 'user_info.last_name')
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

    logging.info(NAMESPACE, `RETRIEVED USER INFO FOR USER ${userId}`, retrievedUserInfo);

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

const editUserInfoByUserId = async (req: Request, res: Response, next: NextFunction) => {
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

export default { getContacts, getContactsByUserId, editUserInfoByUserId };
