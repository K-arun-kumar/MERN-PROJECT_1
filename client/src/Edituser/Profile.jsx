import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Profile() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  });

  // ✅ Load user profile from localStorage (if exists)
  useEffect(() => {
    if (!user) return;

    const saved = localStorage.getItem(`profile_${user._id}`);
    if (saved) {
      setForm(JSON.parse(saved));
    } else {
      // Default email from login if new user
      setForm((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Save to LocalStorage
  const saveProfile = () => {
    if (!user) return;

    localStorage.setItem(`profile_${user._id}`, JSON.stringify(form));
    toast.success("Profile Saved ✅");
  };

  // ✅ Remove user’s saved local profile
  const deleteProfileFromLocal = () => {
    if (!user) return;

    localStorage.removeItem(`profile_${user._id}`);
    setForm({
      firstName: "",
      address: "",
      city: "",
      phone: "",
      email: user.email,
    });

    toast.info("Profile Removed ❌");
  };

  return (
    <div className="pt-28 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6 border">
        <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>

        <div className="space-y-4">
          <input
            name="firstName"
            placeholder="Your Name"
            className="border p-3 rounded w-full"
            value={form.firstName}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            className="border p-3 rounded w-full"
            value={form.address}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            className="border p-3 rounded w-full"
            value={form.city}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            className="border p-3 rounded w-full"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email Address"
            className="border p-3 rounded w-full bg-gray-100"
            value={form.email}
            disabled
          />

          <button
            onClick={saveProfile}
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700"
          >
            Save Changes
          </button>

          <button
            onClick={deleteProfileFromLocal}
            className="text-red-600 underline mt-3 block text-center"
          >
            Remove Saved Details
          </button>
        </div>
      </div>
    </div>
  );
}
