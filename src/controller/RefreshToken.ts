import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel";

const JWT_REFRESH_SECRET = "priyal";
const JWT_SECRET = "hello world";

const RefreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token is required' });
        }
        
        const user = await User.findOne({ refreshToken });
        if (!user) return res.sendStatus(403); // Forbidden 

        jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err:any, decoded: any) => {
            if (err || user?.email !== decoded.email) return res.sendStatus(403);

            const accessToken = jwt.sign({ userId: decoded._id, email: decoded.email }, JWT_SECRET, { expiresIn: '10s' });

            res.status(200).json({ accessToken });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default RefreshToken;
