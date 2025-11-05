import Wishlist from "../model/wishlistModel.js";
import User from "../model/registerModel.js";

// Add item to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userEmail, productId } = req.body;
    if (!userEmail || !productId) return res.status(400).json({ message: "userEmail and productId required" });

    let wishlist = await Wishlist.findOne({ userEmail });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userEmail, items: [{ product: productId }] });
    } else {
      const exists = wishlist.items.some(item => item.product.toString() === productId.toString());
      if (!exists) wishlist.items.push({ product: productId });
    }

    await wishlist.save();
    await wishlist.populate("items.product", "name price image");

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get wishlist by user email
export const getWishlist = async (req, res) => {
  try {
    const { email } = req.params;
    const wishlist = await Wishlist.findOne({ userEmail: email }).populate("items.product", "name price image");
    if (!wishlist) return res.json({ userEmail: email, items: [] });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { email, productId } = req.params;
    const wishlist = await Wishlist.findOne({ userEmail: email });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(it => it.product.toString() !== productId.toString());
    await wishlist.save();
    await wishlist.populate("items.product", "name price image");

    res.json({ message: "Removed", wishlist });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
