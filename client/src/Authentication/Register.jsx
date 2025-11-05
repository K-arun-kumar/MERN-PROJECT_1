import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="p-6 bg-white shadow-lg rounded w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <input name="name" placeholder="Name" className="border p-2 w-full mb-3" onChange={handleChange}/>
        <input name="email" placeholder="Email" className="border p-2 w-full mb-3" onChange={handleChange}/>
        <input name="password" type="password" placeholder="Password" className="border p-2 w-full mb-3" onChange={handleChange}/>

        <button className="bg-green-600 text-white p-2 w-full rounded hover:bg-green-500">Register</button>

        {errorMsg && <p className="text-red-600 text-center mt-2">{errorMsg}</p>}

        <p className="text-center mt-3 text-sm">
          Already have account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
