import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';
import { Task, TaskOrder } from 'db/models/taskModel';
import { File } from 'db/models/fileModel';
import { Column } from 'db/models/columnModel';
import { editTaskOrderInputtedReqBody } from 'controllers/taskController';
import { columnDNEError, taskDNEError } from 'utils/errorMessages';

const InvalidateId = async (res: Response, item: any, templateIndicator: number) => {
  switch (templateIndicator) {
    case 1:
      const retrieveColumnWithColumnId: Column = await Knex.select('*').from('column').where('id', item.col_id).first();
      if (!retrieveColumnWithColumnId) {
        res.status(400).send(columnDNEError);
        return true;
      }
      if (isInvalidInput(item.id) || isNaN(item.id)) {
        res.status(400).send(taskDNEError);
        return true;
      }
      const retrievedTask = await Knex.select('*').from('task').where('id', item.id);
      if (!retrievedTask.length) {
        res.status(400).send(taskDNEError);
        return true;
      }
      return false;
    case 2:
      const retrieveColumnWithId: Column = await Knex.select('*').from('column').where('id', item.id).first();
      if (!retrieveColumnWithId) {
        res.status(400).send(columnDNEError);
        return true;
      }
      return false;
    default:
      return false;
  }
};

const useInputtedBody = (item: any, templateIndicator: number) => {
  switch (templateIndicator) {
    case 1:
      return editTaskOrderInputtedReqBody(item.col_id, item.index);
    default:
      return { error: -1 };
  }
};

export const editItemById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  namespace: string,
  tableName: string,
  negativeOrNanInputError: object,
  dneError: object,
  inputtedReqBody: object,
  columnId: number,
  columnLabel: string
) => {
  logging.info(namespace, `EDITING A ${tableName.toUpperCase()} BY ID`);
  if (isInvalidInput(columnId)) {
    res.status(400).send(negativeOrNanInputError);
    return;
  }

  try {
    const editByItemId = await Knex.update(inputtedReqBody).into(tableName).where(`${tableName}.${columnLabel}`, '=', columnId);
    if (!editByItemId) {
      res.status(404).send(dneError);
      return;
    }
    const retrievedEditedItem: Task | File | Column = await Knex.select('*').from(tableName).where(`${tableName}.${columnLabel}`, '=', columnId).first();
    logging.info(namespace, `EDITED ${tableName.toUpperCase()} WITH ID ${columnId}`, retrievedEditedItem);
    res.status(201).send(retrievedEditedItem);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};

export const updateItems = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string, itemsToInsert: TaskOrder[], templateIndicator: number) => {
  logging.info(namespace, `UPDATING INSTANCES OF ${tableName.toUpperCase()}`);
  let ERROR_DETECTED: boolean = false;
  try {
    let updatedItems: any[] = [];
    for (let i = 0; i < itemsToInsert.length; i++) {
      ERROR_DETECTED = await InvalidateId(res, itemsToInsert[i], templateIndicator);
      if (ERROR_DETECTED) break;
      updatedItems.push(await Knex.update(useInputtedBody(itemsToInsert[i], templateIndicator)).into(tableName).where('id', itemsToInsert[i].id).returning('id'));
    }
    if (ERROR_DETECTED) return ERROR_DETECTED;
    let retrievedUpdatedItems: Task[] = [];
    for (let i = 0; i < updatedItems.length; i++) {
      const retrievedUpdatedItem: Task = await Knex.select('*').from(tableName).where(`${tableName}.id`, updatedItems[i][0]).first();
      retrievedUpdatedItems.push(retrievedUpdatedItem);
    }
    logging.info(namespace, 'RETRIEVED UPDATED INSTANCES OF ${tableName.toUpperCase()}', retrievedUpdatedItems);
    return retrievedUpdatedItems;
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};
