import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';

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
    const retrievedEditedItem = await Knex.select('*').from(tableName).where(`${tableName}.${columnLabel}`, '=', columnId);
    logging.info(namespace, `EDITED ${tableName.toUpperCase()} WITH ID ${columnId}`, retrievedEditedItem);
    res.status(201).send(retrievedEditedItem);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};