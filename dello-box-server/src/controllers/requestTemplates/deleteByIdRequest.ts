import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../config/postgres';
import { isInvalidId } from 'utils/invalidateId';
import { isInvalidInput } from 'utils/isInvalidInput';
import { Task } from 'db/models/taskModel';
import { Column } from 'db/models/columnModel';

export const deleteItemById = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string, negativeOrNanInputError: object, dneError: object) => {
  logging.info(namespace, `DELETING A ${tableName.toUpperCase()} BY ID`);
  const itemId: number = +req.params.id;
  if (isInvalidInput(itemId)) {
    res.status(400).send(negativeOrNanInputError);
    return;
  }

  try {
    const deleteByItemId: Task = await Knex(tableName).del().where('id', '=', itemId);
    if (!deleteByItemId) {
      res.status(404).send(dneError);
      return;
    }
    logging.info(namespace, `DELETED ${tableName.toUpperCase()} WITH ID ${itemId}`, deleteByItemId);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};

export const removeItemById = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string, columnId: number | string, templateIndicator: number) => {
  logging.info(namespace, `DELETING A ${tableName.toUpperCase()} BY ID`);
  try {
    const ERROR_DETECTED: boolean = await isInvalidId('id', columnId, tableName, templateIndicator);
    if (ERROR_DETECTED) return ERROR_DETECTED;
    const removeItemByItemId: Task | Column = await Knex(tableName).del().where('id', columnId).returning('*');
    logging.info(namespace, `DELETED ${tableName.toUpperCase()} WITH ID ${columnId}`, removeItemByItemId);
    return ERROR_DETECTED;
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};
