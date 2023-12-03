const db = require("../models");
const bcrypt = require("bcrypt");
const buffer = require("buffer");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const errorCatch = require("../errors/errorCatch");
const { Op } = require("sequelize");

require("dotenv").config();

const User = db.User;

const userRegister = async (req, res) => {
  try {
    const { email, password, phoneNumber, dateOfBirth, userName } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPassLength = 8;
    const maxPassLength = 20;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email Address" });
    }

    if (password.length <= minPassLength || password.length >= maxPassLength) {
      return res.status(400).json({
        message: `Password must be between ${minPassLength} and ${maxPassLength}`,
      });
    }

    const isEmailExist = await User.findOne({ where: { email: email } });

    if (isEmailExist) {
      return res.status(409).json({ message: "Email has already registered" });
    }

    const isUsernameExist = await User.findOne({
      where: { userName: userName },
    });

    if (isUsernameExist) {
      return res
        .status(409)
        .json({ message: "Username has already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 9);
    const newUser = await User.create({
      userId: uuidv4(),
      email,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      userName,
    });

    const blobData = newUser.userImage;
    const decodeImageBuffer = buffer.Buffer.from(blobData, "base64");

    return res.status(201).json({
      payload: { newUser },
      image: decodeImageBuffer,
      message: "Successfully Register an Account",
    });
  } catch (err) {
    return errorCatch(res, err, 500, "Register an Account");
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ where: { email: email } });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { userId: userData.userId, email: userData.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_DURATION }
    );
    return res
      .status(200)
      .json({ message: "Succesfully Login", userData, token });
  } catch (err) {
    return errorCatch(res, err, 400, "Login");
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.findOne({ where: { userId: userId } });

    if (!userData) {
      return res.status(404).json({ message: "User not Found" });
    }

    return res.status(200).json({
      payload: { userData },
      message: "Successfully get the User Data",
    });
  } catch (err) {
    return errorCatch(res, err, 400, "Get One User");
  }
};

const getAllUser = async (req, res) => {
  try {
    const userDatas = await User.findAll({
      attributes: ["userId", "email", "userName"],
    });

    return res.status(200).json({
      payload: { userDatas },
      message: "Succesfully get All the User Data",
    });
  } catch (err) {
    return errorCatch(res, err, 400, "Get All the User Data");
  }
};

const getAllUserByName = async (req, res) => {
  try {
    const userName = req.params.name;

    if (!userName) {
      return res
        .status(400)
        .json({ message: "Missing search query parameter username" });
    }

    const userData = await User.findAll({
      where: {
        userName: {
          [Op.like]: `%${userName}%`,
        },
      },
      attributes: ["userId", "email", "userName"],
    });

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({
      payload: { userData },
      message: "Successfully retrieved user data",
    });
  } catch (err) {
    return errorCatch(res, err, 400, "Get All Name based on paramaters");
  }
};

const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    let userData = await User.findOne({ where: { userId: userId } });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const { email, password, phoneNumber, dateOfBirth, userName, userImage } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    userData = await User.update(
      {
        email,
        password: hashedPassword,
        phoneNumber,
        dateOfBirth,
        userName,
        userImage,
      },
      { where: { userId: userId } }
    );

    return res.status(200).json({ message: "Succesfully Edit User" });
  } catch (err) {
    return errorCatch(res, err, 400, "Edit User");
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.findOne({
      where: { userId: userId },
    });

    if (!userData) {
      return res.status(404).json({ message: "Data User not Found" });
    }

    await User.destroy({ where: { userId: userId } });
    return res.status(200).json({ message: "Successfully Delete User" });
  } catch (err) {
    return errorCatch(res, err, 400, "Delete User");
  }
};

module.exports = {
  userRegister,
  userLogin,
  getOneUser,
  getAllUser,
  getAllUserByName,
  editUser,
  deleteUser,
};
