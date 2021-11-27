import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';

const NAMESPACE = 'Task Control';
const TABLE_NAME = 'task';

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

export default { getTasks };
