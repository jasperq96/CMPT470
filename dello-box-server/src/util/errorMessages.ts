const negativeOrNanInputError = (url: string) => {
  return { error: `Incorrect usage for ${url}, id must be a positive integer` };
};

const dneError = (entity: string, errorMessage: string) => {
  return { error: `${entity} ${errorMessage}` };
};

const invalidExtension = (entity: string, extensionTypes: string) => {
  return { error: `${entity} must be of extension types ${extensionTypes}` };
};

const fileNegativeOrNanInputError = negativeOrNanInputError('/file/:fileId');
const fileDNEError = dneError('file', 'does not exist');
const fileMimetypeError = invalidExtension('file', 'png, jpg, or jpeg');

export { fileNegativeOrNanInputError, fileDNEError, fileMimetypeError };
