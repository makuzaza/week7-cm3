const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const signupUser = async (req, res) => {
  try {
    const name = req.body.name || req.body.fullName;
    const username = req.body.username; 
    const password = req.body.password;
    const phone_number = req.body.phone_number || req.body.phoneNumber;
    const licenseNumber = req.body.licenseNumber;
    const date_of_birth = req.body.date_of_birth;
    const address = req.body.address || {};

    const licenseExpiryDate = address.licenseExpiryDate;
    const city = address.city;
    const yearsOfExperience = address.yearsOfExperience;

    if (
      !name ||
      !username ||
      !password ||
      !phone_number ||
      !licenseNumber ||
      !date_of_birth ||
      !licenseExpiryDate ||
      !city ||
      yearsOfExperience === undefined
    ) {
      return res.status(400).json({ error: "Please add all required fields" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { licenseNumber }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or licenseNumber already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      phone_number,
      licenseNumber,
      date_of_birth,
      address: {
        licenseExpiryDate,
        city,
        yearsOfExperience,
      },
    });

    const token = generateToken(user._id);
    return res.status(201).json({
      _id: user._id,
      username: user.username,
      token,
    });
  } catch (error) {
    // Duplicate key fallback
    if (error.code === 11000) {
      return res.status(400).json({ error: "Duplicate unique field value" });
    }
    return res.status(400).json({ error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      token,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};