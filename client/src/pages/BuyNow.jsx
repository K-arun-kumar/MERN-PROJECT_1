import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const BuyNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, user } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("500ml");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/prd/getId/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    if (!user) {
      toast.warning("Please login to continue");
      return navigate("/login");
    }
    addToCart(product);
    navigate("/cart");
  };

  if (!product) return <div className="mt-40 text-center text-xl">Loading...</div>;

  return (
    <div className="pt-24 px-6 pb-12 max-w-xl mx-auto">
      <img src={product.image} className="w-full rounded-xl shadow-md" alt={product.name} />

      <div className="flex justify-between items-center mt-4">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <button
          onClick={() => setLiked(!liked)}
          className="text-2xl"
        >
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

     <div className="flex items-center gap-2 mt-1">
<p className="text-yellow-500 text-xl">⭐ {product.avgRating}</p>

  <span className="text-gray-500 text-sm">(Based on customer reviews)</span>
</div>


      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
        {product.description || "No description available."}
      </p>

      <p className="text-3xl font-bold mt-4 text-purple-700">₹ {product.price}</p>

      {/* SIZE SELECTOR */}
      
     

      {/* BUTTONS */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-purple-600 text-white py-3 text-lg rounded-lg"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-orange-500 text-white py-3 text-lg rounded-lg"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default BuyNow;
