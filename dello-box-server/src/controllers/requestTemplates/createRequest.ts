import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../config/postgres';
import { Task } from 'db/models/taskModel';

export const createItem = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string, inputtedReqBody: object) => {
  logging.info(namespace, `CREATING A ${tableName.toUpperCase()}`);
  try {
    const createdItem = await Knex.insert(inputtedReqBody).into(tableName).returning('*');
    const retrievedCreatedItem: Task = await Knex.select('*').from(tableName).where('id', '=', createdItem[0].id).first();
    logging.info(namespace, `CREATED ${tableName.toUpperCase()}`, retrievedCreatedItem);
    res.status(201).send(retrievedCreatedItem);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error.message);
  }
};
