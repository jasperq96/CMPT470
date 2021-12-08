import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from 'config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';
import { contactNegativeOrNanInputError, contactDNEError } from 'utils/errorMessages';
import { getItems } from './requestTemplates/getAllRequest';
import { editItemById } from './requestTemplates/editByIdRequest';

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

// const editUserInfoByUserId = async (req: Request, res: Response, next: NextFunction) => {
//   const userId: number = +req.params.userId;
//   await editItemById(req, res, next, NAMESPACE, TABLE_NAME, userInfoNegativeOrNanInputError, userInfoDNEError, inputtedReqBody(req), userId, 'user_id');
// };

export default { getContacts, getContactsByUserId };
