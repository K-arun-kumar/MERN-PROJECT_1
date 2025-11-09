import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:3000/reg/loginReg", {
        email,
        password,
      });
      toast.success("Logged in successfully ✅");

      // ✅ Store in sessionStorage
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Save user into global AuthContext
      // ✅ Save user into global AuthContext
      login(res.data.user);

      console.log("User logged:", res.data.user); // ⬅️ Add this

      if (res.data.user.role === "admin") {
        console.log("admin detected"); // ⬅️ Add this
        navigate("/admin/dashboard");
      } else {
        console.log("normal user detected");
        // ⬅️ Add this
        navigate("/");
      }

      // ✅ Redirect to products page
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        toast.error(err.response?.data?.message || "Login Failed ❌");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F7FFF4] py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg flex overflow-hidden border border-green-200">
        {/* ✅ LEFT IMAGE SIDE */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://i.pinimg.com/736x/d3/a4/b1/d3a4b1d91e8bdc0840f4ee35189d2f68.jpg"
            alt="Login Banner"
            className="w-full h-full object-cover rounded-l-3xl"
          />
        </div>

        {/* ✅ RIGHT FORM SECTION */}
        <div className="w-full md:w-1/2 px-10 py-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="flex justify-center mb-4 text-3xl font-extrabold tracking-wide text-gray-800 group-hover:text-green-600 transition-all duration-200">
              <span className="w-12 h-12" />
              GreenLeaf🌿
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Login
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Please enter your email and password.
          </p>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-gray-700 text-sm">Email</label>
              <input
                type="email"
                placeholder="e.g., john@gmail.com"
                className="border border-green-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-gray-700 text-sm">Password</label>
              <input
                type="password"
                placeholder="******"
                className="border border-green-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Remember me
              </label>

              <button className="text-green-700 hover:underline">
                Forgot password?
              </button>
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg font-medium transition">
              Sign In
            </button>
          </form>

          {/* Divider */}
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
  <span className="text-sm font-medium">
    Sign in with Google
  </span>
</button>

          {/* Signup link */}
          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-700 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
