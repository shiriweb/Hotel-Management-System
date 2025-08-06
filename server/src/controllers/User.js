import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {

  try {
    console.log("Register payload:", req.body);

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.status(200).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
    });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {}
};
