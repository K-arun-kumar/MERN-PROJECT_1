import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";
import { FaUniversity, FaRegCreditCard, FaMoneyBillAlt } from "react-icons/fa";

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // orderPayload comes from Checkout -> navigate("/payment", { state: orderPayload })
  const incoming = location.state;
  if (!incoming) {
    return (
      <div className="pt-28 text-center">
        <p className="text-gray-600">No order data. Go back to checkout.</p>
        <a href="/checkout" className="text-green-600 underline">Back</a>
      </div>
    );
  }

  const [method, setMethod] = useState("upi");   // upi | card | netbanking | cod
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");

  const handlePay = () => {
    // (optional) light client validation
    if (method === "upi" && !upiId.trim()) return alert("Enter a UPI ID");
    if (method === "netbanking" && !bank) return alert("Select a bank");

    // forward to processing with merged payload
    navigate("/processing", {
      state: {
        ...incoming,
        paymentMethod: method,
        upiId: upiId.trim(),
        bank,
      },
    });
  };

  return (
    <div className="pt-24 px-6 md:px-16 pb-16 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#1E3932]">Payment Options</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Payment options */}
        <div className="lg:col-span-2 space-y-4">

          {/* UPI */}
          <div className="border border-green-200 bg-white rounded-xl p-5 shadow-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="pmode"
                checked={method === "upi"}
                onChange={() => setMethod("upi")}
              />
              <span className="text-lg font-semibold">UPI</span>
            </label>

            {method === "upi" && (
              <div className="mt-4 ml-6">
                <div className="flex flex-wrap gap-3 mb-3">
                  <span className="inline-flex items-center gap-2 border rounded-md px-3 py-2">
                    <SiGooglepay className="text-2xl"/> Google Pay
                  </span>
                  <span className="inline-flex items-center gap-2 border rounded-md px-3 py-2">
                    <SiPhonepe className="text-2xl"/> PhonePe
                  </span>
                  <span className="inline-flex items-center gap-2 border rounded-md px-3 py-2">
                    <SiPaytm className="text-2xl"/> Paytm
                  </span>
                </div>

                <input
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID (e.g., yourname@oksbi)"
                  className="border w-full p-3 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We’ll request payment on your UPI app.
                </p>
              </div>
            )}
          </div>

          {/* Card */}
          <div className="border border-green-200 bg-white rounded-xl p-5 shadow-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="pmode"
                checked={method === "card"}
                onChange={() => setMethod("card")}
              />
              <span className="text-lg font-semibold flex items-center gap-2">
                <FaRegCreditCard/> Credit / Debit Card
              </span>
            </label>

            {method === "card" && (
              <div className="mt-4 ml-6 space-y-3">
                <input className="border w-full p-3 rounded-md" placeholder="Card Number" />
                <div className="flex gap-3">
                  <input className="border w-full p-3 rounded-md" placeholder="MM/YY" />
                  <input className="border w-full p-3 rounded-md" placeholder="CVV" />
                </div>
                <input className="border w-full p-3 rounded-md" placeholder="Name on Card" />
              </div>
            )}
          </div>

          {/* Netbanking */}
          <div className="border border-green-200 bg-white rounded-xl p-5 shadow-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="pmode"
                checked={method === "netbanking"}
                onChange={() => setMethod("netbanking")}
              />
              <span className="text-lg font-semibold flex items-center gap-2">
                <FaUniversity/> Net Banking
              </span>
            </label>

            {method === "netbanking" && (
              <div className="mt-4 ml-6">
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="border w-full p-3 rounded-md"
                >
                  <option value="">Select your bank</option>
                  <option value="SBI">State Bank of India</option>
                  <option value="HDFC">HDFC Bank</option>
                  <option value="ICICI">ICICI Bank</option>
                  <option value="AXIS">Axis Bank</option>
                  <option value="Kotak">Kotak Mahindra</option>
                </select>
              </div>
            )}
          </div>

          {/* COD */}
          <div className="border border-green-200 bg-white rounded-xl p-5 shadow-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="pmode"
                checked={method === "cod"}
                onChange={() => setMethod("cod")}
              />
              <span className="text-lg font-semibold flex items-center gap-2">
                <FaMoneyBillAlt/> Cash on Delivery
              </span>
            </label>
          </div>
        </div>

        {/* RIGHT: summary + pay button */}
        <div className="h-fit border border-green-200 bg-[#F5FFF4] rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Total Payable</h3>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Items</span>
            <span>{incoming.items?.length || incoming.locationItems?.length || "-"}</span>
          </div>
          <div className="flex justify-between border-t pt-3 mt-3">
            <span className="font-semibold text-lg text-green-800">Amount</span>
            <span className="font-bold text-2xl text-green-700">₹{incoming.totalAmount || incoming.total}</span>
          </div>

          <button
            onClick={handlePay}
            className="w-full mt-6 bg-[#4CAF50] hover:bg-[#2A9D8F] text-white py-3 rounded-lg shadow-sm"
          >
            Pay Securely
          </button>
        </div>
      </div>
    </div>
  );
}
