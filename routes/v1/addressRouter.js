const express = require("express")
const { userAuth } = require("../../middleware/userAuth")
const router = express.Router()

// Create address
router.post("/create-address")
// Update address
router.put("/update-adress")
// Get address
router.get("/get-address")
// Delete address
router.delete("/remove-address")

module.exports = {addressRouter : router}