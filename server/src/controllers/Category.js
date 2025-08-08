import CategoryModel from "../models/Category.js";
import slugify from "slugify";
import slug from "slugify";
import {Post} from "../models/Post.js";
export const createCategotyController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({
        message: "Name is required",
      });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({
        message: "Category already exists",
      });
    }
    const newCategory = await new CategoryModel({
      name,
      slug: slug(name),
    }).save();
    return res.status(200).send({
      success: true,
      message: "Category has been created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error ehile creating category",
      error,
    });
  }
};
export const getAllCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};

export const singleCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const post = await Post.find({ category }).populate("category");

    return res.status(200).send({
      success: true,
      message: "Category fetched successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Category not found",
      error,
    });
  }
};
