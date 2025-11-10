import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

// ✅ ADDED — Magnify Component
function Magnify({ src }) {
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState("50% 50%");
  

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos(`${x}% ${y}%`);
    setZoom(true);
  };
 

  return (
    <div
      className="absolute top-0 left-full ml-4 w-[400px] h-[400px]
                 rounded-lg overflow-hidden border border-green-300
                 hidden md:block bg-white shadow-xl z-50"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "200%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: pos,
        display: zoom ? "block" : "none",
      }}
    ></div>
  );
}

const ProductDetails = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();
   const { addToCart, user } = useAuth();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  // ✅ ADDED — to store selected image
  const [mainImage, setMainImage] = useState(null);

  // ✅ Fetch Product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/prd/getId/${id}`);
      setProduct(res.data);
      setMainImage(res.data.image); // ✅ ADDED
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ✅ Submit Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.warning("Login required to review");
      return navigate("/login");
    }

    if (!rating || rating < 1 || rating > 5) {
      return toast.error("Rating must be between 1–5");
    }

    if (!comment.trim()) {
      return toast.error("Comment required");
    }

    try {
      await axios.post(`http://localhost:3000/prd/${id}/review`, {
        userId: user._id,
        comment,
        rating: Number(rating),
      });

      toast.success("Review submitted ✅");

      setComment("");
      setRating("");

      fetchProduct(); // refresh
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit");
    }
  };

  if (!product) return <p className="text-center mt-20">Loading Product...</p>;
  const handleAddToCart = (product) => {
        if (!user) {
          toast.warning("Please login to add products to cart");
          return navigate("/login");
        }
        addToCart(product);
        toast.success("Added to cart ✅");
      };

  return (
    <div className="pt-20 px-4 md:px-10 flex justify-center">
      <div className="w-full max-w-6xl border border-green-300 rounded-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* ✅ LEFT SIDE (Image + Reviews) */}
          <div className="border border-green-300 rounded-xl p-6 relative">
            {/* ✅ Product Image */}
            <div className="flex justify-center relative group">
              <img
                src={mainImage}
                alt={product.name}
                className="w-80 h-80 object-contain rounded-lg"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  document.getElementById(
                    "zoomBox"
                  ).style.backgroundPosition = `${x}% ${y}%`;
                  document.getElementById("zoomBox").style.display = "block";
                }}
                onMouseLeave={() => {
                  document.getElementById("zoomBox").style.display = "none";
                }}
              />

              {/* ✅ ADDED — Zoom box */}
              <div
                id="zoomBox"
                className="absolute top-0 left-full ml-4 w-[400px] h-[400px]
                           rounded-lg overflow-hidden border border-green-300
                           hidden md:block bg-white shadow-xl z-50"
                style={{
                  backgroundImage: `url(${mainImage})`,
                  backgroundSize: "200%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "50% 50%",
                }}
              ></div>
            </div>

            {/* ✅ Thumbnails (Optional) */}
            {product.image && (
              <div className="flex gap-3 mt-5 justify-center">
                {[product.image, product.image, product.image].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onMouseEnter={() => setMainImage(img)} // ✅ ADDED
                    className="w-20 h-20 rounded-lg border border-green-300 hover:scale-105 transition object-contain cursor-pointer"
                  />
                ))}
              </div>
            )}

            <hr className="my-6 border-green-200" />

            {/* ✅ Reviews */}
            <h2 className="text-xl font-bold text-gray-900 mb-3">Reviews</h2>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {product.reviews?.length > 0 ? (
                product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border border-green-200 p-3 rounded-lg bg-green-50 text-sm"
                  >
                    <p className="font-medium text-green-700">
                      ⭐ {review.rating}/5
                    </p>
                    <p className="mt-1 text-gray-800">{review.comment}</p>

                    {review.userId ? (
                      <p className="text-xs text-gray-600 mt-1">
                        — {review.userId.name || review.userId.email}
                      </p>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* ✅ RIGHT SIDE (Details + Add Review) */}
          <div className="p-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2">
              <p className="text-yellow-500 text-lg">
                ⭐ {product.avgRating || "4.3"}
              </p>
              <span className="text-gray-500 text-sm">(Rating)</span>
            </div>

            <p className="text-gray-700 mt-2 leading-relaxed text-sm">
              {product.description}
            </p>

            <p className="text-3xl font-bold mt-4 text-green-700">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Stock: <span className="text-green-600">{product.stock}</span>
            </p>

            {/* ✅ BUTTONS */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-lg transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate(`/buy/${product._id}`)}
                className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-3 text-lg rounded-lg transition"
              >
                Buy Now
              </button>
            </div>

            <hr className="my-8 border-green-200" />

            {/* ✅ Add Review */}
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Add Your Review
            </h3>

            <form
              onSubmit={handleSubmitReview}
              className="space-y-4 border border-green-200 bg-green-50 p-6 rounded-xl"
            >
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border border-green-300 p-2 w-full rounded outline-none focus:ring focus:ring-green-300 text-sm"
                placeholder="Rating (1–5)"
              />

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border border-green-300 p-2 w-full rounded outline-none focus:ring focus:ring-green-300 text-sm"
                placeholder="Write your review..."
                rows="4"
              ></textarea>

              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full transition text-sm">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
