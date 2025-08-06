import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password }
      );
      toast.success("Successfully logged in");
      setAuth({
        ...auth,
        user: response.data?.user,
        token: response.data?.token,
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Login failed please try again");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center px-2">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1" htmlFor="">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center gap-1">
              <input
                className="h-3 w-3 rounded border-gray-300 focus:ring-green-500"
                type="checkbox"
                name=""
                id=""
              />
              <span>Keep me signed in</span>
            </label>
            <a href="" className="text-green-600 hover:underline font-medium">
              Forget Password
            </a>
          </div>

          {error && <p className="text-red-500 text-sm my-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-1.5 rounded-full font-medium text-sm hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-xs mt-4">
          Dont have an account?{" "}
          <a
            href="/register"
            className="text-green-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
