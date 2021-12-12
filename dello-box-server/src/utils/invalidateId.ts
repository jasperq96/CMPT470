import { Response } from 'express';
import { Knex } from '../config/postgres';
import { isInvalidInput } from './isInvalidInput';
import { Task } from 'db/models/taskModel';
import { Column } from 'db/models/columnModel';
import { columnDNEError, taskDNEError } from './errorMessages';

export const invalidateId = async (res: Response, item: any, templateIndicator: number) => {
  switch (templateIndicator) {
    case 1:
      const retrievedColumnWithColumnId: Column = await Knex.select('*').from('column').where('id', item.col_id).first();
      if (!retrievedColumnWithColumnId) {
        res.status(400).send(columnDNEError);
        return true;
      }
      if (isInvalidInput(item.id) || isNaN(item.id)) {
        res.status(400).send(taskDNEError);
        return true;
      }
      const retrievedTaskWithTaskId: Task = await Knex.select('*').from('task').where('id', item.id).first();
      if (!retrievedTaskWithTaskId) {
        res.status(400).send(taskDNEError);
        return true;
      }
      return false;
    case 2:
      const retrievedColumnWithId: Column = await Knex.select('*').from('column').where('id', item.id).first();
      if (!retrievedColumnWithId) {
        res.status(400).send(columnDNEError);
        return true;
      }
      return false;
    default:
      return false;
  }
};

export const isInvalidId = async (columnIdName: string, itemId: any, tableName: string, templateIndicator: number) => {
  switch (templateIndicator) {
    case 1:
      if (isInvalidInput(itemId) || isNaN(itemId)) {
        return true;
      }
      const retrievedItemWithId: Task = await Knex.select('*').from(tableName).where(columnIdName, itemId).first();
      if (!retrievedItemWithId) {
        return true;
      }
      return false;
    case 2:
      const retrieveItemWithItemId: Column = await Knex.select('*').from(tableName).where(columnIdName, itemId).first();
      if (!retrieveItemWithItemId) {
        return true;
      }
      return false;
    default:
      return false;
  }
};
