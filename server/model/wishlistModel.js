// import mongoose from "mongoose";

// const wishlistSchema = new mongoose.Schema({
//   userEmail: { type: String, required: true },
//   items: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
//     }
//   ]
// });

// export default mongoose.model("Wishlist", wishlistSchema);

import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("Wishlist", wishlistSchema);
