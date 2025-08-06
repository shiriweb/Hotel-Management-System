import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserRoutes from "./components/routes/Private";
import AdminRoutes from "./components/routes/Admin";
import UserDashboard from "./pages/user/UserDashboard";
import MyBooking from "./pages/user/Mybooking";
import Dashboard from "./pages/admin/Dashboard";
const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          
          
          {/* User Routing */}
          <Route path="/user" element={<UserRoutes />}>
            <Route path="" element={<UserDashboard />} />
            <Route path='your-order' element={<MyBooking/>}/>
          </Route>


          {/* Admin Routing */}
          <Route path="/admin" element={<AdminRoutes />}>
            <Route path="" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
