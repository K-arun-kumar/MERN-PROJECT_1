import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ Swiper imports


import { toast } from "react-toastify";

import { FaHeart, FaRegHeart } from "react-icons/fa"; // For wishlist icon

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();
  const { user, addToWishlist, wishlist, removeFromWishlist,addToCart } = useAuth();

  const handleView = (product) => {
    if (!user) {
      return navigate("/login");
    }
    navigate(`/product/${product._id}`);
  };

  const handleWishlist = (e, product) => {
    e.stopPropagation();

    if (!user) {
      toast.warning("Please login");
      sessionStorage.clear();   // ✅ clear storage
  localStorage.clear(); 
      return navigate("/login");
    }

    const exists = wishlist.some((w) => w?.product?._id === product._id);

    if (exists) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };
  const { searchText } = useAuth();

  const filtered = searchText
    ? products.filter((p) =>
        p?.name?.toLowerCase().includes(searchText.toLowerCase())
      )
    : products;

  const featured = filtered.slice(0, 12);
  const handleAddToCart = (product) => {
      if (!user) {
        toast.warning("Please login to add products to cart");
        return navigate("/login");
      }
      addToCart(product);
      toast.success("Added to cart ✅");
    };
  

 return (
  <section className="px-6 md:px-12 py-10">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold">Best Selling Products</h2>
      <button
        onClick={() => navigate("/shop")}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-md"
      >
        View All
      </button>
    </div>

    {featured.length === 0 && (
      <p className="text-gray-500 text-center">No products found.</p>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featured.map((product) => {
        const isWishlisted = wishlist.some(
          (item) => item?.product?._id === product._id
        );

        return (
          <div
            key={product._id}
            className="relative border rounded-xl bg-white shadow-md hover:shadow-xl transition-all group p-4 cursor-pointer"
            onClick={() => handleView(product)}
          >
            {/* Wishlist Button */}
            <button
              onClick={(e) => handleWishlist(e, product)}
              className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md text-lg hover:scale-110"
            >
              {isWishlisted ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500 group-hover:text-red-500" />
              )}
            </button>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-contain rounded-md"
            />

            {/* Name */}
            <h3 className="text-md font-semibold mt-3 text-gray-900 truncate">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center text-yellow-400 mt-1 text-sm">
             ⭐ {product.avgRating || "4.3"}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-2">
              <p className="text-lg font-bold text-green-600">
                ₹{product.price}
              </p>
              <p className="text-gray-400 line-through text-sm">
                ₹{product.oldPrice || product.price *1.2}
              </p>
             <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{Math.floor(Math.random() * 40) + 10}%
              </div>
            </div>

            {/* Buttons */}
            <button
              className="mt-3 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              <i className="fa fa-shopping-cart" /> Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  </section>
);
};

export default FeaturedProducts;
