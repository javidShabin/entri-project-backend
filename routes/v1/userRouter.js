const express = require("express");
const { userRegistration, verifyOtpAndCreateUser } = require("../../controllers/userController");
const router = express.Router();

router.use("/register", userRegistration)
router.use("/otpVerify", verifyOtpAndCreateUser)

module.exports = { userRouter: router };
