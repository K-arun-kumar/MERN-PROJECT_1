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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-3">Edit Product</h2>

        <form onSubmit={handleUpdateProduct} className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Product Name"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Price"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Category"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full h-20"
            placeholder="Description"
          />

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Image URL"
          />

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Stock Quantity"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditProduct(null)}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>

            <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
