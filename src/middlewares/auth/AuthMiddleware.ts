import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/classes/User";
import { getUserById } from "@/models/UserModel";

export async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const ACCESS_SECRET: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
        const authHeader: string | undefined = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Token missing or malformed' });
            return;
        }
        const accessToken = authHeader.split(' ')[1];

        jwt.verify(accessToken, ACCESS_SECRET);
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid or expired token.' });
            return;
        }
        console.error("Authentication Error:", error);
        res.status(500).json({ message: 'Unexpected authentication error: ' + error });
        return;
    }
}

export async function onlyAdmins(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const authHeader: string | undefined = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Token missing or malformed' });
            return;
        }
        const accessToken = authHeader.split(' ')[1];

        const payload: JwtPayload = jwt.decode(accessToken) as JwtPayload;
        const user: User = await getUserById(payload.userId);

        if (!user?.isAdmin) {
            res.status(401).json({ message: 'User does not have permission.' });
            return;
        }

        next();
    } catch (error) {
        console.error("Admin Authorization Error:", error);
        res.status(500).json({ message: "Unexpected error while verifying permissions." });
    }
}