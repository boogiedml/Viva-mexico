import express from "express";
import * as dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
} from "../controllers/categories.js";

const categoryRouter = express.Router();
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

// get all categories
categoryRouter.route("/").get(getAllCategories);

// Add Category
categoryRouter.post("/", uploadOptions.single("image"), addCategory);

// Delete Category
categoryRouter.route("/:id").delete(deleteCategory);

export default categoryRouter;
