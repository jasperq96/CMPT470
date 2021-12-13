const multer = require('multer');
const selectedFilepath = require('path');
const storageDirectory = 'assets/';

const configureStorage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, storageDirectory);
  },
  filename: (req: Request, file: any, cb: any) => {
    cb(null, new Date().valueOf() + '_' + file.originalname);
  }
});

const fileUpload = multer({
  storage: configureStorage,
  fileFilter: (req: Request, file: any, cb: any) => {
    const fileExtensions: string[] = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'pptx', 'csv', 'txt', 'zip'];
    const fileExtension = selectedFilepath.extname(file.originalname.toLowerCase());
    fileExtensions.forEach((fileExt: any) => {
      if (fileExtension !== fileExt) {
        return cb(null, false);
      }
    });
    cb(null, true);
  }
});

export { fileUpload };
