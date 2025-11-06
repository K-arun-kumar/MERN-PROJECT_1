import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  // ✅ Fetch Product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/prd/getId/${id}`);
      setProduct(res.data);
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
  

  return (
    <div className="max-w-5xl mx-auto pt-24 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ✅ Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded shadow"
        />

        {/* ✅ Product Details */}
        <div>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-2xl font-bold mt-2 text-purple-700">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Stock: {product.stock}
          </p>
        </div>
      </div>

      <hr className="my-8" />

      {/* ✅ Review Section */}
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      {product.reviews?.length > 0 ? (
        product.reviews.map((review) => (
          <div
            key={review._id}
            className="border p-4 rounded mb-3 bg-gray-50"
          >
            <p className="font-medium text-yellow-600">
              ⭐ {review.rating}/5
            </p>
            <p className="mt-1">{review.comment}</p>

            {review.userId ? (
              <p className="text-sm text-gray-500 mt-1">
                — by {review.userId.name || review.userId.email || "User"}
              </p>
            ) : null}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      <hr className="my-8" />

      {/* ✅ Add Review Form */}
      <h3 className="text-xl font-semibold mb-3">Add Your Review</h3>

      <form onSubmit={handleSubmitReview} className="space-y-4 max-w-md">
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Rating (1–5)"
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Write your review..."
          rows="4"
        ></textarea>

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductDetails;

