import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => sessionStorage.getItem("token"));

  const [wishlist, setWishlist] = useState(() => {
    const stored = sessionStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  const [cart, setCart] = useState(() => {
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ ✅ CORRECT PLACE FOR ORDERS
  const [orders, setOrders] = useState([]);

  const loadOrders = (userId) => {
    const saved = localStorage.getItem(`orders_${userId}`);
    setOrders(saved ? JSON.parse(saved) : []);
  };

  const addOrder = (order) => {
    const updated = [...orders, order];
    setOrders(updated);
    localStorage.setItem(`orders_${user._id}`, JSON.stringify(updated));
  };

  useEffect(() => {
    sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);

    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", userToken);

    getCart(userData._id);
    getWishlist(userData.email);
    loadOrders(userData._id);

    fetchOrders(userData._id);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("wishlist");
    localStorage.removeItem(`orders_${user._id}`);
  };

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getCart = async (uid = null) => {
    const userId = uid || (user && user._id);
    if (!userId) return;

    try {
      const res = await axios.get(`http://localhost:3000/cart/get/${userId}`);

      setCart(
        res.data.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        }))
      );
    } catch (err) {
      console.log("Cart Fetch Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (user) getCart();
  }, [user]);

  const addToCart = async (product) => {
    try {
      setCart((prev) => {
        const exists = prev.find((item) => item.product._id === product._id);
        if (exists) {
          return prev.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });

      await axios.post("http://localhost:3000/cart/add", {
        userId: user._id,
        productId: product._id,
      });

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cart/remove/${user._id}/${id}`);
      getCart();
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

      const normalized =
        res.data?.items?.map((it) => ({
          product: it.product ?? {},
        })) ?? [];

      setWishlist(normalized);
    } catch (err) {
      console.log("Wishlist Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (user) getWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    try {
      await axios.post("http://localhost:3000/wishlist/add", {
        userEmail: user.email,
        productId: product._id,
      });

      setWishlist((prev) => {
        if (prev.some((item) => item.product?._id === product._id)) {
          toast.info("Already in wishlist ❤️");
          return prev;
        }
        toast.success("Added to wishlist ❤️");
        return [...prev, { product }];
      });
    } catch (err) {
      console.log("Add Wishlist Error:", err);
      toast.error("Failed to add!");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setWishlist((prev) => prev.filter((w) => w.product._id !== productId));

      await axios.delete(
        `http://localhost:3000/wishlist/remove/${user.email}/${productId}`
      );

      toast.info("Removed from wishlist");
      getWishlist(user.email);
    } catch (err) {
      console.log("Remove Wishlist Error:", err);
      toast.error("Failed to remove!");
    }
  };
  //   const getOrders = async () => {
  //   if (!user) return;
  //   try {
  //     const res = await axios.get(`http://localhost:3000/orders/user/${user._id}`);
  //     setOrders(res.data);
  //   } catch (err) {
  //     console.log("Order Fetch Error", err);
  //   }
  // };
  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:3000/orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.log("Order Fetch Error:", err);
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

        // ✅ New
        orders,
        addOrder,
        fetchOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
