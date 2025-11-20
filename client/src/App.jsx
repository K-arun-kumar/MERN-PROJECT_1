import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

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
import Beverages from "./shop/Beverages";
import Snacks from "./shop/Snacks";
import Dairy from "./shop/Dairy";
import FruitsVegetables from "./shop/Fruits";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Error from "./Error/Error";
import Joins from "./Apps/Joins";
import ContactUs from "./components/ContactUs";

import PaymentPage from "./pages/PaymentPage";
import ProcessingPage from "./pages/ProcessingPage";
import MyAccount from "./components/MyAccount";

import Profile from "./Edituser/Profile";



function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
   
      <div>
        <div className="">
        
          <Routes>
             
            <Route path="/" element={<Joins />}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/shop" element={<Shop />} />

              <Route path="/cart" element={<Cart />} />

              <Route path="/buy/:id" element={<BuyNow />} />

              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/shop/beverages" element={<Beverages />} />
              <Route path="/shop/snacks" element={<Snacks />} />
              <Route path="/shop/dairy" element={<Dairy />} />
              <Route path="/shop/fruits" element={<FruitsVegetables />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/contactus" element={<ContactUs/>} />

              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
              />
             
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
