const negativeOrNanInputError = (url: string) => {
  return { error: `Incorrect usage for ${url}, id must be a positive integer` };
};

const dneError = (entity: string, errorMessage: string) => {
  return { error: `${entity} ${errorMessage}` };
};

const invalidExtension = (entity: string, extensionTypes: string) => {
  return { error: `${entity} must be of extension types ${extensionTypes}` };
};

const inputError = (url: string) => {
  return { error: `Incorrect usage for ${url}, must be a valid id` };
};

const fileNegativeOrNanInputError = negativeOrNanInputError('/file/:fileId');
const fileDNEError = dneError('file', 'does not exist');
const fileMimetypeError = invalidExtension('file', 'png, jpg, or jpeg');
const fileByUserIdNegativeOrNanInputError = inputError('/file/:userId');
const filesDNEError = dneError('files', 'do not exist for this user');
const filePostInputError = inputError('/file/:userId');
const userInfoNegativeOrNanInputError = negativeOrNanInputError('/user-info/:userId');
const userInfoDNEError = dneError('user', 'does not exist');
const tasksNegativeOrNanInputError = negativeOrNanInputError('/task/:userId');
const tasksDNEError = dneError('tasks', 'do not exist for this user or user does not exist');
const taskNegativeOrNanInputError = negativeOrNanInputError('/task/view/:id');
const taskDNEError = dneError('task', 'does not exist');
const taskEditDeleteNegativeOrNanInputError = negativeOrNanInputError('/task/:id');
const contactDNEError = dneError('Contacts', 'do not exist for this user');
const contactNegativeOrNanInputError = negativeOrNanInputError('/contacts/:userId');
const columnLabelNegativeOrNanInputError = negativeOrNanInputError('/column/:id/label');
const columnOrderNegativeOrNanInputError = negativeOrNanInputError('/column/:id/order');
const columnDNEError = dneError('column', 'does not exist');

export {
  fileNegativeOrNanInputError,
  fileDNEError,
  fileMimetypeError,
  fileByUserIdNegativeOrNanInputError,
  filesDNEError,
  filePostInputError,
  userInfoNegativeOrNanInputError,
  userInfoDNEError,
  tasksNegativeOrNanInputError,
  tasksDNEError,
  taskNegativeOrNanInputError,
  taskDNEError,
  taskEditDeleteNegativeOrNanInputError,
  contactDNEError,
  contactNegativeOrNanInputError,
  columnLabelNegativeOrNanInputError,
  columnOrderNegativeOrNanInputError,
  columnDNEError
};
