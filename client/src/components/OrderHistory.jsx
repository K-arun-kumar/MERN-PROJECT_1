import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function OrderHistory() {
  const { user, orders, getOrders } = useAuth();

  useEffect(() => {
    if (user) getOrders();
  }, [user]);

  return (
    <div className="pt-24 px-10">
      <h2 className="text-3xl font-bold mb-6">Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="border rounded p-4 shadow">
              <p className="font-semibold">Order ID: {o._id}</p>
              <p>Total: ₹{o.totalAmount}</p>
              <p>Status: {o.status}</p>
              <p>Date: {new Date(o.createdAt).toLocaleString()}</p>

              <div className="mt-2 text-sm">
                {o.items.map((i, idx) => (
                  <p key={idx}>• {i.name} × {i.quantity}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
