// import React from "react";
// import { useAuth } from "../context/AuthContext";

// const Cart = () => {
 
//   const { cart, increaseQty, decreaseQty, removeFromCart } = useAuth();


 
//   const validCart = cart.filter((item) => item.product);

//   const total = validCart.reduce(
//     (sum, item) => sum + Number(item.product.price) * item.quantity,
//     0
//   );

//   return (
//     <div className="pt-28 px-10 pb-20">
//       <h1 className="text-3xl font-bold mb-6">Your Cart 🛒</h1>

//       {cart.length === 0 ? (
//         <p className="text-gray-500 text-lg">Your cart is empty.</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="md:col-span-2 space-y-4">
//             {cart && cart.length > 0 ? (
//               validCart.map((item) => (
//                 <div
//                   key={item.product._id}
//                   className="flex items-center gap-6 border rounded-md p-4 shadow-sm hover:shadow transition"
//                 >
//                   <img
//                     src={item.product.image}
//                     alt={item.product.name}
//                     className="h-24 w-24 object-cover rounded"
//                   />

//                   <div className="flex-1">
//                     <h2 className="font-semibold text-lg">
//                       {item.product.name}
//                     </h2>
//                     <p className="text-purple-700 font-bold">
//                       ₹{item.product.price}
//                     </p>

//                     <div className="flex items-center gap-3 mt-2">
//                       <p className="text-sm text-gray-600">
//                         Quantity:{" "}
//                         <span className="font-semibold">{item.quantity}</span>
//                       </p>

//                       <button
//                         onClick={() => decreaseQty(item.product._id)}
//                         className="px-3 py-1 border rounded hover:bg-gray-200"
//                       >
//                         -
//                       </button>

//                       <span className="font-semibold">{item.quantity}</span>

//                       <button
//                         onClick={() => increaseQty(item.product._id)}
//                         className="px-3 py-1 border rounded hover:bg-gray-200"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => removeFromCart(item.product._id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-6 text-lg">
//                 Your cart is empty 🛒
//               </p>
//             )}
//           </div>

//           <div className="border rounded-md p-6 shadow-sm h-fit">
//   <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//   {/* Unique items count */}
//   <p className="text-gray-700 mb-2">
//     Total Items: {validCart.length}
//   </p>

//   {/* Sum of quantities */}
//   <p className="text-gray-700 mb-2">
//     Total Quantity: {validCart.reduce((sum, item) => sum + item.quantity, 0)}
//   </p>

//   {/* Total price */}
//   <p className="text-gray-700 mb-2">
//     Total Amount: ₹{total}
//   </p>

//   <hr className="my-4" />
// <button
//   onClick={() => navigate("/checkout")}
//   className="w-full bg-green-600 text-white py-2 rounded"
// >
//   Checkout
// </button>

// </div>

//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
// //  className="px-3 py-1 border rounded hover:bg-gray-200"
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";   // ✅ ADD THIS

const Cart = () => {

  const navigate = useNavigate();                 // ✅ ADD THIS
  const { cart, increaseQty, decreaseQty, removeFromCart } = useAuth();

  const validCart = cart.filter((item) => item.product);

  const total = validCart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="pt-28 px-10 pb-20">
      <h1 className="text-3xl font-bold mb-6">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart && cart.length > 0 ? (
              validCart.map((item) => (
                <div key={item.product._id} className="flex items-center gap-6 border rounded-md p-4 shadow-sm hover:shadow transition">
                  
                  <img src={item.product.image} alt={item.product.name} className="h-24 w-24 object-cover rounded" />

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{item.product.name}</h2>
                    <p className="text-purple-700 font-bold">₹{item.product.price}</p>

                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-sm text-gray-600">
                        Quantity: <span className="font-semibold">{item.quantity}</span>
                      </p>

                      <button onClick={() => decreaseQty(item.product._id)} className="px-3 py-1 border rounded hover:bg-gray-200">-</button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button onClick={() => increaseQty(item.product._id)} className="px-3 py-1 border rounded hover:bg-gray-200">+</button>
                    </div>
                  </div>

                  <button onClick={() => removeFromCart(item.product._id)} className="text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6 text-lg">Your cart is empty 🛒</p>
            )}
          </div>

          <div className="border rounded-md p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <p className="text-gray-700 mb-2">Total Items: {validCart.length}</p>
            <p className="text-gray-700 mb-2">
              Total Quantity: {validCart.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
            <p className="text-gray-700 mb-2">Total Amount: ₹{total}</p>

            <hr className="my-4" />

            <button
              onClick={() => navigate("/checkout")}   // ✅ Works now
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
