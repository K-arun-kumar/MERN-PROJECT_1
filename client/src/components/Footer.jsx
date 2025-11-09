import React from "react";
import { Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
  <footer className="w-full bg-black text-white pt-16 pb-6">
    <div className="px-6 md:px-20">

      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-10">
        
        {/* Column 1 - Subscribe */}
        <div>
          <h2 className="text-xl font-bold mb-4">FreshMint Organics</h2>
          <h3 className="text-base font-semibold mb-2">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get 10% off your first organic order 🌱
          </p>
          <div className="flex items-center bg-transparent border border-gray-600 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-sm text-white px-3 py-2 w-full focus:outline-none"
            />
            <button className="bg-white text-black p-2 hover:bg-gray-200 transition">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Column 2 - Support */}
        <div>
          <h3 className="text-base font-semibold mb-4">Support</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            123 Organic Street, Green City, India
          </p>
          <p className="text-gray-400 text-sm mb-1">support@freshmint.com</p>
          <p className="text-gray-400 text-sm">+91 98765-43210</p>
        </div>

        {/* Column 3 - Account */}
        <div>
          <h3 className="text-base font-semibold mb-4">Account</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/my-account" className="hover:text-white">My Account</a></li>
            <li><a href="/login" className="hover:text-white">Login / Register</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/wishlist" className="hover:text-white">Wishlist</a></li>
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
          </ul>
        </div>

        {/* Column 4 - Quick Links */}
        <div>
          <h3 className="text-base font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms Of Use</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Column 5 - Download App */}
        <div>
          <h3 className="text-base font-semibold mb-2">Download App</h3>
          <p className="text-gray-400 text-sm mb-3">
            Save ₹200 on your first app order
          </p>

          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://cbx-prod.b-cdn.net/COLOURBOX30227657.jpg?width=1200&height=1200&quality=70"
              alt="QR"
              className="w-16 h-16 rounded"
            />
            <div className="flex flex-col gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-8"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-8"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/share/1BMQYo6isG/" target="blank" className="hover:text-gray-400">
              <Facebook size={20} />
            </a>
            <a href="https://x.com/Flipkart?t=czvUYkz2fyUZX6fmIF0-pw&s=09" target="blank" className="hover:text-gray-400">
              <Twitter size={20} />
            </a>
            <a href="https://www.instagram.com/flipkart?igsh=NHgzbnMzaXdicHQ2" target="blank" className="hover:text-gray-400">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/flipkart/" target="blank" className="hover:text-gray-400">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} FreshMint Organics. All rights reserved.
        </p>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
