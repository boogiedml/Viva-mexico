import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./db/connect.js";
import productsRouter from "./routes/products.js";
import userRouter from "./routes/users.js";
import categoryRouter from "./routes/categories.js";
import verifyJwt from "./helpers/jwt.js";

dotenv.config();
const app = express();
const apiRoute = "/api/v1";
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
// app.use(verifyJwt);
app.use(morgan("tiny"));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: {
      message: "Welcome to Viva Mexico API",
      status_code: 200,
    },
  });
});
app.use(`${apiRoute}/product`, productsRouter);
app.use(`${apiRoute}/category`, categoryRouter);
app.use(`${apiRoute}/user`, userRouter);

connectDB(process.env.CONNECTON_STRING);

app.listen(port, () => {
  console.log("Connection Started");
});
