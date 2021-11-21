import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Knex } from '../config/postgres';

const NAMESPACE = 'User Control';
const TABLE_NAME = 'user_info';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${TABLE_NAME}S`);
  try {
    const retrievedDummies = await Knex.select('*').from(TABLE_NAME);
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME}S:`, retrievedDummies);
    res.status(200).send(retrievedDummies);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { getUsers };
