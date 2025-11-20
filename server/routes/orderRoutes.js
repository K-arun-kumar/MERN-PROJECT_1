// import express from "express";
// import Order from "../model/orderModel.js";

// const router = express.Router();

// // ✅ CREATE ORDER
// router.post("/add", async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     await order.save();
//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ GET USER ORDERS
// router.get("/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId }).sort({
//       createdAt: -1,
//     });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;

import express from "express";
import Order from "../model/orderModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/add", protect, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      userId: req.user._id, // ensure real user ID from token
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", protect, async (req, res) => {
  try {
   
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

