import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../config/postgres';
import { isInvalidUserId } from 'utils/isInvalidUserId';
import { columnsNegativeOrNanInputError, columnsDNEError, columnPostInputError, columnLabelInputError } from 'utils/errorMessages';
import { getItemsByCustomQuery } from './requestTemplates/getAllRequest';
import { getItemsByUserId } from './requestTemplates/getByUserIdRequest';
import { createItem } from './requestTemplates/createRequest';
import { Column } from 'db/models/columnModel';
import { generateUUID } from 'utils/generateUUID';

const NAMESPACE = 'Column Control';
const TABLE_NAME = 'column';

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
  return await Knex(TABLE_NAME).insert(columnSeed).returning('*');
};

const createInputtedReqBody = (req: Request, userId: number, colOrder: number) => {
  const { title } = req.body;
  return { id: generateUUID(), user_id: userId, title: title, col_order: colOrder };
};

const editLabelInputtedReqBody = (req: Request) => {
  const { title } = req.body;
  return { title: title };
};

const queryAllByUserIdAndColOrder = () => {
  return Knex.select('*').from(TABLE_NAME).orderBy('user_id').orderBy('col_order');
};

const getColumns = async (req: Request, res: Response, next: NextFunction) => {
  await getItemsByCustomQuery(req, res, next, NAMESPACE, TABLE_NAME, queryAllByUserIdAndColOrder());
};

const getColumnsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = +req.params.userId;
  await getItemsByUserId(req, res, next, NAMESPACE, TABLE_NAME, columnsNegativeOrNanInputError, columnsDNEError, userId, 'id');
};

const createColumn = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = +req.params.userId;
  if (await isInvalidUserId(userId)) {
    res.status(400).send(columnPostInputError);
    return;
  }
  const numColumnsForUser = await Knex(TABLE_NAME).count('col_order AS total').where('user_id', userId).first();
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, createInputtedReqBody(req, userId, parseInt(numColumnsForUser.total)));
};

const editColumnLabelById = async (req: any, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `EDITING A ${TABLE_NAME.toUpperCase()} BY ID`);
  const columnId: string = req.params.id;
  const retrieveColumnWithColumnId: Column = await Knex.select('*').from(TABLE_NAME).where('id', columnId).first();
  if (!retrieveColumnWithColumnId) {
    res.status(400).send(columnLabelInputError);
    return;
  }
  try {
    const retrievedEditedColumn = await Knex.update(editLabelInputtedReqBody(req)).into(TABLE_NAME).where('id', columnId).returning('*');
    logging.info(NAMESPACE, `EDITED COLUMN WITH ID ${retrievedEditedColumn[0].id}`, retrievedEditedColumn);
    res.status(201).send(retrievedEditedColumn);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getColumns, getColumnsByUserId, createColumn, editColumnLabelById };
