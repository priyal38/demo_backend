
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import User from "../model/userModel"
import bcrypt from "bcryptjs";
 
const Signup =  async (req: Request, res: Response) => {
 
  const {  email, username, password } = req.body;
  try {
  if (!email ||!username || !password) return res.status(400).json({ message: "username and password required" })
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await User.create({
      
        email,
        username,
        password: hashedPassword,
      });
    user.save();
   
      if (user) {
        res.status(201).json(  {user, message: "registered successfully" });
 
      }
     
    }
     catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

 
export default Signup;
 