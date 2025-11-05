
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ProductDetails from "./pages/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import BuyNow from "./pages/BuyNow";
 import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <>
      <div className="pt-[100px] px-6">
        <Navbar />

        <div className="mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ✅ Only logged-in users can view Products */}
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />

            {/* ✅ Only Admin can view Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/shop" element={<Shop />} />

            <Route path="/cart" element={<Cart />} />
           
          <Route path="/buy/:id" element={<BuyNow />} />
         

<Route path="/wishlist" element={<Wishlist />} />



          </Routes>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
