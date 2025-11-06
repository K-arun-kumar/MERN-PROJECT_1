import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cart } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If BuyNow product comes via state
  const buyNowItem = location.state?.buyNowItem || null;

  // If BuyNow → only that item else cart items
  const items = buyNowItem ? [buyNowItem] : cart;

  const subtotal = items.reduce(
    (sum, it) => sum + it.product.price * it.quantity,
    0
  );

  const shipping = subtotal > 0 ? "Free" : "0";
  const total = subtotal;

  const [form, setForm] = useState({
    firstName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    alert("Order Placed ✅");
    navigate("/");
  };

  return (
    <div className="pt-24 px-10 pb-20 grid grid-cols-1 md:grid-cols-3 gap-10">
      
      {/* Left Section */}
      <div className="md:col-span-2">
        <h2 className="text-3xl font-bold mb-6">Billing Details</h2>

        <div className="space-y-4">
          <input
            name="firstName"
            placeholder="First Name*"
            className="border w-full p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="company"
            placeholder="Company Name"
            className="border w-full p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Street Address*"
            className="border w-full p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="apartment"
            placeholder="Apartment, floor (Optional)"
            className="border w-full p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="Town/City*"
            className="border w-full p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number*"
            className="border w-full p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email Address*"
            className="border w-full p-2 rounded"
            onChange={handleChange}
          />

          <label className="flex items-center gap-2 mt-3">
            <input type="checkbox" />
            Save this information for faster checkout
          </label>
        </div>
      </div>

      {/* Right Section */}
      <div className="border rounded-md p-6 shadow-sm h-fit">
  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

  <div className="flex items-center gap-4">
    <img
      src={location.state.buyNowItem.product.image}
      alt={location.state.buyNowItem.product.name}
      className="h-16 w-16 object-cover rounded"
    />

    <div className="flex-1">
      <h3 className="font-semibold">
        {location.state.buyNowItem.product.name}
      </h3>

      <p className="text-purple-700 font-bold">
        ₹{location.state.buyNowItem.product.price}
      </p>

      <p className="text-sm text-gray-500">
        Qty: {location.state.buyNowItem.quantity}
      </p>
    </div>

    <span className="font-semibold">
      ₹{location.state.buyNowItem.product.price *
        location.state.buyNowItem.quantity}
    </span>
  </div>

  <hr className="my-4" />

  {/* Subtotal */}
  <div className="flex justify-between text-gray-700 mb-2">
    <span>Subtotal</span>
    <span>
      ₹{location.state.buyNowItem.product.price *
        location.state.buyNowItem.quantity}
    </span>
  </div>

  {/* Shipping */}
  <div className="flex justify-between text-gray-700 mb-2">
    <span>Shipping</span>
    <span>Free</span>
  </div>

  {/* Total */}
  <div className="flex justify-between font-bold text-lg mb-3">
    <span>Total</span>
    <span>
      ₹{location.state.buyNowItem.product.price *
        location.state.buyNowItem.quantity}
    </span>
  </div>

  {/* Payment */}
  <div className="mb-4">
    <label className="flex items-center gap-2">
      <input type="radio" name="pay" />
      Bank
    </label>

    <label className="flex items-center gap-2">
      <input type="radio" name="pay" defaultChecked />
      Cash on Delivery
    </label>
  </div>

  <div className="flex gap-2 mb-4">
    <input
      type="text"
      placeholder="Coupon Code"
      className="flex-1 border rounded px-3 py-2"
    />
    <button className="bg-red-600 text-white px-4 py-2 rounded">
      Apply
    </button>
  </div>

  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md">
    Place Order
  </button>
</div>

    </div>
  );
}
