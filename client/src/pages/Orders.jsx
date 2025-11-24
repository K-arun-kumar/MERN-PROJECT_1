import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

 useEffect(() => {
  if (!user) return;

  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:3000/orders/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // FIXED: extract array from res.data.orders
      setOrders(res.data.orders || []);
    } catch (error) {
      console.log("Orders fetch error", error);
    }
  };

  fetchOrders();
}, [user]);

  if (!user) return <p>Please login</p>;

  return (
    <div className="pt-24 px-6 md:px-16 pb-16">
      <h2 className="text-3xl font-bold mb-6">Order History</h2>

      {(orders || []).length === 0 ? (
        <p>No orders found.</p>
      ) : (
        (orders || []).map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded-lg shadow-sm">
            <p className="font-semibold">
              Order ID: <span className="text-green-600">{order._id}</span>
            </p>
            <p className="text-sm text-gray-600">
              Placed At: {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mt-3">
              {order.items.map((item, i) => (
                <div
                  key={item.productId || i}
                  className="flex gap-4 border p-3 rounded-md mb-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded object-cover"
                  />

                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">₹{item.price}</p>
                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-bold mt-2">Total: ₹{order.totalAmount}</p>
          </div>
        ))
      )}
    </div>
  );
}
