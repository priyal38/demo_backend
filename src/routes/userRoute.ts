import express ,  { Router }  from "express"

const userroute = express.Router();
import getProfile from "../controller/getProfile"
import tokenValidation from "../middleware/tokenValidation";

userroute.get("/profile" , tokenValidation  ,getProfile)

export default userroute