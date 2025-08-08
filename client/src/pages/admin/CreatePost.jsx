import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/UserContext";
import Navbar from "./Navbar";

const CreatePost = () => {
  const [auth] = useAuth();
  const [title, setTitle] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState("");
  const [nearArea, setNearArea] = useState("");
  const [category, setCategory] = useState([]); // fixed: should be array
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
  const [guest, setGuest] = useState("");
  const [price, setPrice] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategory(response.data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.warn("You can only upload a maximum of 3 images");
      return;
    } else {
      setImages(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !hotelLocation ||
      !description ||
      !facilities ||
      !nearArea ||
      !selectedCategory ||
      !guest
    ) {
      toast.error("Please fill all fields");
      return;
    }
    if (images.length !== 3) {
      toast.error("Please upload exactly 3 images");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("hotelLocation", hotelLocation);
    formData.append("description", description);
    formData.append("facilities", facilities);
    formData.append("nearArea", nearArea);
    formData.append("category", selectedCategory);
    formData.append("guest", guest);
    formData.append("price", price);
    formData.append("isAvailable", isAvailable);

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/create-post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Post created successfully");
      setTitle("");
      setHotelLocation("");
      setDescription("");
      setFacilities("");
      setNearArea("");
      setSelectedCategory("");
      setImages([]);
      setGuest("");
      setPrice("");
      setIsAvailable(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navbar */}
      <div className="w-1/5 min-h-screen  ">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="w-234 p-6 ml-6 bg-[#f5f5f5]">
        <div className="bg-white shadow-md p-6 rounded-lg w-full">
          <h1 className="text-2xl font-semibold mb-6">Create Post</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Hotel Location"
              value={hotelLocation}
              onChange={(e) => setHotelLocation(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Facilities"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Near Area"
              value={nearArea}
              onChange={(e) => setNearArea(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />{" "}
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a category</option>
                {category?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Guests</label>
              <select
                id="guest"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select guest number</option>
                {[...Array(6)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Availability</label>
              <select
                id="isAvailable"
                value={isAvailable}
                onChange={(e) => setIsAvailable(e.target.value === "true")}
                className="w-full p-2 border rounded"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <FaImage />
                <span className="text-sm">Upload Images (max 3)</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              <div className="flex gap-2 mt-2">
                {images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Submit Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
