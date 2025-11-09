
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ✅ must be ObjectId
    ref: "Register",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5, // ✅ rating cannot exceed 5
    required: true,
  },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: String, required: true },

  // ✅ replace review:String with reviews:Array
  reviews: [reviewSchema],
});

export default mongoose.model("Product", productSchema);
