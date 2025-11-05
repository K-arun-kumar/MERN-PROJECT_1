import { useAuth } from "../context/AuthContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useAuth();

  return (
    <div className="pt-28 px-10 pb-20">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-lg">No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow">
              <img src={item.image} className="h-40 w-full object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
              <p className="text-purple-700 font-bold">₹ {item.price}</p>

              <button
                onClick={() => removeFromWishlist(item._id)}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
