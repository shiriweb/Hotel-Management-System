import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/UserContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleDropDownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleRedirect = () => {
    if (auth?.user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
    closeDropdown();
  };

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
    closeDropdown();
  };

  return (
    <nav className="bg-[#f5eee6] shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-green-600">
        <Link to="/">MyLogo</Link>
      </div>

      {/* Center: Navigation Links */}
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li>
          <Link to="/" className="hover:text-green-600">Home</Link>
        </li>
        <li>
          <Link to="/hotels" className="hover:text-green-600">Hotel</Link>
        </li>
        <li>
          <Link to="/experience" className="hover:text-green-600">Experience</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-green-600">About</Link>
        </li>
      </ul>

      {/* Right: User Icon + Dropdown */}
      <div className="relative cursor-pointer text-gray-700 hover:text-green-600">
        <FaUser size={24} onClick={handleDropDownToggle} />

        {isDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50"
            onMouseLeave={closeDropdown}
          >
            <ul>
              {auth?.user ? (
                <>
                  <li
                    onClick={handleRedirect}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </li>
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                  >
                    Sign Out
                  </li>
                </>
              ) : (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={closeDropdown}
                >
                  <Link to="/login">Sign In</Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
