const express = require("express");
const { userRegistration, verifyOtpAndCreateUser, userLogin } = require("../../controllers/userController");
const router = express.Router();

router.use("/register", userRegistration)
router.use("/otpVerify", verifyOtpAndCreateUser)
router.use("/login", userLogin)

module.exports = { userRouter: router };
