import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from 'config/postgres';
import { isInvalidInput } from 'utils/isInvalidInput';
import { tasksNegativeOrNanInputError, tasksDNEError, taskPostInputError, taskNegativeOrNanInputError, taskDNEError, taskEditDeleteNegativeOrNanInputError, columnDNEError } from 'utils/errorMessages';
import { Task, TaskOrder } from 'db/models/taskModel';
import { getItems } from './requestTemplates/getAllRequest';
import { getItemsByUserId } from './requestTemplates/getByUserIdRequest';
import { createItem } from './requestTemplates/createRequest';
import { editItemById, updateItems } from './requestTemplates/editByIdRequest';
import { deleteItemById } from './requestTemplates/deleteByIdRequest';
import { isInvalidUserId } from 'utils/isInvalidUserId';

const NAMESPACE = 'Task Control';
const TABLE_NAME = 'task';
const TEMPLATE_VER = 1;

const createInputtedReqBody = (req: Request, userId: number, colId: string, index: number) => {
  const { startDate, endDate, title, notes } = req.body;
  return { user_id: userId, col_id: colId, index: index, start_date: startDate, end_date: endDate, title: title, notes: notes };
};

const editFieldsInputtedReqBody = (req: Request) => {
  const { startDate, endDate, title, notes } = req.body;
  return { start_date: startDate, end_date: endDate, title: title, notes: notes };
};

export const editTaskOrderInputtedReqBody = (colId: string, index: number) => {
  return { col_id: colId, index: index };
};

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  await getItems(req, res, next, NAMESPACE, TABLE_NAME, 'id');
};

const getTasksByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId: number = +req.params.userId;
  await getItemsByUserId(req, res, next, NAMESPACE, TABLE_NAME, tasksNegativeOrNanInputError, tasksDNEError, userId, 'id');
};

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING A ${TABLE_NAME.toLocaleUpperCase()} BY ID`);
  const taskId: number = +req.params.id;
  if (isInvalidInput(taskId)) {
    res.status(400).send(taskNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedTask: Task = await Knex.select(`${TABLE_NAME}.*`).from(TABLE_NAME).where(`${TABLE_NAME}.id`, '=', taskId).first();
    logging.info(NAMESPACE, `RETRIEVED TASK WITH ID ${taskId}`, retrievedTask);
    if (!retrievedTask) {
      res.status(404).send(taskDNEError);
      return;
    }
    res.status(200).send(retrievedTask);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const colId: string = req.body.colId;
  const retrievedColumn = await Knex.select('*').from('column').where('id', colId);
  if (!retrievedColumn.length) {
    res.status(400).send(columnDNEError);
    return;
  }
  const userId: number = +req.params.userId;
  if (await isInvalidUserId(userId)) {
    res.status(400).send(taskPostInputError);
    return;
  }
  const numTasksForColumn = await Knex(TABLE_NAME).count('index AS total').where('col_id', colId).first();
  logging.info(NAMESPACE, 'NUM TASKS FOR COLUMN', numTasksForColumn);
  await createItem(req, res, next, NAMESPACE, TABLE_NAME, createInputtedReqBody(req, userId, colId, parseInt(numTasksForColumn.total)));
};

const editTaskFieldsById = async (req: Request, res: Response, next: NextFunction) => {
  const taskId: number = +req.params.id;
  await editItemById(req, res, next, NAMESPACE, TABLE_NAME, taskEditDeleteNegativeOrNanInputError, taskDNEError, editFieldsInputtedReqBody(req), taskId, 'id');
};

const editTaskOrderById = async (req: Request, res: Response, next: NextFunction) => {
  const tasksToUpdate: TaskOrder[] = req.body.tasks;
  const retrievedUpdatedTasks: Task[] | boolean | undefined = await updateItems(req, res, next, NAMESPACE, TABLE_NAME, tasksToUpdate, TEMPLATE_VER);
  if (!res.headersSent) res.status(201).send(retrievedUpdatedTasks);
};

const deleteTaskById = async (req: Request, res: Response, next: NextFunction) => {
  await deleteItemById(req, res, next, NAMESPACE, TABLE_NAME, taskEditDeleteNegativeOrNanInputError, taskDNEError);
};

export default { getTasks, getTasksByUserId, getTaskById, createTask, editTaskFieldsById, editTaskOrderById, deleteTaskById };
