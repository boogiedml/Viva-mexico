import express from "express";
import * as dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/products.js";

const productsRouter = express.Router();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
// configure multer storage and options
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadOptions = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  // limits: { fileSize: 1000000 },
});

// check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Get All Products
productsRouter.route("/").get(getAllProducts);

// get product
productsRouter.route("/:id").get(getProduct);

// Add New Product
productsRouter.post("/", uploadOptions.single("image"), addProduct);

// Update Product
productsRouter.put("/:id", uploadOptions.single("image"), updateProduct);

// Delete Product
productsRouter.route("/:id").delete(deleteProduct);

export default productsRouter;
