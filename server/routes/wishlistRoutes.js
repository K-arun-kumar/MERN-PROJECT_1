

// import express from "express";
// import {
//   addToWishlist,
//   getWishlist,
//   removeFromWishlist
// } from "../controller/wishlistController.js";

// const router = express.Router();

// router.post("/add", addToWishlist);
// router.get("/get/:userEmail", getWishlist);
// router.delete("/remove/:userEmail/:productId", removeFromWishlist);

// export default router;


import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controller/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToWishlist);
router.get("/get/:userId", protect, getWishlist);
router.delete("/remove/:userId/:productId", protect, removeFromWishlist);

export default router;
