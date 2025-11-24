import Wishlist from "../model/wishlistModel.js";

// ADD TO WISHLIST
export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const exists = await Wishlist.findOne({ user: userId, product: productId });

    if (exists) {
      return res.status(200).json({ message: "Already in wishlist" });
    }

    await Wishlist.create({ user: userId, product: productId });

    res.status(201).json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const wishlist = await Wishlist.find({ user: userId }).populate("product");

    res.json(wishlist);   // ALWAYS return array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Admin bypass
    if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    // Delete ONLY one item
    await Wishlist.findOneAndDelete({ user: userId, product: productId });

    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
