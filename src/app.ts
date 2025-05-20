import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { archiveRouter } from "@/routes/ArchiveRoute.js";
import { authorRouter } from "@/routes/AuthorRoute.js";
import { collectionRouter } from "@/routes/CollectionsRoute.js";
import { libraryRouter } from "@/routes/LibraryRoute.js";
import { userRouter } from "@/routes/UsersRoute.js";
import { authRouter } from "@/routes/AuthRoute";
import { GalleryRouter } from "@/routes/GalleryRoute";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const url = "/"
app.use(url, express.static("public/"))
app.use(url, authRouter)
app.use(url, archiveRouter)
app.use(url, authorRouter)
app.use(url, collectionRouter)
app.use(url, libraryRouter)
app.use(url, GalleryRouter)
app.use(url, userRouter)

export default app
