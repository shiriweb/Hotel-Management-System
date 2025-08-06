import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // BAsic Validatiron
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        { name, email, password }
      );
      toast.success("SUccessfully registered");
      navigate("/login");
    } catch (error) {
      setError("Register failed");
      toast.error("Register failed please try again");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-2">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-3 text-red-600 text-sm text-center">{error}</div>
          )}
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1" htmlFor="">
              Name
            </label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1" htmlFor="">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1" htmlFor="">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="********"
            />
          </div>
      
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-1.5 rounded-full font-medium text-sm hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-xs mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
