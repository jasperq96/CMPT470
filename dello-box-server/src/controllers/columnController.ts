import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../config/postgres';
import { isInvalidUserId } from 'utils/isInvalidUserId';
import { columnsNegativeOrNanInputError, columnsDNEError, columnPostInputError, columnLabelInputError, columnDNEError, taskDNEError } from 'utils/errorMessages';
import { getItemsByCustomQuery } from './requestTemplates/getAllRequest';
import { getItemsByUserId } from './requestTemplates/getByUserIdRequest';
import { createItem } from './requestTemplates/createRequest';
import { updateItems } from './requestTemplates/editByIdRequest';
import { removeItemById } from './requestTemplates/deleteByIdRequest';
import { Task } from 'db/models/taskModel';
import { Column, ColumnOrder } from 'db/models/columnModel';
import { generateUUID } from 'utils/generateUUID';

const NAMESPACE = 'Column Control';
const TABLE_COLUMN = 'column';
const TABLE_TASK = 'task';
const TEMPLATE_VER_1 = 1;
const TEMPLATE_VER_2 = 2;

export const insertNewUserColumns = async (userId: number): Promise<Column[]> => {
  const columnSeed: Column[] = [];
  const columnTitles: string[] = ['To-Do', 'In-Progress', 'Complete'];

  for (let i = 0; i < 3; i++) {
    const newColumn: Column = {
      id: generateUUID(),
      user_id: userId,
      title: columnTitles[i],
      col_order: i
    };
    columnSeed.push(newColumn);
  }
  return await Knex(TABLE_COLUMN).insert(columnSeed).returning('*');
};

const createInputtedReqBody = (req: Request, userId: number, colOrder: number) => {
  const { title } = req.body;
  return { id: generateUUID(), user_id: userId, title: title, col_order: colOrder };
};

const editLabelInputtedReqBody = (req: Request) => {
  const { title } = req.body;
  return { title: title };
};

export const editColumnOrderInputtedReqBody = (colOrder: string) => {
  return { col_order: colOrder };
};

const queryAllByUserIdAndColOrder = () => {
  return Knex.select('*').from(TABLE_COLUMN).orderBy('user_id').orderBy('col_order');
};

const getColumns = async (req: Request, res: Response, next: NextFunction) => {
  await getItemsByCustomQuery(req, res, next, NAMESPACE, TABLE_COLUMN, queryAllByUserIdAndColOrder());
};

const getColumnsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = +req.params.userId;
  await getItemsByUserId(req, res, next, NAMESPACE, TABLE_COLUMN, columnsNegativeOrNanInputError, columnsDNEError, userId, 'col_order');
};

const createColumn = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = +req.params.userId;
  if (await isInvalidUserId(userId)) {
    res.status(400).send(columnPostInputError);
    return;
  }
  const numColumnsForUser = await Knex(TABLE_COLUMN).count('col_order AS total').where('user_id', userId).first();
  await createItem(req, res, next, NAMESPACE, TABLE_COLUMN, createInputtedReqBody(req, userId, parseInt(numColumnsForUser.total)));
};

const editColumnTitleById = async (req: any, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `EDITING A ${TABLE_COLUMN.toUpperCase()} BY ID`);
  const columnId: string = req.params.id;
  const retrieveColumnWithColumnId: Column = await Knex.select('*').from(TABLE_COLUMN).where('id', columnId).first();
  if (!retrieveColumnWithColumnId) {
    res.status(400).send(columnLabelInputError);
    return;
  }
  try {
    const retrievedEditedColumn = await Knex.update(editLabelInputtedReqBody(req)).into(TABLE_COLUMN).where('id', columnId).returning('*');
    logging.info(NAMESPACE, `EDITED COLUMN WITH ID ${retrievedEditedColumn[0].id}`, retrievedEditedColumn);
    res.status(201).send(retrievedEditedColumn);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const editColumnOrder = async (req: Request, res: Response, next: NextFunction) => {
  const columnsToUpdate: ColumnOrder[] = req.body.columns;
  const retrievedUpdatedColumns: Column[] | boolean | undefined = await updateItems(req, res, next, NAMESPACE, TABLE_COLUMN, columnsToUpdate, TEMPLATE_VER_2);
  if (!res.headersSent) res.status(201).send(retrievedUpdatedColumns);
};

const deleteColumn = async (req: Request, res: Response, next: NextFunction) => {
  const tasksToDeleteLength: number = +req.body.list_of_tasks_length;
  const tasksToDelete: Task[] = req.body.list_of_tasks;
  let ERROR_DETECTED: boolean | undefined = false;
  for (let i = 0; i < tasksToDeleteLength; i++) {
    ERROR_DETECTED = await removeItemById(req, res, next, NAMESPACE, TABLE_TASK, tasksToDelete[i].id, TEMPLATE_VER_1);
    if (ERROR_DETECTED) break;
  }
  if (ERROR_DETECTED) {
    res.status(404).send(taskDNEError);
    return;
  }
  const columnId: string = req.body.col_id;
  const columnToDelete: boolean | undefined = await removeItemById(req, res, next, NAMESPACE, TABLE_COLUMN, columnId, TEMPLATE_VER_2);
  if (columnToDelete) {
    res.status(404).send(columnDNEError);
    return;
  }
  const columnsToUpdate: ColumnOrder[] = req.body.list_of_columns;
  const retrievedUpdatedColumns: Column[] | boolean | undefined = await updateItems(req, res, next, NAMESPACE, TABLE_COLUMN, columnsToUpdate, TEMPLATE_VER_2);
  if (!res.headersSent) res.sendStatus(204);
};

export default { getColumns, getColumnsByUserId, createColumn, editColumnTitleById, editColumnOrder, deleteColumn };
