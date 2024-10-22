const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");

// Register user
const userRegistration = async (req, res) => {
  try {
    // Get all fields from request body
    const { email, password, conformPass, ...rest } = req.body;
    // Check if required field are presented
    if (!email || !password || !conformPass) {
      return res.status(401).json({ message: "All fields are required" });
    }
    // Check mating for conform password
    if (password !== conformPass) {
      return res.status(401).json({ message: "Passwords do not match" });
    }
    // Check the user already exist or not
    // If the user already exist then send response error
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Hash the user password for security
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Creat the user and add the hashed password to the user password
    const newUser = new User({
      email,
      ...rest,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate token for user
    const token = generateToken({
      _id: newUser._id,
      email: newUser.email,
      role: "customer",
    });
    // Pass the token as a cookie (the token will expire in one hour)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    // Return a success response
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
  }
};
// Login user
// Logout user
// Get user profile
// Update user profile
// Delete user

module.exports = { userRegistration };
