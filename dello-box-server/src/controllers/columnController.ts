import { Request, Response, NextFunction } from 'express';
import { getItems } from './requestTemplates/getAllRequest';
import { createItem } from './requestTemplates/createRequest';
import { editItemById } from './requestTemplates/editByIdRequest';
import { columnLabelNegativeOrNanInputError, columnOrderNegativeOrNanInputError, columnDNEError } from 'utils/errorMessages';

const NAMESPACE = 'Column Control';
const TABLE_NAME = 'column';

const createInputtedReqBody = (req: Request) => {
  const { label, order } = req.body;
  return { label: label, order: order };
};

const editLabelInputtedReqBody = (req: Request) => {
  const { label } = req.body;
  return { label: label };
};

const getColumns = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME);
};

const createColumn = async (req: Request, res: Response, next: NextFunction) => {
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, createInputtedReqBody(req));
};

const editColumnLabelById = async (req: any, res: Response, next: NextFunction) => {
  const columnId: number = +req.params.id;
  await editItemById(req, res, next, NAMESPACE, TABLE_NAME, columnLabelNegativeOrNanInputError, columnDNEError, editLabelInputtedReqBody(req), columnId, 'id');
};

export default { getColumns, createColumn, editColumnLabelById };
