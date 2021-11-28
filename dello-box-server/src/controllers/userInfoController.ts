import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from 'config/postgres';
import { getItems } from './requestTemplates/getAllRequest';
import { isInvalidInput } from 'utils/isInvalidInput';
import { userInfoNegativeOrNanInputError, userInfoDNEError } from 'utils/errorMessages';

const NAMESPACE = 'User Information Control';
const TABLE_NAME = 'user_info';

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
      .where(`${TABLE_NAME}.user_id`, '=', userId);
    logging.info(NAMESPACE, `RETRIEVED USER INFO FOR USER ${userId}`, retrievedUserInfo);
    if (!retrievedUserInfo.length) {
      res.status(404).send(userInfoDNEError);
      return;
    }
    res.status(200).send(retrievedUserInfo);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getUserInfo, getUserInfoByUserId };
