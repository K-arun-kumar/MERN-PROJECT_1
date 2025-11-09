// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";
// import { FaUserCircle } from "react-icons/fa";

// export default function Profile() {
//   const { user } = useAuth();
//   const [form, setForm] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const saveProfile = () => {
//     // ✅ Add API logic here if backend active
//     alert("Profile Updated ✅");
//   };

//   return (
//     <div className="pt-28 px-6 pb-16 flex justify-center">
//       <div className="max-w-xl w-full bg-white rounded-lg shadow p-6 border border-green-200">
//         <div className="flex items-center gap-4 mb-6">
//           <FaUserCircle className="text-green-600 text-5xl" />
//           <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
//         </div>

//         <div className="space-y-4">
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className="border border-green-300 p-2 w-full rounded"
//             placeholder="Your Name"
//           />

//           <input
//             name="email"
//             value={form.email}
//             disabled
//             className="border border-green-300 p-2 w-full rounded bg-gray-200 cursor-not-allowed"
//           />

//           <button
//             onClick={saveProfile}
//             className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

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
