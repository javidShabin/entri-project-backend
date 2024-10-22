const express = require("express")
const { userAuth } = require("../../middleware/userAuth")
const { addToCart, updateCart, cartDetails, removeFromCart, clearCart } = require("../../controllers/cartController")
const router = express.Router()

// Create cart
router.post("/create-cart", userAuth, addToCart)
// Update the cart
router.put("/updateCart", userAuth, updateCart)
// Get cart details
router.get("/cart-details", userAuth, cartDetails)
// Remove item from cart
router.delete("/removeCart", userAuth, removeFromCart)
// Clear the all  cart
router.delete("/clear-cart", userAuth, clearCart)


module.exports = {cartRouter : router}