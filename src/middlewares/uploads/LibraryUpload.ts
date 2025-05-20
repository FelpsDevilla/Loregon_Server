import { config } from '@/config/config';
import { Request } from 'express';
import multer from 'multer';

export const storageBooksAndImage = multer.diskStorage({
    destination: config.filesPath.libraryBooks,
    filename: (_: Request, file: Express.Multer.File, cb) => {
      const uniqueName = `${Date.now()}.${file.originalname}`;
      cb(null, uniqueName);
    },
  }
  );

export const libraryUploadBookAndImage = multer({storage: storageBooksAndImage});