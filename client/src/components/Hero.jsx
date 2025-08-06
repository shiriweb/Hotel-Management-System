// Hero.jsx
import React from "react";
import heroImage from "../assets/heroImage.png";

const Hero = () => {
  return (
    <div
      className="relative h-[100vh] md:h-[85vh] flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white overflow-hidden"
      style={{ scrollMarginTop: "64px" }} // optional for anchor links
    >
      {/* Blurred background image with lighter blur */}
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-[2px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      {/* Overlay to dim the image */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content on top */}
      <div className="relative z-10 max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg">
          Ensuring Comfort in Every Destination
        </h1>
        <p className="text-base md:text-lg drop-shadow-md">
          Our platform is your gateway to the finest luxury accommodations
          worldwide, delivering exceptional comfort and unmatched service
        </p>
      </div>

      {/* Search Box */}
      <div className="mt-6 flex w-full max-w-md overflow-hidden rounded-md shadow-lg bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
        <input
          className="flex-grow px-4 py-3 bg-white/90 text-gray-800 placeholder-gray-500 rounded-l-md border border-transparent shadow-inner ring-1 ring-white/30 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1 transition duration-200 placeholder-opacity-80"
          type="text"
          placeholder="Search destinations"
          aria-label="Search input"
        />
        <button
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-r-md shadow transition focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Hero;
