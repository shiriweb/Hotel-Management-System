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
    <div className="bg-white border-b border-gray-200">
      <nav className="max-w-4xl mx-auto flex gap-4 px-4 py-3">
        {navbarMenu.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.link}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
