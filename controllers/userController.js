const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { generateToken } = require("../utils/token");
const { TempUser } = require("../models/tembUser");

const userRegistration = async (req, res) => {
  try {
    const { email, password, confirmPass, name, phone, ...rest } = req.body;

    // Check if required fields are present
    if (!email || !password || !confirmPass || !name || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPass) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Registration",
      text: `Your OTP is ${otp}. Please verify to complete your registration.`,
    };

    await transporter.sendMail(mailOptions);

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save or update temporary user data with OTP
    await TempUser.findOneAndUpdate(
      { email },
      {
        email,
        password: hashedPassword,
        otp, // store OTP
        otpExpiresAt: Date.now() + 10 * 60 * 1000, // OTP expires in 10 minutes
        name, // Store name
        phone, // Store phone
      },
      { upsert: true, new: true } // Create new or update existing
    );

    res.status(200).json({
      success: true,
      message: "OTP sent to your email. Please verify within 10 minutes.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};
// Otp verifying and create user
const verifyOtpAndCreateUser = async (req, res) => {
  try {
    // Get emial and otp from req.body
    const { email, otp } = req.body;
    // Check if required fields are present
    if (!email || !otp) {
      return res.status(404).json({ message: "Email and OTP are required" });
    }
    // Find the temporary user by email
    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if OTP is correct and not expired
    if (tempUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (tempUser.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    // Create the actual user
    const newUser = new User({
      name: tempUser.name,
      phone: tempUser.phone,
      email: tempUser.email,
      password: tempUser.password,
    });

    await newUser.save();

    // Generate a token
    const token = generateToken({
      _id: newUser._id,
      email: newUser.email,
      role: "customer",
    });

    // Set token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    // Remove the temporary user from the database after successful registration
    await TempUser.deleteOne({ email });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token, // Optionally return the token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "OTP verification failed",
      error: error.message,
    });
  }
};
// Login user
const userLogin = async (req, res) => {
  try {
  } catch (error) {}
};
// Logout user
const userLogOut = async (req, res) => {
  try {
  } catch (error) {}
};
// Get user profile
const userProfile = async (req, res) => {
  try {
  } catch (error) {}
};
// Update user profile
const updateUserProfile = async (req, res) => {
  try {
  } catch (error) {}
};
// Delete user
const deleteUser = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  userRegistration,
  verifyOtpAndCreateUser,
  userLogin,
  userLogOut,
  userProfile,
  updateUserProfile,
  deleteUser,
};
