import React from "react";
import { FaUser, FaPlus, FaList, FaFolder, FaMap } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarMenu = [
    {
      id: 1,
      name: "User Details",
      link: "/user",
      icon: <FaUser />,
    },
    {
      id: 2,
      name: "Your Order",
      link: "/user/your-order",
      icon: <FaList />,
    },
  ];
  return (
    <div className="bg-gray-800 text-white shadow-md p-4 w-64 h-screen">
      <nav className="flex flex-col space-y-2">
        {navbarMenu.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.link}
              className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
