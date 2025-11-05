import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { addToWishlist } = useAuth();

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/prd/getPrd");
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((prd) => (
          <div
            key={prd._id}
            className="border rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <Link to={`/product/${prd._id}`}>
              <img
                src={prd.image}
                alt={prd.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
            </Link>

            <h2 className="text-xl font-semibold">{prd.name}</h2>
            <p className="text-gray-600">₹ {prd.price}</p>
            <p className="text-sm text-gray-500">{prd.category}</p>
            <p className="text-sm text-gray-700 mt-1">Stock: {prd.stock}</p>
            <button
              onClick={() => addToWishlist(prd)}
              className="mt-2 w-full text-center border border-red-500 text-red-500 p-2 rounded hover:bg-red-500 hover:text-white transition"
            >
              ❤️ Add to Wishlist
            </button>

            <Link
              to={`/product/${prd._id}`}
              className="block text-center mt-3 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
