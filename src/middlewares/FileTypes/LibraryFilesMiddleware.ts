import { InvalidFileTypeError } from "@/Errors/InvalidFileTypeError";
import { NextFunction, Request, Response } from "express";
import { fileTypeFromBuffer } from "file-type";
import fs from "fs";

const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

export const libaryFilesVerifyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = req.files as Record<string, Express.Multer.File[]>;

        if (!(files.image) && !(files.book)) {
            next();
            return
        }

        if(!(files.image == undefined)){
            await verifyType(files.image)
        }

        if(!(files.book == undefined)){
            await verifyType(files.book)
        } 

        next();
    } catch (error) {
        if (error instanceof InvalidFileTypeError) {
            res.status(415).send(error.message);
            return
        }
    }
};

async function verifyType(file: Express.Multer.File[]): Promise<void> {
    const buffer = fs.readFileSync(file[0].path);
    const type = await fileTypeFromBuffer(buffer);
    if (!type || !allowedTypes.includes(type.mime)) {
        fs.rmSync(file[0].path);
        throw new InvalidFileTypeError();
    }
}