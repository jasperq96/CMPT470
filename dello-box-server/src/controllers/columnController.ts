import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';
import { columnPostInputError, columnLabelInputError } from 'utils/errorMessages';
import { getItemsByCustomQuery } from './requestTemplates/getAllRequest';
import { Column } from 'db/models/columnModel';
import { createItem } from './requestTemplates/createRequest';
import { generateUUID } from 'utils/generateUUID';

const NAMESPACE = 'Column Control';
const TABLE_NAME = 'column';

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

const createColumn = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = +req.params.userId;
  const retrievedUser = await Knex.select('*').from('user').where('id', userId);
  if (isInvalidInput(userId) || !retrievedUser.length) {
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

export default { getColumns, createColumn, editColumnLabelById };
