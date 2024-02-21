import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "hello world";
interface customRequest extends Request {
    user?: string
}

const tokenValidation = (req: customRequest, res: Response, next: NextFunction): void => {
    const authHeader = (req.headers.Authorization || req.headers.authorization) as string;
    if (!authHeader?.startsWith('Bearer ')) {
        res.sendStatus(401);
        return
    }
    const token: string = authHeader.split(' ')[1];
    // console.log(token);
    jwt.verify(
        token,
        JWT_SECRET,
        (err: any, decoded: any) => {
            if (err) return res.status(403).json({ message: "invalid token"}); // invalid token
            req.user = decoded.username;
            next();
        }
    );
};

export default tokenValidation
