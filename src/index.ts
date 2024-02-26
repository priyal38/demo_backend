import express from "express";
import {json} from "body-parser";
import cors from "cors"
import indexRoutes from "./routes/index"
import connection from "./db";
import cookieparser from "cookie-parser";
import requestsValidator from "./middleware/requestValidator";

const app = express();
app.use(json())
app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true
    }
)); 
app.use(cookieparser());
app.use(requestsValidator)

connection();

app.use("/api" , indexRoutes);

app.listen(5000 ,()=>{
    console.log("server running on port 5000");
})

