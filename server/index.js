import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./src/config/db.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

dotenv.config();

// Routes import
import authRoutes from "./src/routes/User.js";
import postRoutes from "./src/routes/Post.js";
import categoryRoutes from "./src/routes/Category.js";

// Database connection - now environment variables are available
connectToDB();
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;
app.get("/", (req, res) => {
  console.log("Welcome");
  res.send("Welcome to the Hotel Booking ");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/category", categoryRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
