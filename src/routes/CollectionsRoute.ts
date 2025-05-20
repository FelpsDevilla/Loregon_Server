import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";
import { deleteCollectionRequest, getAllCollectionsRequest, getCollectionByIdRequest, insertCollectionRequest, updateCollectionRequest } from "@/controllers/CollectionController.js";
import express, { Router } from "express";

export const collectionRouter: Router = express.Router();
const url = "/collection";

collectionRouter.post(url, auth, insertCollectionRequest);
collectionRouter.get(url, getAllCollectionsRequest);
collectionRouter.get(`${url}/:id`, auth, getCollectionByIdRequest);
collectionRouter.put(`${url}/:id`, auth, updateCollectionRequest);
collectionRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteCollectionRequest);