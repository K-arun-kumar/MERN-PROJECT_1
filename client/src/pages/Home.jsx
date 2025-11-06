import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import FeaturedProducts from "./FeaturedProducts";


const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);

  // ✅ Fetch products once & show only 4 for Editor's Pick
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/prd/getPrd");
        setProducts(res.data.slice(0,500)); 
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ When clicking category → go to shop with filter
  // const handleCategoryClick = (category) => {
  //   navigate(`/shop?category=${encodeURIComponent(category)}`);
  // };

  return (
    <div className="">

      {/* ---------- HERO SECTION ---------- */}
      <section className="bg-[#E9E4F7] w-full flex justify-between items-center px-20 py-14">
        <div className="max-w-xl">
          <p className="bg-green-200 text-green-800 px-3 py-1 rounded-md w-fit mb-4">
            Weekend Discount
          </p>
          <h1 className="text-5xl font-bold text-purple-900 leading-snug">
            Shopping with us for <br />
            better quality and the <br />
            best price
          </h1>

          <p className="text-gray-600 mt-3">
            We have prepared special discounts for you on grocery products.
            Don’t miss these opportunities...
          </p>

          <div className="flex items-center gap-5 mt-6">
            <button onClick={() => navigate("/shop")} className="bg-purple-600 text-white px-6 py-3 rounded-md text-lg">
              Shop Now
            </button>
            <div>
              <span className="text-red-600 font-bold text-xl">$21.67</span>
              <span className="line-through text-gray-500 ml-2">$26.67</span>
              <p className="text-gray-400 text-sm">
                Don’t miss this limited-time offer.
              </p>
            </div>
          </div>
        </div>

        <img
          src="https://i.pinimg.com/736x/ac/2c/9e/ac2c9e94287f97a5c4f0a2e1543e9c44.jpg"
          alt="Cereal"
          className="w-[370px]"
        />
      </section>

      {/* ---------- CATEGORIES (CLICKABLE NOW) ---------- */}
      <section className="flex justify-center gap-10 py-10 overflow-x-auto">
        {[
          { name: "Fruits & Vegetables", img: "https://i.pinimg.com/1200x/43/13/28/43132856e8f1979d70657c1d8a93f8a1.jpg" },
          { name: "Beverages", img: "https://carst.com/wp-content/uploads/2024/01/colour-in-non-alcoholic-beverages.jpg" },
          { name: "Meats & Seafood", img: "https://as1.ftcdn.net/jpg/01/18/84/52/1000_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.webp" },
          { name: "Biscuits & Snacks", img: "https://www.jiomart.com/images/product/original/rvteqk0y8i/taste-good-karela-biscuits-high-fiber-tasty-and-healthy-sugar-free-snacks-1600-g-pack-of-16-product-images-orvteqk0y8i-p593476239-0-202208270838.jpg?im=Resize=(420,420)" },
          { name: "Breads & Bakery", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1026" },
          { name: "Breakfast & Dairy", img: "https://www.milkgenomics.org/wp-content/uploads//breakfast-dairy.jpeg" },
          { name: "Frozen Foods", img: "https://as2.ftcdn.net/jpg/14/75/13/89/1000_F_1475138945_hhX2TYfFXPnNkPWpf9TgCWxgggo38Lum.webp" },
          { name: "Grocery & Staples", img: "https://media.istockphoto.com/id/1283712032/photo/cardboard-box-filled-with-non-perishable-foods-on-wooden-table-high-angle-view.jpg?s=2048x2048&w=is&k=20&c=rxtHv86VNx95aaNwYGzvwL_FM1It_5WdWGNAS97nXt0=" },
        ].map((cat, i) => (
          <div
            key={i}
            className="flex flex-col items-center hover:scale-105 transition"
            onClick={() => navigate(`/shop?category=${cat.name}`)}

          >
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-md border">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 text-sm font-medium">{cat.name}</p>
          </div>
        ))}
      </section>

      {/* ✅ Only First 4 Products (Editor’s Pick) */}
      <FeaturedProducts products={products} />
    </div>
  );
};

export default Home;
