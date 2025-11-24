import React from "react";
import { useNavigate } from "react-router-dom";

const RecentProductsBlog = ({ products = [] }) => {
  const navigate = useNavigate();

  const safeProducts =
    Array.isArray(products) && products.length > 0
      ? products.slice(0, 3)
      : [
          {
            _id: "1",
            name: "Organic juice",
            category: "beverages",
            image:
              "https://i.pinimg.com/736x/61/f0/40/61f0400e14e250c23cc9934552ed9374.jpg",
          },
          {
            _id: "2",
            name: "Pure Milk Pack",
            category: "Dairy",
            image:
              "https://w0.peakpx.com/wallpaper/226/995/HD-wallpaper-dairy-products-delicious-food-fruit-grape-cheese-spice-milk-garlic-vegetables-cream.jpg",
          },
          {
            _id: "3",
            name: "Nuts",
            category: "Dairy",
            image:
              "https://i.pinimg.com/736x/f9/1f/0b/f91f0bfcc26025bb1f0b7b8f55ca705c.jpg",
          },
        ];

  return (
    <section id="recent-blog" className="px-6 md:px-12 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Our Recent Blog</h2>

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm rounded-md"
          onClick={() => navigate("/shop")}
        >
          View All
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {safeProducts.map((item, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-md border bg-white cursor-pointer hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span>📅 28 AUG 2024</span>
                <span>📌 {item.category}</span>
              </div>

              <h3 className="mt-3 text-xl font-bold leading-snug">
                {`Top quality ${item.name} — Why customers love it`}
              </h3>

              <p className="text-gray-500 mt-2">
                Enjoy premium quality {item.name?.toLowerCase()} sourced from
                trusted farms. Healthy, tasty and delivered fresh to your
                doorstep.
              </p>

              <button
                className="mt-4 text-green-600 font-semibold hover:underline"
                onClick={() => navigate(`/product/${item._id}`)}
              >
               
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentProductsBlog;
