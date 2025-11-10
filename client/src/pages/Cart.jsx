import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS

const Cart = () => {
  const navigate = useNavigate(); // ✅ ADD THIS
  const { cart, increaseQty, decreaseQty, removeFromCart } = useAuth();

  const validCart = cart.filter((item) => item.product);

  const total = validCart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="pt-28 px-6 md:px-16 pb-20">
      <h1 className="text-3xl font-bold mb-6">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT CART LIST */}
          <div className="md:col-span-2 space-y-4">
            {/* Header */}
            {/* HEADER */}
            <div className="grid grid-cols-5 font-semibold text-gray-600 mb-3 px-4">
              <p className="text-left">Product</p>
              <p className="text-center">Price</p>
              <p className="text-center">Quantity</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {/* ROWS */}
            {validCart.map((item) => (
              <div
                key={item.product._id}
                className="grid grid-cols-5 items-center gap-4 border rounded-lg p-4 mb-3 shadow-sm hover:bg-green-50 transition"
              >
                {/* PRODUCT */}
                <div className="flex items-center gap-4 text-left">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 object-cover rounded"
                  />

                  <div>
                    <p className="font-semibold text-lg">{item.product.name}</p>
                  </div>
                </div>

                {/* PRICE */}
                <p className="text-center font-semibold text-gray-700">
                  ₹{item.product.price}
                </p>

                {/* QUANTITY */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.product._id)}
                    className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-200"
                  >
                    -
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.product._id)}
                    className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                {/* SUBTOTAL */}
                <p className="text-center font-semibold text-gray-800">
                  ₹{item.product.price * item.quantity}
                </p>

                {/* ACTION */}
                <div className="text-center">
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SUMMARY */}
          <div className="border border-green-300 bg-white rounded-xl p-6 shadow-md h-fit">
            {/* Title */}
            <h2 className="text-2xl font-bold mb-5 text-green-700 flex items-center gap-2">
              Order Summary
            </h2>

            {/* Breakdown */}
            <div className="space-y-3 text-gray-700 text-base">
              <div className="flex justify-between">
                <span>Items:</span>
                <span className="font-semibold">{validCart.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Quantity:</span>
                <span className="font-semibold">
                  {validCart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              {/* NEW — Delivery Fee */}
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>

              {/* NEW — Savings */}
              <div className="flex justify-between">
                <span>Extra Savings:</span>
                <span className="font-semibold text-green-600">-₹50</span>
              </div>

              {/* Total */}
              <div className="flex justify-between border-t pt-4 mt-4">
                <span className="font-bold text-lg text-green-800">
                  Total Amount:
                </span>
                <span className="font-bold text-2xl text-green-700">
                  ₹{total - 50}
                </span>
              </div>
            </div>

            {/* Offer Section */}
            <div className="mt-5 p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-800 font-medium">
                🎉 APPLY COUPONS AVAILABLE
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Save more using applicable offers at checkout
              </p>
            </div>

            {/* Checkout Btn */}
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: { cart },
                })
              }
              className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 mt-6 rounded-lg text-lg font-semibold shadow"
            >
              Proceed to Checkout
            </button>

            {/* Security Text */}
            <p className="text-xs text-gray-500 text-center mt-3">
              🔐 Safe & Secure Payments
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
