import React from "react";
import { FaUser, FaPlus, FaList, FaFolder, FaMap } from "react-icons/fa";
import { Link } from "react-router-dom";

const navBarMenu = [
  { id: 1, name: "Admin Details", link: "/admin", icon: <FaUser /> },
  { id: 2, name: "Create Post", link: "/admin/create-post", icon: <FaPlus /> },
  { id: 3, name: "Posts List", link: "/admin/all-posts", icon: <FaList /> },
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
    <div className="bg-gray-800 text-white shadow-md p-4 w-64 h-screen">
      <nav className="flex flex-col space-y-2">
        {navBarMenu.map((item) => {
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
