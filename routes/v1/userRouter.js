const express = require("express");
const {
  userRegistration,
  verifyOtpAndCreateUser,
  userLogin,
  getAllUsers,
  userLogOut,
  userProfile,
  updateUserProfile,
  forgotPassword,
  deleteUser,
  checkUser,
} = require("../../controllers/userController");
const { userAuth } = require("../../middleware/userAuth");
const { upload } = require("../../middleware/multer");
const router = express.Router();

router.post("/register", userRegistration);
router.post("/otpVerify", verifyOtpAndCreateUser);
router.post("/login", userLogin);
router.put("/forget-password", forgotPassword);
router.get("/users-list", getAllUsers);
router.post("/logout", userLogOut);
router.get("/user-profile", userAuth, userProfile);
router.put("/update-profile", userAuth, upload.single("image"), updateUserProfile);
router.delete("/remove-user/:id", deleteUser)
router.get("/check-user", checkUser)

module.exports = { userRouter: router };
