import { login, refresh } from "@/controllers/AuthController.js";
import express, { Router } from "express";

export const authRouter: Router = express.Router();

authRouter.post("/login", login);
authRouter.post("/refresh", refresh);