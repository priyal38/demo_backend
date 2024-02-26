import express ,  { Router }  from "express"

import signupController from "../controller/signupController"
import loginController from "../controller/loginController"
import refreshTokenController from "../controller/RefreshToken";
import refreshController from "../controller/refreshToken2"
// import { validateUser } from "../validator/userValidator";
import schemaValidator from "../middleware/schemaValidator";

const auth = express.Router();

auth.post("/signup" ,  schemaValidator("/auth/signup") ,signupController )
auth.post("/login",  schemaValidator("/auth/login"),loginController )
auth.post("/refresh" , refreshTokenController)
auth.get("/refresh1" , refreshController)

export default auth;