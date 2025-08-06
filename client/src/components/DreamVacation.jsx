import React from "react";
import Image1 from "../assets/Post/image1.jpg";
import Image2 from "../assets/Post/image2.jpg";
import Image3 from "../assets/Post/image3.jpg";
import Image4 from "../assets/Post/image4.jpg";

const DreamVacation = () => {
  const destinations = [
    { image: Image1, name: "Pokhara", properties: 1111 },
    { image: Image2, name: "Kathmandu", properties: 2222 },
    { image: Image3, name: "Chitwan", properties: 3333 },
    { image: Image4, name: "Nagarkot", properties: 212 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-gray-900">
      {/* Title and paragraph */}
      <h1 className="text-3xl font-extrabold mb-3 text-center text-green-700">
        Enjoy Your Dream Vacation
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-lg mx-auto text-sm">
        Discover the most beautiful destinations, handpicked just for you. Explore stunning landscapes, vibrant culture, and unforgettable experiences.
      </p>

      {/* Destinations grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden cursor-pointer border border-gray-300 transition-shadow duration-300"
          >
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-36 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold mb-1">{destination.name}</h2>
              <p className="text-green-600 font-semibold text-sm">{destination.properties} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamVacation;
