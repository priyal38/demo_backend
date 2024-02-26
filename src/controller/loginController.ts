import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/userModel";

const JWT_SECRET = "hello world";
const JWT_REFRESH_SECRET = "priyal";


const Login = async (req: Request, res: Response) => {
try{
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "username and password required" })
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const accessToken = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '10s' });
  const refreshToken = jwt.sign({ userId: user._id, email: user.email }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

  

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure:true,
    sameSite:'none',
    maxAge: 24 * 60 * 60 * 1000
  });

  user.refreshToken = refreshToken;
  const result = await user.save();
  // return res.json({ accessToken  , refreshToken});
  return res.json({ accessToken  });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "User not found" });
}
}

  

export default Login;
