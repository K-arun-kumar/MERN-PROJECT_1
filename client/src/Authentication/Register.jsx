import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await axios.post("http://localhost:3000/reg/createReg", form);
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden border border-green-200">
        <div className="grid md:grid-cols-2">
          {/* ✅ IMAGE SIDE */}
          <div className="hidden md:block">
            <img
              src="https://i.pinimg.com/736x/e6/66/3e/e6663e362c27c0e1531ac11821e44ce2.jpg"
              alt="Register Visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ✅ FORM SIDE */}
          <div className="p-10">
            <div className="flex justify-center mb-4 text-3xl font-extrabold tracking-wide text-gray-800 group-hover:text-green-600 transition-all duration-200">
              <span className="w-12 h-12" />
              GreenLeaf🌿
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
              Register
            </h2>

            <form onSubmit={handleRegister} className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                onChange={handleChange}
                autoComplete="name"
                required
              />

              <input
                name="email"
                placeholder="Email"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                onChange={handleChange}
                autoComplete="email"
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                onChange={handleChange}
                autoComplete="new-password"
                required
              />

              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition">
                Register
              </button>

              {errorMsg && (
                <p className="text-red-600 text-center font-medium">
                  {errorMsg}
                </p>
              )}
            </form>
            <div className="flex items-center my-5">
              <hr className="flex-grow border" />

              <span className="px-2 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border" />
            </div>

            {/* Google Button */}
            <button
              className="
    w-full py-3 border border-green-300 rounded-lg
    flex justify-center items-center gap-2
    hover:bg-green-50 transition
  "
            >
              <FcGoogle className="text-xl" />
              <span className="text-sm font-medium">Sign in with Google</span>
            </button>

            <p className="text-center mt-5 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
