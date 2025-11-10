import { useEffect, useState } from "react";
import axios from "axios";

const EditProductModal = ({ editProduct, setEditProduct, fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: "",
  });

  // ✅ Load data into form when modal opens
  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || "",
        price: editProduct.price || "",
        category: editProduct.category || "",
        description: editProduct.description || "",
        image: editProduct.image || "",
        stock: editProduct.stock || "",
      });
    }
  }, [editProduct]);

  if (!editProduct) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Update Product API Call
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/prd/updatePrd/${editProduct._id}`,
        formData
      );
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-2xl p-6 w-[420px] border border-green-200">

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-green-700 mb-5 text-center">
        Edit Product
      </h2>

      {/* FORM */}
      <form onSubmit={handleUpdateProduct} className="space-y-4">

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="border border-green-300 focus:border-green-500 focus:ring-2 
            focus:ring-green-200 w-full p-2 rounded-md outline-none"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="border border-green-300 focus:border-green-500 focus:ring-2 
            focus:ring-green-200 w-full p-2 rounded-md outline-none"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="border border-green-300 focus:border-green-500 focus:ring-2 
            focus:ring-green-200 w-full p-2 rounded-md outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="border border-green-300 focus:border-green-500 focus:ring-2 
            focus:ring-green-200 w-full p-2 rounded-md outline-none h-24"
          />
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="border border-green-300 focus:border-green-500 focus:ring-2 
            focus:ring-green-200 w-full p-2 rounded-md outline-none"
          />
        </div>

        {/* STOCK */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Stock Quantity
          </label>
          <input
            type="text"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock qty"
            className="border border-green-300 focus:border-green-500 focus:ring-2 
            focus:ring-green-200 w-full p-2 rounded-md outline-none"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() => setEditProduct(null)}
            className="px-4 py-2 border border-gray-400 text-gray-600 
            rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white font-medium 
            rounded-md hover:bg-green-700 transition shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}

  

export default EditProductModal;
