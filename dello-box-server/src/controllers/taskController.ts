import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from 'config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';
import { tasksNegativeOrNanInputError, tasksDNEError, taskNegativeOrNanInputError, taskDNEError } from 'utils/errorMessages';
import { getItems } from './requestTemplates/getAllRequest';
import { Task } from 'db/models/taskModel';

const NAMESPACE = 'Task Control';
const TABLE_NAME = 'task';

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const getTasksByUserId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING ${TABLE_NAME.toLocaleUpperCase()}S BY USER ID`);
  const userId: number = +req.params.userId;
  if (isInvalidInput(userId)) {
    res.status(400).send(tasksNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedTasks: Task[] = await Knex.select(`${TABLE_NAME}.*`).from(TABLE_NAME).join('user', 'user.id', '=', `${TABLE_NAME}.user_id`).where(`${TABLE_NAME}.user_id`, '=', userId);
    logging.info(NAMESPACE, `RETRIEVED TASKS FOR USER ${userId}`, retrievedTasks);
    if (!retrievedTasks.length) {
      res.status(404).send(tasksDNEError);
      return;
    }
    res.status(200).send(retrievedTasks);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING A ${TABLE_NAME.toLocaleUpperCase()} BY ID`);
  const taskId: number = +req.params.id;
  if (isInvalidInput(taskId)) {
    res.status(400).send(taskNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedTask: Task = await Knex.select(`${TABLE_NAME}.*`).from(TABLE_NAME).where(`${TABLE_NAME}.id`, '=', taskId).first();
    logging.info(NAMESPACE, `RETRIEVED TASK WITH ID ${taskId}`, retrievedTask);
    if (!retrievedTask) {
      res.status(404).send(taskDNEError);
      return;
    }
    res.status(200).send(retrievedTask);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getTasks, getTasksByUserId, getTaskById };
