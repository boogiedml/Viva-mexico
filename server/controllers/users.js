import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const addUser = async (req, res) => {
  try {
    const { username, passwordHash } = req.body;

    const user = new User({
      username: username,
      passwordHash: bcrypt.hashSync(passwordHash, 10),
    });

    const newUser = await user.save();

    res.status(201).json({
      error: false,
      user: {
        _id: newUser._id,
        username: newUser.username,
      },
      code: 201,
      message: "User created 😊",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: true,
        message: "User already exists. Please use a different username 🤪",
      });
    }
    res.status(500).json({
      error: true,
      message: "Internal server error 😡",
    });
  }
};

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found! 😡",
      });
    }

    if (bcrypt.compareSync(password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({
        error: false,
        data: {
          username: user.username,
          userId: user.id,
          token: token,
        },
        code: 200,
        message: "User Authenticated 😊",
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Password is incorrect! 😡",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error 😡",
    });
  }
};

export { addUser, authenticateUser };
