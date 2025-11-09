import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProcessingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addOrder } = useAuth();
  const payload = location.state;

  useEffect(() => {
    if (!payload) return;

    const place = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const saved = await res.json();

        // optional: keep in FE context list
        if (addOrder);

        // fake processing delay
        setTimeout(() => {
          navigate("/order-success", {
            state: { orderId: saved._id, items: saved.items },
          });
        }, 1800);
      } catch (e) {
        console.log(e);
        navigate("/checkout");
      }
    };

    place();
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 text-center">
      <div className="mx-auto w-16 h-16 border-4 border-[#4CAF50] border-t-transparent rounded-full animate-spin" />
      <h2 className="text-2xl font-semibold mt-6 text-[#1E3932]">Processing payment…</h2>
      <p className="text-gray-600 mt-1">Please don’t refresh or go back.</p>
    </div>
  );
}
