import express from "express";
import {
  createCategotyController,
  getAllCategory,
  updateCategoryController,
  deleteCategory,singleCategory
} from "../controllers/Category.js";
const app = express.Router();

app.post("/create-category", createCategotyController);
app.get("/get-category",  getAllCategory);
app.put(
  "/update-category/:id",

  updateCategoryController
);
app.delete("/delete-category/:id",  deleteCategory);
app.get("/single-category:slug", singleCategory);
export default app;
