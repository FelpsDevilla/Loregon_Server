import { InvalidFileTypeError } from "@/Errors/InvalidFileTypeError";
import { NextFunction, Request, Response } from "express";
import { fileTypeFromBuffer } from "file-type";
import fs from "fs";

const allowedTypes = ["application/pdf"];

export const pdfVerifyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!(req.file)) {
            next();
            return 
        }

        const buffer = fs.readFileSync(req.file.path);
        const type = await fileTypeFromBuffer(buffer);

        if (!type || !allowedTypes.includes(type.mime)) {
            fs.rmSync(req.file.path);
            throw new InvalidFileTypeError();
        }

        next();
    } catch (error) {
        if (error instanceof InvalidFileTypeError) {
            res.status(415).send(error.message);
            return
        }
    }
};