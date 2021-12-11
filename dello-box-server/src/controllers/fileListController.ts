import { Request, Response, NextFunction } from 'express';
import { NAMESPACE_FILE, TABLE_FILE, getFilesByUserId, queryAllFiles, queryPublicFiles, queryPrivateFiles } from './requestTemplates/fileListRequest';
import { getItemsByCustomQuery } from './requestTemplates/getAllRequest';

const getAllFilesByUserId = async (req: Request, res: Response, next: NextFunction) => {
  await getFilesByUserId(req, res, next, queryAllFiles(+req.params.userId));
};

const getPublicFiles = async (req: Request, res: Response, next: NextFunction) => {
  await getItemsByCustomQuery(req, res, next, NAMESPACE_FILE, TABLE_FILE, queryPublicFiles());
};

const getPrivateFilesByUserId = async (req: Request, res: Response, next: NextFunction) => {
  await getFilesByUserId(req, res, next, queryPrivateFiles(+req.params.userId));
};

export default { getAllFilesByUserId, getPublicFiles, getPrivateFilesByUserId };
