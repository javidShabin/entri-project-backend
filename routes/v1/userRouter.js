const express = require("express");
const { userRegistration } = require("../../controllers/userController");
const router = express.Router();

router.use("/register", userRegistration)

module.exports = { userRouter: router };
