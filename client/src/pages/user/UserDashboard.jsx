import React from "react";
import Navbar from "./Navbar";
import UserDetails from "./UserDetails";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="flex flex-row">
        <Navbar />
        <div className="flex-1 p-6">
          <UserDetails/>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
