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

// const myTheme = themeQuartz.withParams({
//   spacing: 5,
//   foregroundColor: "rgb(12, 140, 116)",
//   headerBackgroundColor: "rgb(99, 239, 227)",
//   backgroundColor: "rgb(211, 246, 239)",
//   rowHoverColor: "lightgreen",
//   textColor: "black",
//   fontSize: 16,
// });
const myTheme = themeQuartz.withParams({
  spacing: 6,
  fontSize: 15,

  // Text & Accent
  textColor: "#1E3A33",          // Deep readable green (professional)
  foregroundColor: "#2E7D6B",    // Accent elements (buttons, highlights)

  // Backgrounds
  backgroundColor: "linear-gradient(135deg, #E8FFF4, #C9F6DD)", // ✅ Soft gradient background
  headerBackgroundColor: "#D7F2E3",  // Softer pastel green table header

  // Table Hover
  rowHoverColor: "#ECFDF4",      // Extremely subtle hover tone (premium feel)
});
myTheme.tableBorderRadius = "12px";
myTheme.shadow = "0px 2px 8px rgba(0,0,0,0.08)";


const AdminDashboard = () => {
  const gridRef = useRef();
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
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
    if (!window.confirm("Are you sure to delete this product?")) return;
    await axios.delete(`http://localhost:3000/prd/deletePrd/${id}`);
    fetchProducts();
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
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

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = useMemo(
    () => [
      {
        headerName: "Image",
        field: "image",
        cellStyle: { display: "flex", justifyContent: "center" },
        cellRenderer: (params) => (
          <div className="flex justify-center">
          <img
            src={params.value}
            className="w-24 h-24 object-cover rounded-md  border shadow-sm"
          />
          </div>
        ),
        width: 160,
      },
      { field: "name", width: 180 },
      { field: "category", width: 150 },
      { field: "price", width: 120 },
      { field: "stock", width: 120 },
      { field: "description", flex: 1 },
      {
        headerName: "Actions",
        width: 200,
        cellRenderer: (p) => (
          <div className="flex gap-2 justify-center">
           <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1 cursor-pointer transition-all"

              onClick={() => setEditProduct(p.data)}
            >
              Edit <FaUserEdit />
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1 cursor-pointer transition-all"

              onClick={() => deleteProduct(p.data._id)}
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
    },
  };

  return (
    <div className="flex min-h-screen bg-green-200">
      {/* ✅ SIDEBAR */}
      <aside className="w-60 bg-white shadow-xl p-6 border-r border-gray-900">
  <h2 className="text-2xl font-semibold mb-8 text-blue-500">Admin Panel</h2>
  <ul className="space-y-4 text-lg">
    <li className="font-semibold text-blue-600 cursor-pointer">Dashboard</li>
    <li className="text-gray-700 hover:text-blue-600 transition cursor-pointer">Users</li>
    <li className="text-gray-700 hover:text-blue-600 transition cursor-pointer">Orders</li>
  </ul>
</aside>


      {/* ✅ MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-semibold ">Products</h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-amber-500 cursor-pointer"
          >
            + Add Product
          </button>
        </div>

        {/* ✅ SEARCH & REFRESH */}
        <div className="flex justify-between mb-4">
          <input
            className="border p-2 rounded w-72"
            placeholder="Search product..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={fetchProducts}
            className="bg-green-300 text-white px-4 py-2  rounded  hover:bg-amber-500 cursor-pointer"
          >
            Refresh 🔄
          </button>
        </div>

        {/* ✅ DATA TABLE */}
        <div
          className="ag-theme-quartz shadow-xl rounded-xl border border-gray-200"
          style={{
            height: "670px",
            padding: "12px",
            background: "#ffffff",
          }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={filteredProducts}
            columnDefs={columns}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={15}
            rowHeight={110}
            gridOptions={{ theme: myTheme }}
          />
        </div>
      </main>

      {/* ✅ ADD PRODUCT MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-96 rounded shadow">
            <h2 className="text-xl font-semibold mb-3">Add Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-3">
              {Object.keys(formData).map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              ))}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-3 py-1 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded">
                  Save
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
