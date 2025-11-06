import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout, cart, wishlist, searchText, setSearchText } = useAuth();
  // --- add this near top inside Navbar ---
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      window.location.href = `/shop?search=${search}`;
    }
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-gray-100 text-sm text-gray-600 px-6 py-2 flex justify-between">
        <div className="flex gap-4">
          <Link to="#" className="hover:text-blue-600">
            About Us
          </Link>
          <Link to="#" className="hover:text-blue-600">
            My Account
          </Link>
          <Link to="wishlist" className="hover:text-blue-600">
            Wishlist
          </Link>
        </div>
        <span>
          We deliver everyday from{" "}
          <span className="text-red-600 font-semibold">7:00 to 23:00</span>
        </span>
      </div>

      {/* Logo + Search + Icons */}
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-blue-600">
          ShopStore
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center w-1/2 border rounded-full px-4 py-2 bg-gray-100">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
          <FaSearch
            className="text-gray-600 text-lg cursor-pointer"
            onClick={() => (window.location.href = `/shop?search=${search}`)}
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-gray-700 text-lg">
          {/* Login / Account */}
          <Link
            to={!user ? "/login" : "/account"}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <FaUser size={20} />
            <span className="text-sm font-medium">
              {user ? user.name : "Login"}
            </span>
          </Link>
          <Link to="/wishlist" className="relative hover:text-blue-600">
            <FaHeart size={30} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative  hover:text-blue-600">
            <FaShoppingCart size={30} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Mobile Toggle */}
          <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Category Menu */}
      <div className="bg-white border-t px-6 py-3 hidden md:flex gap-6 text-gray-700 font-medium items-center">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>

        {/* Dropdown Category */}
        <div
          className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link
            to="/shop"
            className="hover:text-blue-600 flex items-center gap-1"
          >
            Shop ▼
          </Link>

          {dropdownOpen && (
            <div className="absolute top-6 left-0 bg-white shadow-lg border rounded-md w-48 py-2 z-50">
              <Link
                to="/shop?category=fruits"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Fruits & Vegetables
              </Link>
              <Link
                to="/shop?category=beverages"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Beverages
              </Link>
              <Link
                to="/shop?category=snacks"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Snacks
              </Link>
              <Link
                to="/shop?category=dairy"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dairy
              </Link>
            </div>
          )}
        </div>

        <Link to="/blog" className="hover:text-blue-600">
          Blog
        </Link>
        <Link to="/contact" className="hover:text-blue-600">
          Contact
        </Link>

        {user && (
          <Button variant="outline" className="ml-auto" onClick={logout}>
            Logout
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-4 text-gray-700 font-medium px-6 pb-4">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          {/* Dropdown for Mobile */}
          <details className="cursor-pointer">
            <summary className="py-1">Shop</summary>
            <ul className="ml-4 flex flex-col gap-2">
              <Link
                to="//shop?category=fruits"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Fruits & Vegetables
              </Link>
              <Link
                to="/shop?category=beverages"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Beverages
              </Link>
              <Link
                to="/shop?category=snacks"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Snacks
              </Link>
              <Link
                to="/shop?category=dairy"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dairy
              </Link>
            </ul>
          </details>

          {!user ? (
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button className="w-full">Login</Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              Logout
            </Button>
          )}
        </ul>
      )}
    </nav>
  );
}
