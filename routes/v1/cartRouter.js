const express = require("express")
const {  addItemToCart, updateCart, cartDetails, removeFromCart, clearCart, } = require("../../controllers/cartController")
const { userAuth } = require("../../middleware/userAuth")
const router = express.Router()

// Create cart
router.post("/create-cart", userAuth, addItemToCart)
// Update the cart
router.put("/updateCart", updateCart)
// Get cart details
router.get("/cart-details", cartDetails)
// Remove item from cart
router.delete("/removeCart", removeFromCart)
// Clear the all  cart
router.delete("/clear-cart", clearCart)


module.exports = {cartRouter : router}