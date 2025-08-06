import express from "express";
import { createCategotyController } from "../controllers/Category.js";
const app = express.Router();



app.post('/create-category',createCategotyController)

export default app;
