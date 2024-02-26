import express ,  { Router }  from "express"

const userroute = express.Router();
import getUsers from "../controller/getUsers"
import tokenValidation from "../middleware/tokenValidation";

userroute.get("/profile" , tokenValidation  ,getUsers)
userroute.get("/users"   ,getUsers)

export default userroute