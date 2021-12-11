import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../config/postgres';
import { User } from 'db/models/userModel';
import { UserInfo } from 'db/models/userInfoModel';
import { Task } from 'db/models/taskModel';
import { Contacts } from 'db/models/contactModel';
import { Column } from 'db/models/columnModel';
import { File } from 'db/models/fileModel';

export const getItems = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string, columnName: string) => {
  logging.info(namespace, `GETTING LIST OF ${tableName.toUpperCase()}S`);
  try {
    const items: User[] | UserInfo[] | Task[] | Contacts[] | Column[] = await Knex.select('*').from(tableName).orderBy(`${columnName}`);
    logging.info(namespace, `RETRIEVED ${tableName.toUpperCase()}S:`, items);
    res.status(200).send(items);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error.message);
  }
};

export const getItemsByCustomQuery = async (req: Request, res: Response, next: NextFunction, namespace: string, tableName: string, customQuery: any) => {
  logging.info(namespace, `GETTING LIST OF ${tableName.toUpperCase()}S`);
  try {
    const items: File[] = await customQuery;
    logging.info(namespace, `RETRIEVED ${tableName.toUpperCase()}S:`, items);
    res.status(200).send(items);
  } catch (error: any) {
    logging.error(namespace, error.message, error);
    res.status(500).send(error.message);
  }
};
