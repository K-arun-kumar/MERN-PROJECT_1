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

  // ✅ filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");

  // ✅ NEW FILTER UI OPTIONS
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState("");

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

  // ✅ filtering logic
  let filteredProducts = products;

  if (categoryFromUrl) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.toLowerCase() === categoryFromUrl.toLowerCase()
    );
  }

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  const searchKey = searchFromUrl?.trim().toLowerCase() || search.toLowerCase();
  if (searchKey) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchKey)
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => Number(p.price) >= Number(minPrice)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => Number(p.price) <= Number(maxPrice)
    );
  }

  if (rating) {
    filteredProducts = filteredProducts.filter(
      (p) => Number(p.avgRating || 4) >= rating
    );
  }

  // ✅ You can integrate real logic later
  if (brand) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(brand.toLowerCase())
    );
  }

  if (discount) {
    filteredProducts = filteredProducts.filter(
      (p) => (p.discount || 10) >= discount
    );
  }

  const handleClearFilters = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setBrand("");
    setDiscount("");
  };

  return (
    <div className=" px-6 pb-16 bg-[#F9FFF8]">

      {/* ✅ Title with animation & center */}
      <h1 className="text-4xl text-green-700 font-extrabold text-center tracking-wide mb-10 animate-fadeIn">
        {categoryFromUrl || "Shop Products"}
      </h1>

      <div className="flex gap-6">

        {/* ✅ LEFT FILTER MENU */}
        <div className="w-72 rounded-xl border border-green-400 bg-white p-5 h-fit sticky top-5 shadow-md overflow-hidden">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button
              className="text-green-600 text-sm hover:underline"
              onClick={handleClearFilters}
            >
              CLEAR ALL
            </button>
          </div>

          {/* ✅ FILTER CHIPS */}
          <div className="flex flex-wrap gap-3 mb-4">
            {[selectedCategory, minPrice, maxPrice, rating, brand, discount].some(
              Boolean
            ) ? (
              <>
                {selectedCategory && (
                  <span className="px-3 py-1 bg-green-100 border border-green-600 rounded-full text-sm">
                    {selectedCategory}
                  </span>
                )}
                {brand && (
                  <span className="px-3 py-1 bg-green-100 border border-green-600 rounded-full text-sm">
                    {brand}
                  </span>
                )}
                {minPrice && (
                  <span className="px-3 py-1 bg-green-100 border border-green-600 rounded-full text-sm">
                    ₹{minPrice}+
                  </span>
                )}
                {maxPrice && (
                  <span className="px-3 py-1 bg-green-100 border border-green-600 rounded-full text-sm">
                    under ₹{maxPrice}
                  </span>
                )}
                {rating && (
                  <span className="px-3 py-1 bg-green-100 border border-green-600 rounded-full text-sm">
                    {rating}★+
                  </span>
                )}
                {discount && (
                  <span className="px-3 py-1 bg-green-100 border border-green-600 rounded-full text-sm">
                    {discount}% OFF
                  </span>
                )}
              </>
            ) : (
              <p className="text-gray-400 text-sm">No filters applied</p>
            )}
          </div>

          {/* ✅ CATEGORY */}
          <div className="border-t pt-4 pb-3">
            <p className="font-semibold text-gray-800">Category</p>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border w-full rounded-lg mt-2 p-2 border-green-400 bg-gray-50"
            >
              <option value="">All</option>
              <option value="fruits">Fruits & Vegetables</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="dairy">Dairy</option>
            </select>
          </div>

          {/* ✅ BRAND */}
          <div className="border-t pt-4 pb-3">
            <p className="font-semibold text-gray-800 mb-2">Brand</p>
            <input
              type="text"
              value={brand}
              placeholder="Brand name"
              onChange={(e) => setBrand(e.target.value)}
              className="border w-full rounded-md p-2 border-green-400 bg-gray-50"
            />
          </div>

          {/* ✅ PRICE */}
          <div className="border-t pt-4 pb-3">
            <p className="font-semibold text-gray-800 mb-2">Price</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border p-2 w-1/2 rounded-md border-green-400 bg-gray-50"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border p-2 w-1/2 rounded-md border-green-400 bg-gray-50"
              />
            </div>
          </div>

          {/* ✅ DISCOUNT */}
          <div className="border-t pt-4 pb-3">
            <p className="font-semibold text-gray-800 mb-2">Discount</p>

            {[50, 30, 10].map((d) => (
              <label key={d} className="flex gap-2 items-center mb-2 cursor-pointer">
                <input
                  type="radio"
                  value={d}
                  checked={discount == d}
                  onChange={() => setDiscount(d)}
                />
                <span>{d}% or more</span>
              </label>
            ))}
          </div>

          {/* ✅ RATING */}
          <div className="border-t pt-4">
            <p className="font-semibold text-gray-800 mb-2">Ratings</p>
            {[4, 3, 2].map((r) => (
              <label key={r} className="flex gap-2 items-center mb-2 cursor-pointer">
                <input
                  type="radio"
                  value={r}
                  checked={rating == r}
                  onChange={() => setRating(r)}
                />
                <span>{r}★ & above</span>
              </label>
            ))}
          </div>
        </div>

        {/* ✅ RIGHT PRODUCT GRID */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const isWishlisted = wishlist.some(
                  (item) => item?.product?._id === product._id
                );

                return (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="relative border border-green-200 bg-white p-4 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
                  >
                    {/* wishlist */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        isWishlisted
                          ? removeFromWishlist(product._id)
                          : addToWishlist(product);
                      }}
                      className="absolute top-4 right-4 text-xl bg-white shadow rounded-full p-2 hover:scale-110 transition"
                    >
                      {isWishlisted ? (
                        <FaHeart className="text-red-600" />
                      ) : (
                        <FaRegHeart className="text-gray-500 hover:text-red-600 transition" />
                      )}
                    </button>

                    <img
                      src={product.image}
                      className="h-40 w-full object-contain rounded-md"
                      alt=""
                    />

                    <h3 className="text-lg font-semibold mt-3 text-gray-900">
                      {product.name}
                    </h3>

                    <p className="text-green-600 text-base mt-1">
                      ⭐ {product.avgRating || "4.3"}
                    </p>

                    {/* <p className="text-xl font-bold mt-2 text-green-700">
                      ₹{product.price}
                    </p> */}
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

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-1/2 transition"
                      >
                        Add to Cart
                      </button>

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
              <p className="text-gray-500 text-lg text-center col-span-full">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
