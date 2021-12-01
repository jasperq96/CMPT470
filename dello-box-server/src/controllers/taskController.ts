import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from 'config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';
import { taskNegativeOrNanInputError, taskDNEError } from 'utils/errorMessages';
import { getItems } from './requestTemplates/getAllRequest';

const NAMESPACE = 'Task Control';
const TABLE_NAME = 'task';

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const getTasksByUserId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING ${TABLE_NAME.toLocaleUpperCase()} BY USER ID`);
  const userId: number = +req.params.userId;
  if (isInvalidInput(userId)) {
    res.status(400).send(taskNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedTask = await Knex.select(`${TABLE_NAME}.*`).from(TABLE_NAME).join('user', 'user.id', '=', `${TABLE_NAME}.user_id`).where(`${TABLE_NAME}.user_id`, '=', userId);
    logging.info(NAMESPACE, `RETRIEVED TASKS FOR USER ${userId}`, retrievedTask);
    if (!retrievedTask.length) {
      res.status(404).send(taskDNEError);
      return;
    }
    res.status(200).send(retrievedTask);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getTasks, getTasksByUserId };
