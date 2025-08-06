import CategoryModel from "../models/Category.js";
import slug from "slugify";
export const createCategotyController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        mmessage: "Name is required",
      });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
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
