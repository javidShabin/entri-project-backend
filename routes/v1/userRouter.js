const express = require("express");
const {
  userRegistration,
  verifyOtpAndCreateUser,
  userLogin,
  getAllUsers,
  userLogOut,
  userProfile,
} = require("../../controllers/userController");
const { userAuth } = require("../../middleware/userAuth");
const router = express.Router();

router.use("/register", userRegistration);
router.use("/otpVerify", verifyOtpAndCreateUser);
router.use("/login", userLogin);
router.use("/users-list", getAllUsers);
router.use("/logout", userLogOut);
router.use("/user-profile", userAuth, userProfile);

module.exports = { userRouter: router };
