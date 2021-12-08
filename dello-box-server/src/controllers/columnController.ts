import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';
import { createItem } from './requestTemplates/createRequest';

const NAMESPACE = 'Column Control';
const TABLE_NAME = 'column';

const inputtedReqBody = (req: Request) => {
  const { label, order } = req.body;
  return { label: label, order: order };
};

const getColumns = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const createColumn = async (req: Request, res: Response, next: NextFunction) => {
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, inputtedReqBody(req));
};

export default { getColumns, createColumn };
