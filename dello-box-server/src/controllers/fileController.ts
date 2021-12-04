import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../config/postgres';
import { fileNegativeOrNanInputError, fileDNEError, fileMimetypeError, filePostInputError } from 'utils/errorMessages';
import { isInvalidInput } from 'utils/isInvalidInput';
import { deleteUploadedFile } from 'utils/removeAssetFile';

const NAMESPACE = 'File Control';
const TABLE_NAME = 'file';

const inputtedReqFile = (req: any, filepath: any, mimetype: any) => {
  const { filename, size } = req.file;
  return { filename: filename, filepath: filepath, mimetype: mimetype, size: size };
};

const getFileById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING AN ${TABLE_NAME.toUpperCase()} BY ID`);
  const fileId: number = +req.params.fileId;
  if (isInvalidInput(fileId)) {
    res.status(400).send(fileNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedFilePath = await Knex.select('filepath').from(TABLE_NAME).where('id', '=', fileId);
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME.toUpperCase()} ${fileId}`, retrievedFilePath);
    if (!retrievedFilePath.length) {
      res.status(404).send(fileDNEError);
      return;
    }
    res.status(200).sendFile(`/home/node/app/${retrievedFilePath[0].filepath}`);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

const addFileByUserId = async (req: any, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `CREATING AN ${TABLE_NAME.toUpperCase()}`);
  const filepath = req.file.path;
  const mimetype = req.file.mimetype;
  const userId: number = +req.params.userId;
  const retrievedUser = await Knex.select('*').from('user').where('id', userId);
  if (isInvalidInput(userId) || !retrievedUser.length) {
    deleteUploadedFile(NAMESPACE, '/home/node/app/'.concat(filepath));
    res.status(400).send(filePostInputError);
    return;
  }

  try {
    const insertedFile = await Knex.insert(inputtedReqFile(req, filepath, mimetype)).into(TABLE_NAME).returning('*');
    const retrievedCreatedFile = await Knex.select('*').from(TABLE_NAME).where('id', insertedFile[0].id);
    logging.info(NAMESPACE, `CREATED ${TABLE_NAME.toUpperCase()}`, retrievedCreatedFile);
    res.status(201).send(retrievedCreatedFile);
  } catch (error: any) {
    res.status(400).send(fileMimetypeError);
  }
};

export default { getFileById, addFileByUserId };
