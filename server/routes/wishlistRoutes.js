import express from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controller/wishlistController.js";

const route = express.Router();

route.post("/add", addToWishlist);
route.get("/get/:email", getWishlist);
route.delete("/remove/:email/:productId", removeFromWishlist);

export default route;
