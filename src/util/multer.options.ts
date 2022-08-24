import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';

export const registProductMulterOption = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, '../../', './image');
      if (!existsSync(uploadPath)) {
        // uploads 폴더가 존재하지 않을시, 생성.
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      // file.originalname = Date.now() + '.' + file.mimetype.split('/')[1];
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;
      cb(null, fileName);
    },
  }),
};
