import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderItems = location.state?.items || [];
  const orderId = location.state?.orderId || "N/A";
  const totalAmount = location.state?.totalAmount || null;
  const paymentMethod = location.state?.paymentMethod || "COD";

 useEffect(() => {
  if (!orderId) {
    navigate("/orders");
  }
}, []);


  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);

  return (
    <div className="pt-28 px-6 pb-16 flex justify-center bg-green-50 min-h-screen">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 text-center border border-green-200">
        <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-4" />

        <h2 className="text-3xl font-bold text-gray-800">
          Order Placed Successfully!
        </h2>

        <p className="text-gray-500 mt-2">Thank you for shopping with us 😊</p>

        {/* ✅ Order details */}
        <div className="text-sm mt-4 space-y-1">
          <p>
            <span className="font-semibold">Order ID:</span>{" "}
            <span className="text-green-700">{orderId}</span>
          </p>

          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            <span className="text-green-700">{paymentMethod}</span>
          </p>

          {totalAmount && (
            <p>
              <span className="font-semibold">Total:</span>{" "}
              <span className="text-green-700">₹{totalAmount}</span>
            </p>
          )}
        </div>

        {/* ✅ Order Summary */}
        <div className="mt-6 border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-left">
            Order Summary
          </h3>

          <div className="space-y-3">
            {orderItems.map((item, index) => (
              <div
                key={item.productId || index}
                className="flex gap-4 p-3 border rounded bg-white shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />

                <div className="text-left">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-700">₹{item.price}</p>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-semibold text-gray-700 mt-4">
            Estimated Delivery:{" "}
            <span className="text-green-600">
              {estimatedDate.toDateString()}
            </span>
          </p>
        </div>

        <div className="flex gap-4 mt-8 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="border border-green-600 text-green-600 px-6 py-2 rounded-md hover:bg-green-50"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}
