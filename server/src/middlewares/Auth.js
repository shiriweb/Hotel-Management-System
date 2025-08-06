import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Product route based on token

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    const decode = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("Auth error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Admin middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(403).send("Access denied. Admins only.");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
