import logging from '../config/logging';
const fs = require('fs');

export const deleteUploadedFile = (namespace: string, filepath: string) => {
  fs.unlink(filepath, (error: any) => {
    error ? logging.error(namespace, error.message, error) : logging.info(namespace, 'DELETED FILE WITH FILEPATH: ', filepath);
  });
};
