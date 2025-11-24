

import express from "express";
import {
  addToCart,
  getUserCart,
  removeFromCart,
  updateQuantity,
} from "../controller/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/add", protect, addToCart);
route.get("/get/:userId", protect, getUserCart);
route.delete("/remove/:userId/:productId", protect, removeFromCart);
route.post("/update-qty", protect, updateQuantity);

export default route;

