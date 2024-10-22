const express = require("express")
const { userAuth } = require("../../middleware/userAuth")
const { addToCart, updateCart, cartDetails, removeFromCart, clearCart } = require("../../controllers/cartController")
const router = express.Router()

// Create cart
router.post("/create-cart", addToCart)
// Update the cart
router.put("/updateCart", updateCart)
// Get cart details
router.get("/cart-details", cartDetails)
// Remove item from cart
router.delete("/removeCart", removeFromCart)
// Clear the all  cart
router.delete("/clear-cart", clearCart)


module.exports = {cartRouter : router}