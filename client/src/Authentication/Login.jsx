import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


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
  console.log("normal user detected"); // ⬅️ Add this
  navigate("/");
}



      // ✅ Redirect to products page
    

    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Login failed. Try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow-lg rounded w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        {errorMsg && (
          <p className="text-red-600 text-center mb-3 font-medium">{errorMsg}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-500">
          Login
        </button>

        <p className="text-center mt-3 text-sm">
          Not Registered?{" "}
          <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
