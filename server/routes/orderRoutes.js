import express from "express";
import Order from "../model/orderModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE ORDER
router.post("/add", protect, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      userId: req.user._id,  // ALWAYS the logged in user
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER ORDERS
router.get("/:userId", protect, async (req, res) => {
  try {
    const { userId } = req.params;

  

    // USER MUST MATCH OR ADMIN
    if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    // FETCH ORDERS
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    

    res.json({orders});   // ALWAYS RETURN ARRAY

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
