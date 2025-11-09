// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FaBox, FaHeart, FaShoppingCart, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

// export default function MyAccount() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   if (!user) {
//     return (
//       <div className="pt-32 text-center text-xl">
//         Please login to view account.
//       </div>
//     );
//   }

//   return (
//     <div className="pt-28 pb-16 flex justify-center bg-green-50 min-h-screen">
//       <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 border border-green-200">
        
//         {/* Header */}
//         <div className="flex items-center gap-4 border-b pb-4">
//           <FaUserCircle className="text-green-600 text-6xl" />
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Hello, {user.name}
//             </h2>
//             <p className="text-gray-600">{user.email}</p>
//           </div>
//         </div>

//         {/* Options */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* Orders */}
//           <div
//             onClick={() => navigate("/orders")}
//             className="flex items-center gap-4 p-4 rounded-lg border hover:bg-green-100 cursor-pointer transition"
//           >
//             <FaBox className="text-green-700 text-3xl" />
//             <div>
//               <h3 className="font-semibold text-gray-800 text-lg">My Orders</h3>
//               <p className="text-gray-600 text-sm">
//                 Track, return, or reorder products
//               </p>
//             </div>
//           </div>

//           {/* Wishlist */}
//           <div
//             onClick={() => navigate("/wishlist")}
//             className="flex items-center gap-4 p-4 rounded-lg border hover:bg-green-100 cursor-pointer transition"
//           >
//             <FaHeart className="text-green-700 text-3xl" />
//             <div>
//               <h3 className="font-semibold text-gray-800 text-lg">Wishlist</h3>
//               <p className="text-gray-600 text-sm">
//                 Your saved items
//               </p>
//             </div>
//           </div>

//           {/* Cart */}
//           <div
//             onClick={() => navigate("/cart")}
//             className="flex items-center gap-4 p-4 rounded-lg border hover:bg-green-100 cursor-pointer transition"
//           >
//             <FaShoppingCart className="text-green-700 text-3xl" />
//             <div>
//               <h3 className="font-semibold text-gray-800 text-lg">My Cart</h3>
//               <p className="text-gray-600 text-sm">
//                 View and manage cart items
//               </p>
//             </div>
//           </div>

//           {/* Logout */}
//           <div
//             onClick={() => {
//               logout();
//               navigate("/login");
//             }}
//             className="flex items-center gap-4 p-4 rounded-lg border hover:bg-red-100 cursor-pointer transition"
//           >
//             <FaSignOutAlt className="text-red-600 text-3xl" />
//             <div>
//               <h3 className="font-semibold text-gray-800 text-lg">Logout</h3>
//               <p className="text-gray-600 text-sm">
//                 Logout from your account
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaCreditCard,
  FaHistory,
} from "react-icons/fa";

export default function MyAccount() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="pt-32 text-center text-xl">
        Please login to view your account.
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 flex justify-center bg-green-50 min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 border border-green-200">
        
        {/* ✅ Header */}
        <div className="flex items-center gap-4 border-b pb-4">
          <FaUserCircle className="text-green-600 text-6xl" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome, {user.name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* ✅ Account Sections */}
        <div className="mt-8 grid grid-cols-1 gap-6">

          {/* Manage Profile */}
          <SectionCard
            icon={<FaUserCircle className="text-green-700 text-3xl" />}
            title="Profile Details"
            desc="View or update your personal details"
            onClick={() => navigate("/profile")}
          />

        

          {/* Payment Methods */}
          

          {/* Orders */}
          <SectionCard
            icon={<FaBox className="text-green-700 text-3xl" />}
            title="My Orders"
            desc="Track, cancel or return orders"
            onClick={() => navigate("/orders")}
          />

          {/* Wishlist */}
          <SectionCard
            icon={<FaHeart className="text-green-700 text-3xl" />}
            title="Wishlist"
            desc="View saved products"
            onClick={() => navigate("/wishlist")}
          />

          {/* Cart */}
          <SectionCard
            icon={<FaShoppingCart className="text-green-700 text-3xl" />}
            title="My Cart"
            desc="View and manage cart items"
            onClick={() => navigate("/cart")}
          />

          {/* Recently Viewed */}
        

          {/* Logout */}
          <SectionCard
            danger
            icon={<FaSignOutAlt className="text-red-600 text-3xl" />}
            title="Logout"
            desc="Sign out from your account"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** ✅ Reusable Card */
function SectionCard({ icon, title, desc, onClick, danger }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition 
      ${danger ? "hover:bg-red-100" : "hover:bg-green-100"}`}
    >
      {icon}
      <div>
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}
