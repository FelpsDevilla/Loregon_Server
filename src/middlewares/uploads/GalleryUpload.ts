import { config } from '@/config/config';
import { Request } from 'express';
import multer from 'multer';

const storageImages = multer.diskStorage({
  destination: config.filesPath.galleryImages,
  filename: (_: Request, file: Express.Multer.File, cb) => {
    const uniqueName = `${Date.now()}.${file.originalname}`;
    cb(null, uniqueName);
  },
}
);

export const galleryUploadImages = multer({storage: storageImages});