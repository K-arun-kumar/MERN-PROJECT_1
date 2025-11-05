import express from "express";
import { addToCart, getUserCart, removeFromCart, updateQuantity } from "../controller/cartController.js";

const route = express.Router();
route.post("/add", addToCart);
route.get("/get/:userId", getUserCart);
route.delete("/remove/:userId/:productId",removeFromCart);
route.post("/update-qty", updateQuantity);



export default route;
