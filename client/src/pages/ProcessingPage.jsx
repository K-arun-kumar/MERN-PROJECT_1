import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

  export default function ProcessingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
      orderPayload,
    } = location.state || {};

    useEffect(() => {
      if (!orderPayload) {
        console.warn("⚠ No order data found → redirecting...");
        return navigate("/checkout");
      }

      const saveOrder = async () => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch("http://localhost:3000/orders/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const savedOrder = await res.json();

    if (!res.ok) {
      console.log("❌ Server Error:", savedOrder);
      return navigate("/checkout");
    }

    // ⭐⭐⭐ PASTE HERE — SAVE ORDER HISTORY ⭐⭐⭐
    let existingOrders = JSON.parse(sessionStorage.getItem("orders")) || [];
    existingOrders.push(savedOrder);
    sessionStorage.setItem("orders", JSON.stringify(existingOrders));
    // ⭐⭐⭐ END — SAVE ORDER HISTORY ⭐⭐⭐

    navigate("/order-success", {
      state: {
        items: orderPayload.items,
        orderId: savedOrder._id,
        totalAmount: orderPayload.totalAmount,
        paymentMethod: orderPayload.paymentMethod,
      },
    });

  } catch (error) {
    console.log("❌ Order fail:", error);
    navigate("/checkout");
  }
};

      // simulate processing
      setTimeout(saveOrder, 1500);
    }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Processing Payment...
      </h2>

      <p className="text-gray-500">Please wait a moment</p>

      <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mt-6"></div>
    </div>
  );
}
