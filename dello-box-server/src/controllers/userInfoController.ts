import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from 'config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';
import { userInfoNegativeOrNanInputError, userInfoDNEError } from 'utils/errorMessages';
import { getItems } from './requestTemplates/getAllRequest';
import { editItemById } from './requestTemplates/editByIdRequest';

const NAMESPACE = 'User Information Control';
const TABLE_NAME = 'user_info';

const inputtedReqBody = (req: Request) => {
  const { firstName, lastName, email, phone } = req.body;
  return { first_name: firstName, last_name: lastName, email: email, phone: phone };
};

const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const getUserInfoByUserId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING ${TABLE_NAME.toLocaleUpperCase()} BY USER ID`);
  const userId: number = +req.params.userId;
  if (isInvalidInput(userId)) {
    res.status(400).send(userInfoNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedUserInfo = await Knex.select(`${TABLE_NAME}.user_id`, 'user.username', `${TABLE_NAME}.first_name`, `${TABLE_NAME}.last_name`, `${TABLE_NAME}.email`, `${TABLE_NAME}.phone`)
      .from(TABLE_NAME)
      .join('user', 'user.id', '=', `${TABLE_NAME}.user_id`)
      .where(`${TABLE_NAME}.user_id`, '=', userId)
      .first();
    logging.info(NAMESPACE, `RETRIEVED USER INFO FOR USER ${userId}`, retrievedUserInfo);
    if (!retrievedUserInfo) {
      res.status(404).send(userInfoDNEError);
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
  await editItemById(req, res, next, NAMESPACE, TABLE_NAME, userInfoNegativeOrNanInputError, userInfoDNEError, inputtedReqBody(req), userId, 'user_id');
};

export default { getUserInfo, getUserInfoByUserId, editUserInfoByUserId };
