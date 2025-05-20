import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";
import { deleteItemRequest, getAllItemsRequest, getItemByIdRequest, insertItemRequest, updateItemRequest } from "@/controllers/LibraryController.js";
import express, { Router } from "express";
import { libraryUploadBookAndImage } from "@/middlewares/uploads/LibraryUpload";
import { config } from "@/config/config";
import { libaryFilesVerifyMiddleware } from "@/middlewares/FileTypes/LibraryFilesMiddleware";

export const libraryRouter: Router = express.Router();
const url = "/library";

libraryRouter.use(`${url}/book`, express.static(config.filesPath.libraryBooks));

libraryRouter.post(url, auth, libraryUploadBookAndImage.fields([{name: "book", maxCount: 1}, {name: "image", maxCount: 1}]), libaryFilesVerifyMiddleware, insertItemRequest);
libraryRouter.get(url, getAllItemsRequest);
libraryRouter.get(`${url}/:id`, auth, getItemByIdRequest);
libraryRouter.put(`${url}/:id`, auth, updateItemRequest);
libraryRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteItemRequest);