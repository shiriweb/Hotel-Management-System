import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
const AllPosts = () => {
  const [postData, setPostData] = useState([]);
  console.log("dddddddd", postData);
  const handleAPI = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
      );
      setPostData(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleAPI();
  }, []);
  () => {
    handleAPI();
  },
    [];

  return (
    <div>
      <Navbar />
      <div>All Posts</div>
    </div>
  );
};

export default AllPosts;
