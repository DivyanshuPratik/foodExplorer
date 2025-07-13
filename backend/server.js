import {} from "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";

import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import authMiddleware from "./middlewares/auth.js";
import orderRouter from "./routes/orderRoute.js";

const uri = process.env.MONGO_URI;

connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(json());
app.use(cors());
app.use("/images", express.static("uploads"));

app.use("/api/order", orderRouter);
app.use("/api/cart", authMiddleware, cartRouter);
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);

app.get("/", (req, res) => {
  res.send("Server running");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App is running on port", port);
});
