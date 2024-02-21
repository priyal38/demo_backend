import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel";

const JWT_REFRESH_SECRET = "priyal";
const JWT_SECRET = "hello world";

 const refreshTokenGenerate = async(req:Request,res:Response)=>{
 
    const cookies = await req.cookies;
    console.log("cookies reached")
   
    if (!cookies?.jwt) return res.sendStatus(401);
   
 
    const refreshToken = cookies.jwt;
 
    const user = await User.findOne({refreshToken});
 
    if(!user){
        return res.status(403).json("User is not registered");
    }
 
    jwt.verify(
        refreshToken,
        JWT_REFRESH_SECRET,
        (err:any)=>{
            if(err){
                return res.status(401)
            }
 
            const accessToken = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET , {expiresIn : "10s"});
 
            res.json({accessToken});
        }
    )
}
 
export default refreshTokenGenerate