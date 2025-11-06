import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios"; // ✅ Make sure this is here

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




  // ✅ Cart State Load from session
  const [cart, setCart] = useState(() => {
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
  sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);


  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);

    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", userToken);

    // ✅ Load Cart from backend when login
    getCart(userData._id);
    getWishlist(userData.email);

  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]); // ✅ Clear cart
    sessionStorage.clear();
    localStorage.clear();
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
    // ✅ Optimistic UI first → update cart instantly
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

    // ✅ Backend update
    await axios.post("http://localhost:3000/cart/add", {
      userId: user._id,
      productId: product._id,
    });

    // ✅ Sync back once confirmed
    getCart();
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

    // ✅ Normalize
    const normalized =
      serverData?.items?.map((it) => ({
        product: it.product || {},
      })) || [];

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
      if (prev.some((item) => item?.product?._id === product._id)) {
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



export const useAuth = () => useContext(AuthContext);
