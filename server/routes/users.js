import express from "express";
import { addUser, authenticateUser } from "../controllers/users.js";

const userRouter = express.Router();

// Create new User
userRouter.route("/signup").post(addUser);

// Authenticate User
userRouter.route("/login").post(authenticateUser);

export default userRouter;
