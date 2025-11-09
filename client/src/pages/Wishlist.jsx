

import { useAuth } from "../context/AuthContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist,addToCart} = useAuth();

  // const handleAddToCart = (product) => {
  //       if (!user) {
  //         toast.warning("Please login to add products to cart");
  //         return navigate("/login");
  //       }
  //       addToCart(product);
  //       toast.success("Added to cart ✅");
  //     };

  return (
    <div className="pt-28 px-6 pb-20 bg-white flex justify-center">

  <div className="w-full max-w-5xl">

    {/* ✅ Title */}
    <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
      Wishlist
    </h1>

    {!wishlist || wishlist.length === 0 ? (
      <p className="text-gray-500 text-lg text-center">No items in wishlist.</p>
    ) : (
      <div className="overflow-x-auto border border-green-300 rounded-xl">

        {/* ✅ TABLE HEADER */}
        <div className="grid grid-cols-4 bg-green-500 text-white font-semibold text-sm py-3 px-4 rounded-t-xl">
          <p className="">Product</p>
          <p>Price</p>
          <p>Status</p>
          <p className="text-right">Action</p>
        </div>

        {/* ✅ TABLE ROWS */}
        {wishlist.map((item) => (
          <div
            key={item.product._id}
            className="grid grid-cols-4 items-center text-sm border-b hover:bg-green-50 transition px-4 py-4"
          >
            {/* ✅ Product Info */}
            <div className="flex items-center gap-3">
              <img
                src={item.product.image}
                className="w-12 h-12 object-contain rounded border"
              />
              <div>
                <p className="font-medium text-gray-800">
                  {item.product.name}
                </p>
               
              </div>
            </div>

            {/* ✅ Price */}
            <p className="text-gray-700 font-semibold">
              ₹ {item.product.price}
            </p>

            {/* ✅ Stock */}
            <p className="text-green-600 font-medium">
              In Stock
            </p>

            {/* ✅ Actions */}
            <div className="flex justify-end gap-2">

              {/* ✅ Add to Cart */}
              <button
               onClick={(e) => {
                 e.stopPropagation();
                addToCart(item.product);
              }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm transition"
              >
                Add to Cart
              </button>

              {/* ✅ Remove Button */}
              <button
                onClick={() => removeFromWishlist(item.product._id)}
                className="border border-red-600 text-black-600 hover:bg-red-500 px-3 py-1.5 rounded-md text-sm transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* ✅ Footer Info Row */}
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

      <div className="flex flex-col items-center">
        <p className="font-semibold">Free Shipping</p>
        <p className="text-sm text-gray-600">
          Free shipping for orders above ₹500
        </p>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-semibold">Flexible Payment</p>
        <p className="text-sm text-gray-600">
          Multiple secure payment options
        </p>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-semibold">24×7 Support</p>
        <p className="text-sm text-gray-600">
          We’re here to help anytime
        </p>
      </div>

    </div>
  </div>
</div>

  );
}
