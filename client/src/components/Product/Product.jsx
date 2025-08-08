import React, { useEffect, useState } from "react";
import {
  FaWifi,
  FaBriefcase,
  FaSwimmingPool,
  FaCar,
  FaStar,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import Spinner from "../Spinner";
import { useParams } from "react-router-dom";
const Product = () => {
  const params = useParams();
  const [postDetails, setPostDetails] = useState(null);
  console.log("post details", postDetails);

  const handlePostDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/post/get-post/${params.slug}`
      );
      console.log("API response:", response.data); 
      setPostDetails(response.data.post);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlePostDetails();
  }, []);
  return <div>Product</div>;
};

export default Product;
