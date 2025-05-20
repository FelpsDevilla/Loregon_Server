import { config } from '@/config/config';
import { Request } from 'express';
import multer from 'multer';

const storageImages = multer.diskStorage({
  destination: config.filesPath.archiveImages,
  filename: (_: Request, file: Express.Multer.File, cb) => {
    const uniqueName = `${Date.now()}.${file.originalname}`;
    cb(null, uniqueName);
  },
}
);

export const archiveUploadImages = multer({storage: storageImages});