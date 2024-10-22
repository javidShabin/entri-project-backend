const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpiresAt: { type: Date, required: true },

});

const TempUser = mongoose.model("TempUser", tempUserSchema);

module.exports = { TempUser };
