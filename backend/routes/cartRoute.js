import cartController from "../controllers/cartController.js"
import express from "express"

const cartRouter = express.Router();

cartRouter.get("/getItems",cartController.getCartItems);
cartRouter.post("/add",cartController.addToCart);
cartRouter.post("/remove",cartController.deleteFromCart);

export default cartRouter