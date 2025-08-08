import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserRoutes from "./components/routes/Private";
import AdminRoutes from "./components/routes/Admin";
import UserDashboard from "./pages/user/UserDashboard";
import Dashboard from "./pages/admin/Dashboard";
import MyBooking from "./pages/user/MyBooking";
import AdminDetails from "./pages/admin/AdminDetails";
import CreatePost from "./pages/admin/CreatePost";
import CreateCategory from "./pages/admin/CreateCategory";
import AllPosts from "./pages/admin/AllPosts";
import ProductDetails from "./pages/user/ProductDetails";
const App = () => {

  return (
    <>
    <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:slug" element={<ProductDetails />} />

          {/* User Routing */}
          <Route path="/user" element={<UserRoutes />}>
            <Route path="" element={<UserDashboard />} />
            <Route path='your-order' element={<MyBooking/>}/>
          </Route>


          {/* Admin Routing */}
          <Route path="/admin" element={<AdminRoutes />}>
            <Route path="" element={<Dashboard />} />
            {/* <Route path="details" element={<AdminDetails />} /> */}
            <Route path="create-post" element={<CreatePost />} />
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="all-posts" element={<AllPosts />} />
          </Route>
        </Routes>
      </>
  );
};

export default App;
