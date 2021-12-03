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
    const listOfContacts = await Knex.select(`${TABLE_NAME}.contacts`).from(TABLE_NAME).where('user_id', userId);

    const retrievedUserInfo = await Knex.select('user_info.first_name', 'user_info.last_name')
      .from(TABLE_NAME)
      .crossJoin('user_info')
      .where(`user_info.user_id`, 'in', listOfContacts[0]['contacts'])
      .andWhere(`${TABLE_NAME}.user_id`, userId)
      .andWhere(`user_info.user_id`, '<>', userId);
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
