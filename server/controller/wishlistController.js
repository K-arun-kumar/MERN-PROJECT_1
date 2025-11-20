

// import Wishlist from "../model/wishlistModel.js";

// export const addToWishlist = async (req, res) => {
//   try {
//     const { userEmail, productId } = req.body;

//     const exists = await Wishlist.findOne({ userEmail, product: productId });

//     if (exists) {
//       return res.status(200).json({ message: "Already in wishlist" });
//     }

//     await Wishlist.create({ userEmail, product: productId });

//     res.status(201).json({ message: "Added to wishlist" });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// export const getWishlist = async (req, res) => {
//   try {
//     const { userEmail } = req.params;

//     const items = await Wishlist.find({ userEmail }).populate("product");

//     res.json({ items });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// export const removeFromWishlist = async (req, res) => {
//   try {
//     const { userEmail, productId } = req.params;

//     await Wishlist.findOneAndDelete({ userEmail, product: productId });

//     res.json({ message: "Removed from wishlist" });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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

// GET USER WISHLIST
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await Wishlist.find({ user: userId }).populate("product");

    res.json({ items });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    await Wishlist.findOneAndDelete({ user: userId, product: productId });

    res.json({ message: "Removed from wishlist" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
