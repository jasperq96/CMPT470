import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../config/postgres';
import { fileNegativeOrNanInputError, fileDNEError, fileMimetypeError, filePostInputError, fileByUserIdNegativeOrNanInputError } from 'utils/errorMessages';
import { isInvalidInput } from 'utils/isInvalidInput';
import { deleteUploadedFile } from 'utils/removeAssetFile';
import { File } from 'db/models/fileModel';

const NAMESPACE = 'File Control';
const TABLE_NAME = 'file';

const inputtedReqFile = (req: any, userId: number, filepath: any, mimetype: any) => {
  const { filename, size } = req.file;
  return { is_public: false, user_id: userId, filename: filename, filepath: filepath, mimetype: mimetype, size: size };
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
    const insertedFile = await Knex.insert(inputtedReqFile(req, userId, filepath, mimetype)).into(TABLE_NAME).returning('*');
    const retrievedCreatedFile: File = await Knex.select('*').from(TABLE_NAME).where('id', insertedFile[0].id).first();
    logging.info(NAMESPACE, `CREATED ${TABLE_NAME.toUpperCase()}`, retrievedCreatedFile);
    res.status(201).send(retrievedCreatedFile);
  } catch (error: any) {
    res.status(400).send(fileMimetypeError);
  }
};

const deleteFileById = async (req: any, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `DELETING A ${TABLE_NAME.toUpperCase()} BY ID`);
  const fileId: number = +req.params.fileId;
  if (isInvalidInput(fileId)) {
    res.status(400).send(fileByUserIdNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedFileById: File = await Knex.select('filepath').from(TABLE_NAME).where('id', fileId).first();
    logging.info(NAMESPACE, 'DELETED FILE IS ', retrievedFileById);
    const deleteByFileId = await Knex(TABLE_NAME).del().where('id', '=', fileId);
    if (!deleteByFileId) {
      res.status(404).send(fileDNEError);
      return;
    }
    deleteUploadedFile(NAMESPACE, '/home/node/app/'.concat(retrievedFileById.filepath));
    logging.info(NAMESPACE, `DELETED ${TABLE_NAME.toUpperCase()} WITH ID ${fileId} AND FILE PATH`, retrievedFileById);
    res.sendStatus(204);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getFileById, addFileByUserId, deleteFileById };
