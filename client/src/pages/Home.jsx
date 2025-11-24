import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import FeaturedProducts from "./FeaturedProducts";
import RecentProductsBlog from "@/components/BlogPage";

import "swiper/css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/prd/getPrd");
        setProducts(res.data.slice(0, 500));
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="">
      <section className=" bg-[#FFE082]">
        <div className=" mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-4 sm:px-8 lg:px-12 py-14">
          <div className="w-full md:w-1/2 pr-0 lg:pr-8">
            <p className="bg-green-200 text-green-800 px-3 py-1 rounded-md w-fit mb-4 text-sm font-medium">
              Fresh Organic Deals
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold leading-snug text-black">
              Organic Groceries{" "}
              <span className="text-green-700">Delivered</span>
              <br />
              to your{" "}
              <span className="text-black font-extrabold">Doorstep</span>
            </h1>

            <p className="text-gray-700 mt-4 text-lg leading-relaxed">
              Shop fresh fruits, vegetables, and natural products grown without
              chemicals. Experience healthy living with fast delivery & fair
              pricing.
            </p>

            <div className="flex items-center gap-5 mt-8">
              <button
                onClick={() => navigate("/shop")}
                className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-full text-lg font-medium transition"
              >
                START SHOPPING
              </button>

              <button className="bg-black hover:bg-gray-900 text-white px-7 py-3 rounded-full text-lg font-medium transition">
                JOIN NOW
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-8 mt-10 text-center">
              <div>
                <h2 className="text-3xl font-bold text-black">14k+</h2>
                <p className="text-gray-600 text-xs tracking-wide">
                  NATURAL PRODUCTS
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-black">50k+</h2>
                <p className="text-gray-600 text-xs tracking-wide">
                  SATISFIED CUSTOMERS
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-black">10+</h2>
                <p className="text-gray-600 text-xs tracking-wide">
                  LOCAL FARMS
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://i.pinimg.com/736x/8f/7a/3c/8f7a3c124b0b3a16f6bd98a4673e9329.jpg"
              alt="Fresh Vegetables"
              className="w-full max-w-[500px] rounded-2xl drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="w-full px-6 md:px-14 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Category</h2>

          <div className="flex items-center gap-3">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => navigate("/shop")}
            >
              View All
            </button>

            <button
              id="scrollLeft"
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-200 transition"
            >
              {"<"}
            </button>

            <button
              id="scrollRight"
              className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-200 transition"
            >
              {">"}
            </button>
          </div>
        </div>

        <div
          id="catScroll"
          className="flex gap-10 py-4 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {[
            {
              name: "Fruits & Vegetables",
              img: "https://i.pinimg.com/1200x/43/13/28/43132856e8f1979d70657c1d8a93f8a1.jpg",
              link: "/shop?category=fruits",
            },
            {
              name: "Beverages",
              img: "https://carst.com/wp-content/uploads/2024/01/colour-in-non-alcoholic-beverages.jpg",
              link: "/shop?category=beverages",
            },
            {
              name: "Meats & Seafood",
              img: "https://as1.ftcdn.net/jpg/01/18/84/52/1000_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.webp",
            },
            {
              name: "Biscuits & Snacks",
              img: "https://www.jiomart.com/images/product/original/rvteqk0y8i/taste-good-karela-biscuits-high-fiber-tasty-and-healthy-sugar-free-snacks-1600-g-pack-of-16-product-images-orvteqk0y8i-p593476239-0-202208270838.jpg?im=Resize=(420,420)",
              link: "/shop?category=snacks",
            },
            {
              name: "Breads & Bakery",
              img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1026",
            },
            {
              name: "Breakfast & Dairy",
              img: "https://www.milkgenomics.org/wp-content/uploads//breakfast-dairy.jpeg",
              link: "/shop?category=dairy",
            },
            {
              name: "Frozen Foods",
              img: "https://as2.ftcdn.net/jpg/14/75/13/89/1000_F_1475138945_hhX2TYfFXPnNkPWpf9TgCWxgggo38Lum.webp",
            },
            {
              name: "Grocery & Staples",
              img: "https://media.istockphoto.com/id/1283712032/photo/cardboard-box-filled-with-non-perishable-foods-on-wooden-table-high-angle-view.jpg?s=2048x2048&w=is&k=20&c=rxtHv86VNx95aaNwYGzvwL_FM1It_5WdWGNAS97nXt0=",
            },
          ].map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center hover:scale-105 transition cursor-pointer"
              onClick={() => cat.link && navigate(cat.link)}
            >
              <div className="w-28 h-28 rounded-full overflow-hidden shadow-md border border-gray-200">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm font-medium whitespace-nowrap">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <FeaturedProducts products={products} />
      <RecentProductsBlog />
    </div>
  );
};

export default Home;
