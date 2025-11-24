import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  // USER
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => sessionStorage.getItem("token"));

  // CART + WISHLIST
  const [wishlist, setWishlist] = useState(() => {
    const stored = sessionStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const [cart, setCart] = useState(() => {
    const stored = sessionStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // ORDERS
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);

    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", userToken);

    // Load everything for this user
    getCart(userData._id);
    getWishlist(userData._id);
    getOrders(userData._id);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);

    sessionStorage.clear();
  };
  useEffect(() => {
    if (!user) return;

    getCart(user._id);
    getWishlist(user._id);
    getOrders(user._id);
  }, [user]);

  const getCart = async (uid = null) => {
    const userId = uid || user?._id;
    if (!userId) return;

    try {
      const res = await api.get(`/cart/get/${userId}`);

      setCart(
        Array.isArray(res.data)
          ? res.data.map((item) => ({
              product: item.product,
              quantity: item.quantity,
            }))
          : []
      );
    } catch (err) {
      console.log("Cart Fetch Error:", err.response?.data || err.message);
    }
  };

  const addToCart = async (product, qty = 1) => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }

    try {
      // Optimistic UI update
      setCart((prev) => {
        const exists = prev.find((i) => i.product._id === product._id);
        if (exists) {
          return prev.map((i) =>
            i.product._id === product._id
              ? { ...i, quantity: i.quantity + qty }
              : i
          );
        }
        return [...prev, { product, quantity: qty }];
      });

      await api.post("/cart/add", {
        userId: user._id,
        productId: product._id,
        quantity: qty,
      });

      // Sync with server
      getCart();
    } catch (err) {
      console.log("Add Cart Error:", err.response?.data || err.message);
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = async (id) => {
    try {
      await api.delete(`/cart/remove/${user._id}/${id}`);
      getCart();
    } catch (err) {
      console.log("Remove Cart Error:", err.response?.data || err.message);
    }
  };

  const increaseQty = async (productId) => {
    try {
      await api.post("/cart/update-qty", {
        userId: user._id,
        productId,
        action: "increase",
      });
      getCart();
    } catch (err) {
      console.log("Increase Qty Error:", err.response?.data || err.message);
    }
  };

  const decreaseQty = async (productId) => {
    try {
      await api.post("/cart/update-qty", {
        userId: user._id,
        productId,
        action: "decrease",
      });
      getCart();
    } catch (err) {
      console.log("Decrease Qty Error:", err.response?.data || err.message);
    }
  };

 
  const getWishlist = async (uid = null) => {
    const userId = uid || user?._id;
    if (!userId) return;

    try {
      const res = await api.get(`/wishlist/get/${userId}`);

      setWishlist(
        Array.isArray(res.data)
          ? res.data.map((i) => ({ product: i.product }))
          : []
      );
    } catch (err) {
      console.log("Wishlist Fetch Error:", err.response?.data || err.message);
    }
  };

  const addToWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }

    try {
      await api.post("/wishlist/add", {
        userId: user._id,
        productId: product._id,
      });

      setWishlist((prev) => {
        if (prev.some((i) => i.product._id === product._id)) {
          toast.info("Already in wishlist ❤️");
          return prev;
        }
        toast.success("Added to wishlist ❤️");
        return [...prev, { product }];
      });
    } catch (err) {
      console.log("Add Wishlist Error:", err.response?.data || err.message);
      toast.error("Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/remove/${user._id}/${productId}`);
      await getWishlist();
      toast.info("Removed from wishlist");
    } catch (err) {
      console.log("Remove Wishlist Error:", err.response?.data || err.message);
      toast.error("Failed to remove from wishlist");
    }
  };

  
  const getOrders = async (uid = null) => {
    try {
      const userId = uid || user?._id;
      if (!userId) return;

      const res = await api.get(`/orders/${userId}`);

      // backend sends { orders: [...] }
      const data = res.data;
      setOrders(
        Array.isArray(data)
          ? data
          : Array.isArray(data.orders)
          ? data.orders
          : []
      );
    } catch (err) {
      console.log("Order Fetch Error:", err.response?.data || err.message);
    }
  };

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
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
        setCart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        cartCount: cart.reduce((t, i) => t + i.quantity, 0),

        wishlist,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        wishlistCount: wishlist.length,

        orders,
        getOrders,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
