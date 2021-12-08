import logging from '../config/logging';
import { Request, Response, NextFunction } from 'express';
import { Knex } from '../config/postgres';
import { fileByUserIdNegativeOrNanInputError, filesDNEError } from 'utils/errorMessages';
import { isInvalidInput } from 'utils/isInvalidInput';
import { File } from 'db/models/fileModel';

const NAMESPACE = 'File List Control';
const TABLE_NAME = 'file';

const getFilesByUserId = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `GETTING ALL ${TABLE_NAME.toUpperCase()}S FOR BY USER ID`);
  const userId: number = +req.params.userId;
  if (isInvalidInput(userId)) {
    res.status(400).send(fileByUserIdNegativeOrNanInputError);
    return;
  }

  try {
    const retrievedFileInformation: File[] = await Knex.select('*').from(TABLE_NAME).where('user_id', '=', userId);
    logging.info(NAMESPACE, `RETRIEVED ${TABLE_NAME.toUpperCase()} INFORMATION FOR USER ${userId}`, retrievedFileInformation);
    if (!retrievedFileInformation.length) {
      res.status(404).send(filesDNEError);
      return;
    }
    res.status(200).send(retrievedFileInformation);
  } catch (error: any) {
    logging.error(NAMESPACE, error.message, error);
    res.status(500).send(error);
  }
};

export default { getFilesByUserId };
