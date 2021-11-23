import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../config/postgres';
import { fileNegativeOrNanInputError, fileDNEError, fileMimetypeError } from 'util/errorMessages';
import { isInvalidInput } from 'util/isInvalidInput';

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

const addFile = async (req: any, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `CREATING AN ${TABLE_NAME.toUpperCase()}`);
  try {
    const filepath = req.file.path;
    const mimetype = req.file.mimetype;
    await Knex.insert(inputtedReqFile(req, filepath, mimetype)).into(TABLE_NAME);
    const numFiles = await Knex(TABLE_NAME).count('id').first();
    const retrievedCreatedFile = await Knex.select('*').from(TABLE_NAME).where('id', numFiles.count);
    logging.info(NAMESPACE, `CREATED ${TABLE_NAME.toUpperCase()}`, retrievedCreatedFile);
    res.status(201).send(retrievedCreatedFile);
  } catch (error: any) {
    res.status(400).send(fileMimetypeError);
  }
};

export default { getFileById, addFile };
