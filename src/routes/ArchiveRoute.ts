import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware";
import { deleteItemRequest, getAllItemsRequest, getItemByIdRequest, insertItemRequest, updateItemRequest } from "@/controllers/ArchiveController.js";
import express, { Router } from "express";
import { archiveUploadImages } from "@/middlewares/uploads/ArchiveUpload";
import { imageVerifyMiddleware } from "@/middlewares/FileTypes/imageVerifyMiddleware";
import { config } from "@/config/config";

export const archiveRouter: Router = express.Router();
const url = "/archive";

archiveRouter.use(`${url}/images`, express.static(config.filesPath.archiveImages));

archiveRouter.post(url, auth, archiveUploadImages.single("image"), imageVerifyMiddleware, insertItemRequest);
archiveRouter.get(url, getAllItemsRequest);
archiveRouter.get(`${url}/:id`, auth, getItemByIdRequest);
archiveRouter.put(`${url}/:id`, auth, updateItemRequest);
archiveRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteItemRequest);