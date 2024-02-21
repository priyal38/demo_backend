import express from "express"
import authRoutes from "./authRoutes"
import userroute from "./userRoute";

const app =  express();
app.use("/auth" , authRoutes );
app.use("/user" , userroute );

export default app;