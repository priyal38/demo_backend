import express ,  { Router }  from "express"

import signupController from "../controller/signupController"
import loginController from "../controller/loginController"
import refreshTokenController from "../controller/RefreshToken";
import refreshController from "../controller/refreshToken2"

const auth = express.Router();

auth.post("/signup" ,signupController )
auth.post("/login" ,loginController )
auth.post("/refresh" , refreshTokenController)
auth.get("/refresh1" , refreshController)

export default auth;