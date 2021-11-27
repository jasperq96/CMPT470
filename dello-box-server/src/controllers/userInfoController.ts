import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';

const NAMESPACE = 'User Information Control';
const TABLE_NAME = 'user_info';

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

export default { getUserInfo };
