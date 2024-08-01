import express from "express"
import authMiddleware from "../middlewares/auth.js"
import orderController from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,orderController.placeOrder);
orderRouter.post('/verify',orderController.verifyOrder);
orderRouter.get('/userOrders',authMiddleware,orderController.userOrders);
orderRouter.get('/listAllOrders',orderController.listOrders);
orderRouter.post('/setStatus',orderController.setStatus);
export default orderRouter;
