import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import EditProductModal from "../components/admin/EditProductModel";
import { AgGridReact } from "ag-grid-react";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

/* ✅ FRESHMINT THEME */
const myTheme = themeQuartz.withParams({
  spacing: 6,
  fontSize: 15,
  textColor: "#173f31",
  foregroundColor: "#0E8F61",
  headerBackgroundColor: "#D9F6E7",
  backgroundColor: "#ffffff",
  rowHoverColor: "#EBFFF5",
});
myTheme.tableBorderRadius = "10px";
myTheme.shadow = "0px 3px 12px rgba(0,0,0,0.06)";

const AdminDashboard = () => {
  const gridRef = useRef();
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  /* ✅ NEW — CATEGORY FILTER STATE */
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/prd/getPrd");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`http://localhost:3000/prd/deletePrd/${id}`);
    fetchProducts();
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
    };
    await axios.post("http://localhost:3000/prd/createPrd", payload);
    setShowForm(false);
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      stock: "",
    });
    fetchProducts();
  };

  /* ✅ APPLY CATEGORY + SEARCH FILTER */
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = selectedCategory
      ? p.category === selectedCategory
      : true;
    return matchSearch && matchCategory;
  });

  /* ✅ GRID COLUMNS */
  const columns = useMemo(
    () => [
      {
        headerName: "Image",
        field: "image",
        width: 140,
        cellRenderer: (params) => (
          <img
            src={params.value}
            className="w-20 h-20 rounded-md border object-cover shadow items-center justify-center"
          />
        ),
      },
      { field: "name", width: 200 },
      { field: "category", width: 150 },
      { field: "price", width: 110, valueFormatter: (p) => `₹${p.value}` },
      { field: "stock", width: 100 },
      { field: "description", flex: 1 },
      {
        headerName: "Actions",
        width: 220,
        cellRenderer: (p) => (
          <div className="flex justify-center gap-2 items-center">
            <button
              onClick={() => setEditProduct(p.data)}
              className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
            >
              Edit <FaUserEdit />
            </button>
            <button
              onClick={() => deleteProduct(p.data._id)}
              className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
            >
              Delete <MdDelete />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    cellStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
  };

  const handleRefresh = () => {
    setSearchText("");
    setSelectedCategory("");
    fetchProducts();
  };

  return (
    <div className="flex min-h-screen bg-[#E8FFF4] ">
      {/* ✅ SIDEBAR */}
      <aside className="w-64 bg-white shadow-xl border-r">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-green-700">GreenLeaf🌿</h2>
          <span className="text-2xl font-bold text-black-700">Admin Panel</span>
          <p className="text-sm text-gray-500">Product Management</p>
        </div>

        <ul className="p-5 space-y-2 text-[16px] font-medium">
          <li className="bg-green-50 text-green-700 px-4 py-2 rounded cursor-pointer hover:bg-green-100">
            Dashboard
          </li>
          <li className="hover:bg-green-50 px-4 py-2 rounded cursor-pointer">
            Orders
          </li>
          <li className="hover:bg-green-50 px-4 py-2 rounded cursor-pointer">
            Settings
          </li>
        </ul>
      </aside>

      {/* ✅ MAIN */}
      <main className="flex-1 px-8 py-6">
        {/* TOP */}
        {/* ✅ PAGE TITLE */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-green-800">Products</h1>
        </div>

        {/* ✅ SEARCH + FILTER + BUTTONS */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {/* LEFT SEARCH + CATEGORY */}
          <div className="flex flex-wrap gap-3">
            <input
              className="border p-2 rounded w-72 outline-green-600"
              placeholder="Search product..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2 rounded w-48"
            >
              <option value="all">All Categories</option>
              <option value="fruits">Fruits&Vegetables</option>
              <option value="dairy">Dairy</option>
              <option value="snacks">Snacks</option>
              <option value="beverages">Beverages</option>
            </select>
          </div>

          {/* ✅ RIGHT SIDE BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Refresh 🔄
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* ✅ GRID */}
        <div
          className="ag-theme-quartz rounded-xl shadow border border-gray-200"
          style={{ height: "650px", marginTop: "10px", background: "#ffffff" }}
        >
          <AgGridReact
            rowData={filtered}
            columnDefs={columns}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={12}
            paginationPageSizeSelector={[12, 20, 50, 100]}
            rowHeight={90}
            gridOptions={{ theme: myTheme }}
          />
        </div>
      </main>

      {/* ✅ ADD PRODUCT MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-[420px] border border-green-200">
            {/* HEADER */}
            <h2 className="text-2xl font-bold text-green-700 mb-5 text-center">
              Add New Product
            </h2>

            {/* FORM */}
            <form onSubmit={handleAddProduct} className="space-y-4">
              {Object.keys(formData).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                    {field}
                  </label>

                  <input
                    name={field}
                    placeholder={`Enter ${field}`}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="border border-green-300 focus:border-green-500 focus:ring-2 
              focus:ring-green-200 w-full p-2 rounded-md outline-none"
                  />
                </div>
              ))}

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-400 text-gray-600 
            rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  className="px-4 py-2 bg-green-600 text-white font-medium 
            rounded-md hover:bg-green-700 transition shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <EditProductModal
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        fetchProducts={fetchProducts}
      />
    </div>
  );
};

export default AdminDashboard;
