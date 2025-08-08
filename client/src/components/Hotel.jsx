import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Hotel = () => {
  const [posts, setPosts] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});

  const handleAPI = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
      );
      setPosts(response.data.posts); // ✅ fixed: setPost → setPosts
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAPI();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        posts.forEach((post) => { // ✅ fixed: post → posts
          const currentIndex = newIndexes[post._id] || 0;
          newIndexes[post._id] = (currentIndex + 1) % post.images.length;
        });
        return newIndexes; // ✅ fixed: return newIndexes
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [posts]);

  return (
<div className="container mx-auto mt-1px-4">
  <h2 className="text-3xl font-bold  text-center text-green-700  pb-2 ">
    Popular Hotels
  </h2>
  <p className="text-center text-gray-600 mb-2 max-w-xl mx-auto">
  Comfort, convenience, and rave reviews — explore our most popular hotels.
</p>

 <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000} className="gap-4">
  {posts.map((hotel) => (
    <div key={hotel._id} className="bg-white shadow rounded-md p-3 mx-1 w-[280px]">
      <img
        src={hotel.images[imageIndexes[hotel._id]]}
        alt={hotel.name}
        className="w-full h-48 object-cover rounded-md mb-2 transition-transform duration-300 hover:scale-105"
      />
      <div className="text-center">
        <Link
          to={`product/${hotel.slug}`}
          className="text-base font-medium text-green-600 hover:underline"
        >
          {hotel.title}
        </Link>
      </div>
    </div>
  ))}
</Carousel>

</div>

  );
};

export default Hotel;
