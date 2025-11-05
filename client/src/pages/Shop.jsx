import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";

import { useNavigate, useLocation } from "react-router-dom"; // ✅ Added useLocation
import axios from "axios";
import { toast } from "react-toastify";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ To read category from URL
  const { user, addToCart } = useAuth();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Get category from URL
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category");

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

    addToCart(product); // ✅ Now using global cart
    toast.success("Added to cart ✅");
  };

  // ✅ First apply search filter
  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Then apply category filter (only if URL has category)
  if (categoryFromUrl) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === categoryFromUrl.toLowerCase()
    );
  }

  return (
    <div className="pt-28 px-10 pb-10">
      <h1 className="text-3xl font-bold mb-6">
        {categoryFromUrl ? categoryFromUrl : "Shop Products"}
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full sm:w-80 border px-3 py-2 rounded-md mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-md shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                className="h-40 w-full object-cover rounded"
                alt=""
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-yellow-500 text-lg">
                  ⭐ {product.avgRating}
                </p>

                <span className="text-gray-500 text-sm">(Customer Rating)</span>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md w-1/2 hover:bg-purple-700 transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => navigate(`/buy/${product._id}`)}
                  className="border border-purple-600 text-purple-600 px-4 py-2 rounded-md w-1/2 hover:bg-purple-100 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
