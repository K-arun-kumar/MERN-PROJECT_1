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
      const exists = wishlist.some((x) => x.product._id === product._id);
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
      toast.info("Removed from wishlist 💔");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist ❤️");
    }
    setLiked(!liked);
  };

  // ✅ Increase Qty
  const increaseQty = () => setQuantity((prev) => prev + 1);

  // ✅ Decrease Qty
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // ✅ Total amount based on price & qty
  const totalAmount = product ? Number(product.price) * quantity : 0;

  // const handleBuyNow = () => {
  //   if (!user) {
  //     toast.warning("Please login to continue");
  //     return navigate("/login");
  //   }

  //   for (let i = 0; i < quantity; i++) {
  //     addToCart(product);
  //   }
  //   navigate("/cart");
  // };
const handleBuyNow = (product) => {
  navigate("/checkout", {
    state: {
      buyNowItem: {
        product,
        quantity
      }
    }
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
    <div className="pt-24 px-6 pb-12 max-w-xl mx-auto">
      <div className="relative">
        <img
          src={product.image}
          className="w-full rounded-xl shadow-md"
          alt={product.name}
        />

        <div className="absolute top-3 right-3 flex gap-3">
          <button
            onClick={(e) => handleWishlist(e)}
            className="bg-white p-2 rounded-full shadow-md text-xl"
          >
            {liked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-600" />
            )}
          </button>

          <button className="bg-white p-2 rounded-full shadow-md text-xl">
            <FaShareAlt className="text-gray-600" />
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-4">{product.name}</h2>

      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
        {product.description || "No description available."}
      </p>

      <p className="text-3xl font-bold mt-4 text-purple-700">
        ₹ {product.price}
      </p>

      {/* ✅ Quantity Selector */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={decreaseQty}
          className="w-10 h-10 border rounded flex items-center justify-center text-xl"
        >
          -
        </button>

        <span className="text-xl font-semibold">{quantity}</span>

        <button
          onClick={increaseQty}
          className="w-10 h-10 border rounded flex items-center justify-center text-xl"
        >
          +
        </button>
      </div>

      <p className="text-lg font-semibold mt-3">
        Total Amount: <span className="text-purple-700">₹ {totalAmount}</span>
      </p>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleAddToCartQty}
          className="flex-1 bg-purple-600 text-white py-3 text-lg rounded-lg"
        >
          Add to Cart
        </button>

      <button
  onClick={() => handleBuyNow(product)}
  className="border border-purple-600 text-purple-600 px-4 py-2 rounded-md w-full hover:bg-purple-100 transition"
>
  Buy Now
</button>

      </div>
    </div>
  );
};

export default BuyNow;
