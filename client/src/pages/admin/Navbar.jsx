import React from "react";
import { FaUser, FaPlus, FaList, FaFolder, FaMap } from "react-icons/fa";
import { Link } from "react-router-dom";

const navBarMenu = [
  { id: 1, name: "Admin Details", link: "/admin/details", icon: <FaUser /> },
  { id: 2, name: "Create Post", link: "/admin/create-post", icon: <FaPlus /> },
  { id: 3, name: "Posts List", link: "/admin/all-posta", icon: <FaList /> },
  {
    id: 4,
    name: "Create Category",
    link: "/admin/create-category",
    icon: <FaFolder />,
  },
  { id: 5, name: "All Bookings", link: "/admin/all-booking", icon: <FaMap /> },
];

const Navbar = () => {
  return (
    <div className="bg-white shadow-md p-4">
      <nav className="flex flex-col space-y-2">
        {navBarMenu.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.link}
              className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition"
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
