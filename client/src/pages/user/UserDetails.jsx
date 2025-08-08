import React from "react";
import { useAuth } from "../../context/UserContext";

const UserDetails = () => {
  const [auth] = useAuth();
  const users = {
    name: auth.user?.name,
    email: auth.user?.email,
  };

  return (
    <div className="bg-white p-8 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Details</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="text-lg font-medium text-gray-600 w-20">Name:</span>
          <span className="text-lg text-gray-800 ml-4">{users.name}</span>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-medium text-gray-600 w-20">Email:</span>
          <span className="text-lg text-gray-800 ml-4">{users.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
