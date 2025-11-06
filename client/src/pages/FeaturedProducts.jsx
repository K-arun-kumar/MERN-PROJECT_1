import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toast } from "react-toastify";

import { FaHeart, FaRegHeart } from "react-icons/fa"; // For wishlist icon

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();
  const { user, addToWishlist, wishlist, removeFromWishlist } = useAuth();

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

  const featured = filtered.slice(0, 500);

  return (
    <section className="px-10 py-8">
      <h2 className="text-2xl font-semibold mb-5">Editor's Picks ✨</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full"
      >
        {featured.length === 0 && (
          <p className="text-gray-500 text-center">No products found.</p>
        )}

        {featured.map((product) => {
          const isWishlisted = wishlist.some(
            (item) => item?.product?._id === product._id
          );

          return (
            <SwiperSlide key={product._id}>
              <div
                className="relative border rounded-md shadow hover:shadow-lg p-4 cursor-pointer transition-all"
                onClick={() => handleView(product)} // ✅ NAVIGATION FIX
              >
                <button
                  onClick={(e) => handleWishlist(e, product)}
                  className="absolute top-2 right-2 text-xl"
                >
                  {isWishlisted ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500 hover:text-red-500" />
                  )}
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-md"
                />
               
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-purple-700 font-bold mt-1">
                  ₹{product.price}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default FeaturedProducts;
