import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Checkout() {
  const { cart, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const saved = sessionStorage.getItem("buyNowItem");
  const buyNowItem = saved ? JSON.parse(saved) : null;

  const locationItems = location.state?.buyNowItem
    ? [location.state.buyNowItem]
    : location.state?.cart;

  if (!locationItems || locationItems.length === 0) {
    return (
      <div className="pt-28 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No item found for checkout
        </h2>
        <a href="/" className="text-blue-600 underline mt-4 inline-block">
          Go Back
        </a>
      </div>
    );
  }

  const items = buyNowItem ? [buyNowItem] : cart;

  const mrp = locationItems.reduce(
    (sum, it) => sum + it.product.price * it.quantity,
    0
  );

  const discount = Math.round(mrp * 0.15);
  const saveMore = 500;
  const protectFee = 79;
  const gst = Math.round(mrp * 0.18);
  const shipping = mrp > 500 ? 0 : 40;

  const total = mrp - discount - saveMore + protectFee + gst + shipping;
  const totalSavings = discount + saveMore;

  // FORM
  const [form, setForm] = useState({
    firstName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // PAYMENT
  const [paymentMode, setPaymentMode] = useState("COD");
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");

  const placeOrder = async () => {
    if (
      !form.firstName.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.phone.trim() ||
      !form.email.trim()
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (!user) return navigate("/login");

    // ✅ Payment validation
    if (paymentMode === "UPI" && !upiId.trim()) {
      toast.warning("Please enter valid UPI ID");
      return;
    }

    if (paymentMode === "BANK" && !bank.trim()) {
      toast.warning("Please select your bank");
      return;
    }

    const orderPayload = {
      userId: user._id,
      email: user.email,
      items: locationItems.map((it) => ({
        productId: it.product._id,
        name: it.product.name,
        price: it.product.price,
        quantity: it.quantity,
        image: it.product.image,
      })),
      totalAmount: total,
      status: "Placed",
      billingDetails: form,
      paymentMethod: paymentMode,
      upiId: paymentMode === "UPI" ? upiId : null,
      bankName: paymentMode === "BANK" ? bank : null,
    };

    try {
      const res = await fetch("http://localhost:3000/orders/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const savedOrder = await res.json();

      toast.success("Order placed successfully ✅");

      navigate("/order-success", {
        state: { items: locationItems, orderId: savedOrder._id },
      });
    } catch (err) {
      console.log(err);
      toast.error("Order failed");
    }
  };

  return (
    <div className="pt-24 px-10 pb-20 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* LEFT */}
      <div className="md:col-span-2">
        <h2 className="text-3xl font-bold mb-6">Billing Details</h2>

        <div className="space-y-4">
          <input name="firstName" placeholder="First Name*" className="border w-full p-2 rounded" onChange={handleChange} />
          <input name="company" placeholder="Company Name" className="border w-full p-2 rounded" onChange={handleChange} />
          <input name="address" placeholder="Street Address*" className="border w-full p-2 rounded" onChange={handleChange} />
          <input name="apartment" placeholder="Apartment / Floor (Optional)" className="border w-full p-2 rounded" onChange={handleChange} />
          <input name="city" placeholder="Town / City*" className="border w-full p-2 rounded" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number*" className="border w-full p-2 rounded" onChange={handleChange} />
          <input name="email" placeholder="Email Address*" className="border w-full p-2 rounded" onChange={handleChange} />

          <label className="flex items-center gap-2 mt-3">
            <input type="checkbox" />
            Save this information for faster checkout
          </label>
        </div>
      </div>

      {/* RIGHT Summary */}
      <div className="border rounded-md p-6 shadow-sm h-fit">
        <h2 className="text-xl font-semibold mb-4">Price Details</h2>

        <div className="flex justify-between mb-2 text-gray-700">
          <span>Price ({locationItems.length} items)</span>
          <span>₹{mrp}</span>
        </div>

        <div className="flex justify-between mb-2 text-gray-700">
          <span>Discount</span>
          <span className="text-green-600">-₹{discount}</span>
        </div>

        <div className="flex justify-between mb-2 text-gray-700">
          <span>Buy More & Save More</span>
          <span className="text-green-600">-₹{saveMore}</span>
        </div>

        <div className="flex justify-between mb-2 text-gray-700">
          <span>Protect Fee</span>
          <span>₹{protectFee}</span>
        </div>

        <div className="flex justify-between mb-2 text-gray-700">
          <span>GST (18%)</span>
          <span>₹{gst}</span>
        </div>

        <div className="flex justify-between mb-2 text-gray-700">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-bold text-lg mb-3">
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>

        <p className="text-green-600 text-sm">
          You will save ₹{totalSavings} on this order
        </p>

        {/* PAYMENT METHOD */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Payment Method</h3>

          <div className="space-y-3 text-gray-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" value="COD" checked={paymentMode === "COD"} onChange={(e) => setPaymentMode(e.target.value)} />
              Cash on Delivery (Recommended ✅)
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" value="UPI" checked={paymentMode === "UPI"} onChange={(e) => setPaymentMode(e.target.value)} />
              UPI Payment (Google Pay / PhonePe / Paytm)
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" value="BANK" checked={paymentMode === "BANK"} onChange={(e) => setPaymentMode(e.target.value)} />
              Net Banking
            </label>
          </div>
        </div>

        {paymentMode === "UPI" && (
          <input
            type="text"
            placeholder="Enter UPI ID (ex : name@bank)"
            className="border w-full p-2 rounded mt-3"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        )}

        {paymentMode === "BANK" && (
          <select
            className="border w-full p-2 rounded mt-3"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          >
            <option value="">Select Your Bank</option>
            <option>SBI</option>
            <option>HDFC</option>
            <option>ICICI</option>
            <option>Axis</option>
            <option>Kotak</option>
          </select>
        )}

        <button
          onClick={placeOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md mt-4"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
