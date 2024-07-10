import {} from 'dotenv/config';
import express, { json } from "express";
import cors from "cors";

import { connect } from 'mongoose';
import { default as foodRouter } from './routes/foodRoute.js';
import userRouter from './routes/userRoutes.js';
const uri = "mongodb://localhost:27017/FoodSite";
connect(uri)

const app = express();
app.use(json());
app.use(cors());
app.use("/images",express.static("uploads"))
//API ENDPOINTS
app.use("/api/user",userRouter)
app.use("/api/food",foodRouter)

app.get('/',(req,res)=>{
    res.send("Server running");
})
app.listen(process.env.PORT,()=>{
    console.log("App is running on port",process.env.PORT);
})
