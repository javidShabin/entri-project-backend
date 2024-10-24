const express = require("express");
const router = express.Router();

// Create menu
router.post("/create-menu",)
// Get menus by restaurant id
router.get("/menu/:restaurantId",)
// Update menu
router.put("/update-menu",)
// delete menu
router.delete("/remove-menu",)


module.exports = { menuRouter: router };
