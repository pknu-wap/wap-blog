import { HttpException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const multerOptions: MulterOptions = {
  limits: { fileSize: 1024 * 1024 * 5 }, // 5mb로 제한
  fileFilter: function (_req, file, callback) {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      callback(new HttpException('Unvalid Type', 422), false);
    }
  },
};

export default multerOptions;
