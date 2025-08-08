import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./src/config/db.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import dns from "dns";

// Set custom DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

// Routes
import authRoutes from "./src/routes/User.js";
import postRoutes from "./src/routes/Post.js";
import categoryRoutes from "./src/routes/Category.js";

connectToDB();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  console.log("Welcome");
  res.send("Welcome to the Hotel Booking ");
});

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/category", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
