const express = require("express");
const { userAuth } = require("../../middleware/userAuth");
const {
  createAddress,
  updateAddress,
  getAddress,
  removeAddress,
} = require("../../controllers/addressController");
const router = express.Router();

// Create address
router.post("/create-address", userAuth, createAddress);
// Update address
router.put("/update-adress", updateAddress);
// Get address
router.get("/get-address", userAuth, getAddress);
// Delete address
router.delete("/remove-address", userAuth, removeAddress);

module.exports = { addressRouter: router };
