const express = require("express");
const {
  userRegistration,
  verifyOtpAndCreateUser,
  userLogin,
  getAllUsers,
  userLogOut,
  userProfile,
  updateUserProfile,
} = require("../../controllers/userController");
const { userAuth } = require("../../middleware/userAuth");
const { upload } = require("../../middleware/multer");
const router = express.Router();

router.use("/register", userRegistration);
router.use("/otpVerify", verifyOtpAndCreateUser);
router.use("/login", userLogin);
router.use("/users-list", getAllUsers);
router.use("/logout", userLogOut);
router.use("/user-profile", userAuth, userProfile);
router.use("update-profile", userAuth, upload.single("image"), updateUserProfile)

module.exports = { userRouter: router };
