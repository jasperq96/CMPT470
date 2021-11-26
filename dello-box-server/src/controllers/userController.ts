import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Knex } from '../config/postgres';

const NAMESPACE = 'Account Control';
const TABLE_NAME = 'user';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${TABLE_NAME}S`);
  try {
    const retrievedUsers = await Knex.select('*').from(TABLE_NAME);
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME}S:`, retrievedUsers);
    res.status(200).send(retrievedUsers);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { getUsers };
