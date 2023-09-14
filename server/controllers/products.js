import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import Category from "../models/category.js";
import Product from "../models/product.js";

const getAllProducts = async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    const productList = await Product.find(filter).populate("category");

    if (productList.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found! 😢",
      });
    }

    res.status(200).json({
      error: false,
      productList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error 😡",
    });
  }
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product)
    res.status(500).json({ error: true, message: "Product not found 😒" });
  res.status(200).json({ error: false, product });
};

const addProduct = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({
        error: true,
        message: "Invalid Category 😡",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "No image in the request 😡",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const product = new Product({
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      vipPrice: req.body.vipPrice,
      category: req.body.category,
    });

    const newProduct = await product.save();
    if (!newProduct) {
      return res.status(500).json({
        error: true,
        message: "The product cannot be created 😡",
      });
    }

    console.log("Category:", category);
    console.log("Cloudinary result:", result);

    newProduct.image = result.secure_url;
    await newProduct.save();

    res.status(201).json({
      error: false,
      newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error 😡",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: true,
        message: "Invalid Product Id 😡",
      });
    }

    const { category, name, price, vipPrice, desc } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Product not found! 😡",
      });
    }

    let imagePath = product.image;
    const file = req.file;
    if (file) {
      const result = await cloudinary.uploader.upload(file.path);
      imagePath = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        category,
        name,
        price,
        vipPrice,
        desc,
        image: imagePath,
      },
      { new: true }
    );

    res.status(200).json({
      error: false,
      product: updatedProduct,
      message: "Product updated 😊",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "Internal server error 😡",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (deletedProduct) {
      return res.status(204).json({ error: false, data: {} });
    } else {
      return res.status(404).json({
        error: true,
        message: "Product not found! 😡",
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

export { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct };
