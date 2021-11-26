import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Knex } from '../config/postgres';

const NAMESPACE = 'Task Control';
const TABLE_NAME = 'task';

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING LIST OF ${TABLE_NAME}S`);
  try {
    const retrievedTasks = await Knex.select('*').from(TABLE_NAME);
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME}S:`, retrievedTasks);
    res.status(200).send(retrievedTasks);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error.message);
  }
};

export default { getTasks };
