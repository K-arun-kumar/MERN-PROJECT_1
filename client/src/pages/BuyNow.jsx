import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

const BuyNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, user, wishlist, addToWishlist, removeFromWishlist } =
    useAuth();

  const [product, setProduct] = useState(null);
  const [liked, setLiked] = useState(false);
  

  // ✅ quantity state
  const [quantity, setQuantity] = useState(1);

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

  useEffect(() => {
    if (product && wishlist) {
      const exists = wishlist.some((x) => x?.product?._id === product._id);

      setLiked(exists);
    }
  }, [wishlist, product]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      toast.warning("Please login to continue");
      return navigate("/login");
    }

    if (liked) {
      removeFromWishlist(product._id);
      
    } else {
      addToWishlist(product);
 
    }

    setLiked(!liked);
  };

  // ✅ Increase Qty
  const increaseQty = () => setQuantity((prev) => prev + 1);

  // ✅ Decrease Qty
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // ✅ Total amount based on price & qty
  const totalAmount = product ? Number(product.price) * quantity : 0;

  const handleBuyNow = (product) => {
    if (!user) {
      toast.warning("Please login to continue");
      return navigate("/login");
    }

    navigate("/checkout", {
      state: {
        buyNowItem: {
          product,
          quantity,
        },
      },
    });
  };

  const handleAddToCartQty = () => {
    if (!user) {
      toast.warning("Please login to continue");
      return navigate("/login");
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    toast.success("Added to cart ✅");
  };

  if (!product)
    return <div className="mt-40 text-center text-xl">Loading...</div>;

  return (
  <div className="pt-15 px-4 md:px-16 pb-10 bg-white">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

    {/* ✅ LEFT IMAGE */}
    <div className="relative flex flex-col items-center bg-white border border-green-200 rounded-xl p-6 shadow-sm">

      {/* main image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-[350px] h-[350px] object-contain rounded-lg transition-transform duration-300 hover:scale-105"
      />

      {/* thumbnails */}
      <div className="flex gap-3 mt-5">
        {[product.image, product.image, product.image].map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-20 h-20 rounded-lg border border-green-300 shadow hover:scale-110 transition cursor-pointer bg-white object-contain"
          />
        ))}
      </div>

      {/* Actions */}
      <div className="absolute top-4 right-4 flex gap-3">
        {/* wishlist */}
        <button
          onClick={(e) => handleWishlist(e)}
          className="bg-white p-2 rounded-full shadow-md hover:scale-105 transition"
        >
          {liked ? (
            <FaHeart className="text-green-600 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-600 text-xl" />
          )}
        </button>

        {/* share */}
        <button className="bg-white p-2 rounded-full shadow-md hover:scale-105 transition">
          <FaShareAlt className="text-gray-600 text-xl" />
        </button>
      </div>
    </div>

    {/* ✅ RIGHT SECTION */}
    <div className="bg-white border border-green-200 rounded-xl p-6 md:p-8 shadow-sm">

      {/* Name */}
      <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>

      {/* Rating */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-green-600 font-semibold">⭐ {product.avgRating || "4.3"}</span>
        <span className="text-gray-600 text-sm">
          ({product.reviews?.length || 200} reviews)
        </span>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-3">
        <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-md border border-green-300">
          100% Organic
        </span>

        <span className="bg-green-50 text-green-600 px-3 py-1 text-xs rounded-md border border-green-300">
          Best Seller
        </span>
      </div>

      {/* price */}
      <div className="mt-6 flex items-center gap-3">
        <p className="text-4xl font-bold text-green-700">₹{product.price}</p>
        <p className="line-through text-gray-500 text-lg">
          ₹{product.oldPrice || product.price + 200}
        </p>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
          10% OFF
        </span>
      </div>

      {/* description */}
      <p className="text-gray-700 mt-4 leading-relaxed">
        {product.description || "Premium organic produce. Freshly sourced from local farms."}
      </p>

      {/* Quantity */}
      <div className="flex items-center gap-6 mt-6">
        <p className="font-medium text-lg">Quantity:</p>

        <button
          onClick={decreaseQty}
          className="w-10 h-10 border border-green-300 rounded-lg flex items-center justify-center text-xl hover:bg-green-100"
        >
          -
        </button>

        <span className="text-xl font-semibold px-4">{quantity}</span>

        <button
          onClick={increaseQty}
          className="w-10 h-10 border border-green-300 rounded-lg flex items-center justify-center text-xl hover:bg-green-100"
        >
          +
        </button>
      </div>

      {/* total */}
      <p className="text-xl font-semibold mt-3">
        Total: <span className="text-green-700 text-2xl font-bold">₹ {totalAmount}</span>
      </p>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleAddToCartQty}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-lg transition shadow"
        >
          Add to Cart
        </button>

        <button
          onClick={() => handleBuyNow(product)}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 text-lg rounded-lg transition shadow"
        >
          Buy Now
        </button>
      </div>

      {/* Highlights */}
      <div className="mt-10">
        <p className="font-semibold text-gray-800 mb-3">Why Choose Us?</p>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li>✅ Farm-Fresh Organic Quality</li>
          <li>✅ Fast & Free Delivery</li>
          <li>✅ Easy Return Guarantee</li>
          <li>✅ Secure Payment</li>
        </ul>
      </div>
    </div>
  </div>

  {/* ✅ Sticky CTA Mobile */}
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-400 shadow-md p-4 flex gap-3 md:hidden">
    <button
      onClick={handleAddToCartQty}
      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-lg transition shadow"
    >
      Add to Cart
    </button>

    <button
      onClick={() => handleBuyNow(product)}
      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 text-lg rounded-lg transition shadow"
    >
      Buy Now
    </button>
  </div>

</div>

  );
};

export default BuyNow;
