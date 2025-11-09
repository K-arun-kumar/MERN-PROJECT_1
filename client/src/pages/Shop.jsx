import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, addToCart, addToWishlist, removeFromWishlist, wishlist } =
    useAuth();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Always convert to string to avoid `[OBJECT OBJECT]`
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category") || "";
  const searchFromUrl = queryParams.get("search") || "";

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/prd/getPrd");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.warning("Please login to add products to cart");
      return navigate("/login");
    }
    addToCart(product);
    toast.success("Added to cart ✅");
  };

  let filteredProducts = products;

  // ✅ 1) Filter by category (if available)
  if (categoryFromUrl) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.toLowerCase() === categoryFromUrl.toLowerCase()
    );
  }

  // ✅ 2) Filter by search
  const searchKey = searchFromUrl?.trim().toLowerCase() || search.toLowerCase();

  if (searchKey) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchKey)
    );
  }

  return (
   <div className="pt-28 px-10 pb-10  bg-white">
  <h1 className="text-3xl font-bold mb-6 text-gray-900">
    {categoryFromUrl ? categoryFromUrl : "Shop Products"}
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => {
        const isWishlisted = wishlist.some(
          (item) => item?.product?._id === product._id
        );

        return (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="relative border border-green-300 bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            {/* ❤️ Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                isWishlisted
                  ? removeFromWishlist(product._id)
                  : addToWishlist(product);
              }}
              className="absolute top-5 right-6 text-xl bg-white shadow rounded-full p-1"
            >
              {isWishlisted ? (
                <FaHeart className="text-red-600" />
              ) : (
                <FaRegHeart className="text-gray-500 hover:text-red-600 transition" />
              )}
            </button>

            <img
              src={product.image}
              className="h-40 w-full object-contain scale- rounded-md"
              alt=""
            />

            <h3 className="text-lg font-semibold mt-3 text-gray-900">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <p className="text-green-600 font-medium text-lg">
                ⭐ {product.avgRating || "4.3"}
              </p>
              <span className="text-gray-500 text-sm">(Customer Rating)</span>
            </div>

            {/* Pricing */}
            <p className="text-xl font-bold mt-2 text-green-700">
              ₹{product.price}
            </p>

            <div className="flex gap-2 mt-4">
              {/* Add To Cart */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-1/2 transition"
              >
                Add to Cart
              </button>

              {/* Buy Now */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/buy/${product._id}`);
                }}
                className="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-md w-1/2 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        );
      })
    ) : (
      <p className="text-gray-500 text-lg">No products found.</p>
    )}
  </div>
</div>

  );
};

export default Shop;
