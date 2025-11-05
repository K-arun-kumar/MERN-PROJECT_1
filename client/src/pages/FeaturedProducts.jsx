


import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedProducts = ({ products }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleView = (product) => {
    if (!user) {
      return navigate("/login");
    }
    navigate(`/product/${product._id}`);
  };

  // ✅ Only first 4 products for Editor's Picks
  const featured = products.slice(0, 8);

  return (
    <section className="px-10 py-8">
      <h2 className="text-2xl font-semibold mb-5">Editor's Picks ✨</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        breakpoints={{
          640: { slidesPerView: 2 },   // Tablet
          1024: { slidesPerView: 4 }, // Desktop
        }}
        className="w-full"
      >
        {featured.map((product) => (
          <SwiperSlide key={product._id}>
            <div
              onClick={() => handleView(product)}
              className="border rounded-md shadow hover:shadow-lg p-4 cursor-pointer transition-all"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="text-purple-700 font-bold mt-1">₹{product.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedProducts;
