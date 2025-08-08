import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  console.log("Category List", categories);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategories(response.data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryName.trim() === "") return;

    try {
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/category/update-category/${editId}`,
          { name: categoryName }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/category/create-category`,
          { name: categoryName }
        );
      }
      setCategoryName("");
      setEditId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/category/delete-category/${id}`
      );
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (id, name) => {
    setEditId(id);
    setCategoryName(name);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 min-h-screen">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="w-full bg-[#f5f5f5] p-6">
        {/* Form */}
        <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Create Category</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Category List */}
        <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md mt-6 mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center border-b pb-2">Categories</h2>
          <ul className="divide-y divide-gray-200">
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-center py-2"
              >
                <span className="text-gray-800 font-medium">{category.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category._id, category.name)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
