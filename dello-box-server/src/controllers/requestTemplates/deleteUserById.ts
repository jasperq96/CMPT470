import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../config/postgres';

export const deleteUser = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string, dneError: object) => {
  const userId: number = +req.params.userId;
  logging.info(namespace, `DELETING ${userId} FROM ${tableName.toUpperCase()}`);
  try {
    if (tableName == 'user') {
      const deleteUserById = await Knex(tableName).del().where('id', '=', userId);
      if (!deleteUserById) {
        return;
      }
      logging.info(namespace, `DELETED ${userId} FROM ${tableName.toUpperCase()}`, deleteUserById);
    } else {
      const deleteUserById = await Knex(tableName).del().where('user_id', '=', userId);
      if (!deleteUserById) {
        return;
      }
      logging.info(namespace, `DELETED ${userId} FROM ${tableName.toUpperCase()}`, deleteUserById);
    }
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error);
  }
};
