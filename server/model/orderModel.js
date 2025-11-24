import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Register",
      required: true,
    },

    email: { type: String, required: true },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Placed" },

    paymentMethod: { type: String, default: "COD" },
    upiId: { type: String, default: null },
    bankName: { type: String, default: null },

    billingDetails: {
      firstName: String,
      company: String,
      address: String,
      apartment: String,
      city: String,
      phone: String,
      email: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
