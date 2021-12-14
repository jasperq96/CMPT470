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
const fileMimetypeError = invalidExtension('file', 'pdf, png, jpg, jpeg, doc, docx, pptx, csv, txt or zip');
const fileByUserIdNegativeOrNanInputError = inputError('/file/:userId');
const filesDNEError = dneError('files', 'do not exist for this user');
const filePostInputError = inputError('/file/:userId');
const userInfoNegativeOrNanInputError = negativeOrNanInputError('/user-info/:userId');
const userInfoDNEError = dneError('user', 'does not exist');
const userDeleteInputError = inputError('/user/:userId');
const tasksNegativeOrNanInputError = negativeOrNanInputError('/task/:userId');
const tasksDNEError = dneError('tasks', 'do not exist for this user or user does not exist');
const taskPostInputError = inputError('/task/:userId');
const taskNegativeOrNanInputError = negativeOrNanInputError('/task/view/:id');
const taskDNEError = dneError('task', 'does not exist');
const taskEditDeleteNegativeOrNanInputError = negativeOrNanInputError('/task/:id');
const contactDNEError = dneError('Contacts', 'do not exist for this user');
const contactNegativeOrNanInputError = negativeOrNanInputError('/contacts/filter/:userId/:username');
const columnsNegativeOrNanInputError = negativeOrNanInputError('/column/:userId');
const columnsDNEError = dneError('columns', 'do not exist for this user or user does not exist');
const columnPostInputError = inputError('/column/:userId');
const columnLabelInputError = inputError('/column/:id/label');
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
  userDeleteInputError,
  tasksNegativeOrNanInputError,
  tasksDNEError,
  taskPostInputError,
  taskNegativeOrNanInputError,
  taskDNEError,
  taskEditDeleteNegativeOrNanInputError,
  contactDNEError,
  contactNegativeOrNanInputError,
  columnsNegativeOrNanInputError,
  columnsDNEError,
  columnPostInputError,
  columnLabelInputError,
  columnLabelNegativeOrNanInputError,
  columnOrderNegativeOrNanInputError,
  columnDNEError
};
