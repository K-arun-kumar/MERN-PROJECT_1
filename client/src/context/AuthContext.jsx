import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // ✅ Make sure this is here

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => sessionStorage.getItem("token"));
  const [wishlist, setWishlist] = useState([]);

  // ✅ Cart State Load from session
  const [cart, setCart] = useState(() => {
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);

    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", userToken);

    // ✅ Load Cart from backend when login
    getCart(userData._id);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]); // ✅ Clear cart
    sessionStorage.clear();
  };

  // ✅ Sync cart to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Fetch Cart from backend
  const getCart = async (uid = null) => {
    const userId = uid || (user && user._id);
    if (!userId) return;

    try {
      const res = await axios.get(`http://localhost:3000/cart/get/${userId}`);
      console.log("Cart Data:", res.data);
      console.log("RAW CART FROM CONTEXT:", cart);

      setCart(
        res.data.map((item) => ({
          product: item.product, // ✅ product object
          quantity: item.quantity,
        }))
      );
    } catch (err) {
      console.log("Cart Fetch Error:", err.response?.data || err.message);
    }
  };

  // ✅ Sync cart when user state changes
  useEffect(() => {
    if (user) getCart();
  }, [user]);

  // ✅ Add to Cart Backend
  const addToCart = async (product) => {
    try {
      await axios.post("http://localhost:3000/cart/add", {
        userId: user._id,
        productId: product._id,
      });

      getCart(); // ✅ Refresh after update
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Remove From Cart Backend
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cart/remove/${user._id}/${id}`);
      getCart(); // ✅ Refresh after removal
    } catch (err) {
      console.log(err);
    }
  };
  const increaseQty = async (productId) => {
    await axios.post("http://localhost:3000/cart/update-qty", {
      userId: user._id,
      productId,
      action: "increase",
    });
    getCart();
  };

  const decreaseQty = async (productId) => {
    await axios.post("http://localhost:3000/cart/update-qty", {
      userId: user._id,
      productId,
      action: "decrease",
    });
    getCart();
  };
  const getWishlist = async () => {
    if (!user) return;
    try {
      const res = await axios.get(
        `http://localhost:3000/wishlist/get/${user.email}`
      );
      const serverData = res.data;
      const normalized =
        serverData?.items?.map((it) => ({
          product: it.product,
        })) || [];
      setWishlist(normalized);
    } catch (err) {
      console.log("Wishlist Fetch Error:", err);
    }
  };

  const addToWishlist = async (product) => {
    try {
      await axios.post("http://localhost:3000/wishlist/add", {
        userEmail: user.email,
        productId: product._id,
      });
      await getWishlist();
    } catch (err) {
      console.log("Add Wishlist Error:", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3000/wishlist/remove/${user.email}/${productId}`
      );
      await getWishlist();
    } catch (err) {
      console.log("Remove Wishlist Error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoggedIn: !!user,
        cart,
        setCart, // ✅ Needed for + / - qty buttons
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        cartCount: cart.reduce((total, item) => total + item.quantity, 0),
        wishlist,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
