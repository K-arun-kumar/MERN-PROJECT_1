// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/prd/getId/${id}`);
//         setProduct(res.data);
//       } catch (error) {
//         console.log("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product) {
//     return <p className="text-center mt-10 text-xl">Loading Product...</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-72 h-72 mx-auto object-cover rounded-lg shadow"
//       />

//       <h1 className="text-3xl font-bold text-center mt-4">{product.name}</h1>
//       <p className="text-center text-gray-600">{product.category}</p>

//       <p className="mt-4 text-lg">{product.description}</p>

//       <p className="mt-4 text-2xl font-semibold text-green-600">
//         ₹ {product.price}
//       </p>

//       <p className="mt-1 text-gray-700">Stock Available: {product.stock}</p>

//       <div className="mt-6 flex justify-center">
//         <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  const { user } = useAuth();   // ✅ Step 2

  const { id } = useParams();
  const [product, setProduct] = useState(null);
   const [rating, setRating] = useState(0);
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

  // ✅ Handle Review Submission
const handleSubmitReview = async (e) => {
  e.preventDefault();

  try {
    await axios.post(`http://localhost:3000/prd/${id}/review`, {
      userId: user._id, // ✅ now user is defined
      comment,
      rating: Number(rating),
    });

    setComment("");
    setRating(0);
    fetchProduct(); // Refresh reviews
  } catch (error) {
    console.log(error);
  }
};

  if (!product) return <p className="text-center mt-20">Loading Product...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 flex justify-center">

      <div className="">
      <img
        src={product.image}
        alt=""
        className="w-full h-full object-fit rounded"
      />
      </div>
      <div>

      <h1 className="text-3xl font-semibold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl font-bold mt-2">₹{product.price}</p>

      <hr className="my-6" />

      {/* ✅ Review Section */}
      <h2 className="text-2xl font-semibold mb-3">Reviews</h2>

      {product.reviews?.length > 0 ? (
        product.reviews.map((review, index) => (
          <div key={index} className="border p-3 rounded mb-2">
            <p className="font-medium">Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      <hr className="my-6" />
      

      {/* ✅ Add Review Form */}
      <h3 className="text-xl font-semibold mb-2">Add Your Review</h3>
      <form onSubmit={handleSubmitReview} className="space-y-3">
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 w-full"
          placeholder="Rating (1-5)"
        />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 w-full"
          placeholder="Write your review..."
        ></textarea>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>
      </div>
    </div>
  );
};

export default ProductDetails;
