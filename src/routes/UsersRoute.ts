import { deleteUserRequest, getAllUsersRequest, getUserByIdRequest, insertUserRequest, updateUserRequest } from "@/controllers/UserController.js";
import  express, { Router }  from "express";
import { auth, onlyAdmins } from "@/middlewares/auth/AuthMiddleware.js";

export const userRouter: Router = express.Router();
const url = "/users";

userRouter.post(url, auth, onlyAdmins, insertUserRequest);
userRouter.get(url, auth, onlyAdmins, getAllUsersRequest);
userRouter.get(`${url}/:id`, auth, onlyAdmins, getUserByIdRequest);
userRouter.put(`${url}/:id`, auth, onlyAdmins, updateUserRequest);
userRouter.delete(`${url}/:id`, auth, onlyAdmins, deleteUserRequest);