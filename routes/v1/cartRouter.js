const express = require("express")
const {  addItemToCart, updateCart, getCartDetails, removeFromCart, clearCart, } = require("../../controllers/cartController")
const { userAuth } = require("../../middleware/userAuth")
const router = express.Router()

// Create cart
router.post("/create-cart", userAuth, addItemToCart)
// Update the cart
router.put("/updateCart", userAuth, updateCart)
// Get cart details
router.get("/cart-details", userAuth, getCartDetails)
// Remove item from cart
router.delete("/removeCart", userAuth, removeFromCart)
// Clear the all  cart
router.delete("/clear-cart", userAuth, clearCart)


module.exports = {cartRouter : router}