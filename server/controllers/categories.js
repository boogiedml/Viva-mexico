import Category from "../models/category.js";
import { v2 as cloudinary } from "cloudinary";

const getAllCategories = async (req, res) => {
  try {
    const categoryList = await Category.find({});

    if (!categoryList || categoryList.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No categories found! 😢",
      });
    }

    res.status(200).json({
      error: false,
      categoryList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error 😡",
    });
  }
};

const addCategory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "No image in the request 😡",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const category = new Category({
      name: req.body.name,
      categoryType: req.body.categoryType,
    });

    const createdCategory = await category.save();
    if (!createdCategory) {
      return res.status(500).json({
        error: true,
        message: "The category cannot be created 😡",
      });
    }

    createdCategory.image = result.secure_url;
    await createdCategory.save();

    res.status(201).json({
      error: false,
      createdCategory,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        error: true,
        message: "Category name already exists 🤪",
      });
    } else {
      console.error(error);
      res.status(500).json({
        error: true,
        message: "Internal server error 😡",
      });
    }
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (deletedCategory) {
      return res.status(204).send();
    } else {
      return res.status(404).json({
        error: true,
        message: "Category not found! 😡",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error 😡",
    });
  }
};

export { getAllCategories, addCategory, deleteCategory };
