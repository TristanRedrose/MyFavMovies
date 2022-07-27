import { Response, Request, NextFunction } from "express";

export function verifyToken(req: Request, res:Response, next: NextFunction) {
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.body.token = bearerToken;
            next();
        }
        else {
            res.sendStatus(403);
        };
    } catch (err) {
        console.log(err);
    }
};

