import logging from '../../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../../config/postgres';
import { fileByUserIdNegativeOrNanInputError, filesDNEError } from '../../utils/errorMessages';
import { isInvalidInput } from '../../utils/isInvalidInput';
import { File } from '../../db/models/fileModel';

export const NAMESPACE_FILE = 'File List Control';
export const TABLE_FILE = 'file';

export const queryAllFiles = (userId: number) => {
  return Knex.select('*')
    .from(TABLE_FILE)
    .where('user_id', '=', userId)
    .orWhere((condition: any) => {
      condition.where('user_id', '<>', userId).andWhere('is_public', '=', true);
    })
    .orderBy('id');
};

export const queryPublicFiles = () => {
  return Knex.select('*').from(TABLE_FILE).where('is_public', '=', true).orderBy('id');
};

export const queryPrivateFiles = (userId: number) => {
  return Knex.select('*').from(TABLE_FILE).where('user_id', '=', userId).orderBy('id');
};

export const getFilesByUserId = async (req: Request, res: Response, next: NextFunction, queryForFiles: any) => {
  logging.info(NAMESPACE_FILE, `GETTING ALL ${TABLE_FILE.toUpperCase()}S FOR BY USER ID`);
  const userId: number = +req.params.userId;
  if (isInvalidInput(userId)) {
    res.status(400).send(fileByUserIdNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedFileInformation: File[] = await queryForFiles;
    logging.info(NAMESPACE_FILE, `RETRIEVED ${TABLE_FILE.toUpperCase()} INFORMATION FOR USER ${userId}`, retrievedFileInformation);
    if (!retrievedFileInformation.length) {
      res.status(404).send(filesDNEError);
      return;
    }
    res.status(200).send(retrievedFileInformation);
  } catch (error: any) {
    logging.error(NAMESPACE_FILE, error.message, error);
    res.status(500).send(error);
  }
};
