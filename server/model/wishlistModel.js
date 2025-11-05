import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
    }
  ]
});

export default mongoose.model("Wishlist", wishlistSchema);
