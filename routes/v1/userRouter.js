const express = require("express");
const {
  userRegistration,
  verifyOtpAndCreateUser,
  userLogin,
  getAllUsers,
} = require("../../controllers/userController");
const router = express.Router();

router.use("/register", userRegistration);
router.use("/otpVerify", verifyOtpAndCreateUser);
router.use("/login", userLogin);
router.use("/users-list", getAllUsers);

module.exports = { userRouter: router };
