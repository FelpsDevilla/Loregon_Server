import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";
import { deleteAuthorRequest, getAllAuthorsRequest, getAuthorByIdRequest, insertAuthorRequest, updateAuthorRequest } from "@/controllers/AuthorsController.js";
import express, { Router } from "express";

export const authorRouter: Router = express.Router();
const url = "/authors";

authorRouter.post(url, auth, insertAuthorRequest);
authorRouter.get(url, auth, getAllAuthorsRequest);
authorRouter.get(`${url}/:id`, auth, getAuthorByIdRequest);
authorRouter.put(`${url}/:id`, auth, updateAuthorRequest);
authorRouter.delete(`${url}/:id`, onlyAdmins, auth,deleteAuthorRequest);