import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';
import { Task } from 'db/models/taskModel';
import { Column } from 'db/models/columnModel';

export const getItemsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  namespace: string,
  tableName: string,
  negativeOrNanInputError: object,
  dneError: object,
  userId: number,
  columnOrderBy: string
) => {
  logging.info(namespace, `GETTING ${tableName.toLocaleUpperCase()}S BY USER ID`);
  if (isInvalidInput(userId)) {
    res.status(400).send(negativeOrNanInputError);
    return;
  }

  try {
    const retrievedItems: Task[] | Column[] = await Knex.select(`${tableName}.*`)
      .from(tableName)
      .join('user', 'user.id', '=', `${tableName}.user_id`)
      .where(`${tableName}.user_id`, '=', userId)
      .orderBy(columnOrderBy);
    logging.info(namespace, `RETRIEVED ITEMS FOR ${tableName} ${userId}`, retrievedItems);
    if (!retrievedItems.length) {
      res.status(404).send(dneError);
      return;
    }
    res.status(200).send(retrievedItems);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};
