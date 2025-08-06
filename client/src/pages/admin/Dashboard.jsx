import React from "react";
import Navbar from "./Navbar";
import AdminDetails from "./AdminDetails";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="pt-24 max-w-5xl mx-auto px-4">
        <Navbar />
        <div className="mt-8">
          <AdminDetails />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
