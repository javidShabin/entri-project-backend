const { Cart } = require("../models/cartModel");

// Add to cart
const addToCart = async (req, res) => {
  try {
    // Destructure the values from req.body
    const { userId, itemId, name, price, quantity } = req.body;
    // Check if the cart exists; if not, create a new cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalAmount: 0 });
    }
    // Check if the item already exists in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.itemId.toString() === itemId
    );
    if (itemIndex > -1) {
      // If the item exists, increase the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Otherwise, add a new item
      cart.items.push({ itemId, name, price, quantity });
    }
    // Update the total amount
    cart.totalAmount += price * quantity;
    // Save the cart to the database
    await cart.save();
    // Send back the updated cart details
    res.status(200).json(cart);
  } catch (error) {
    // Log the error and send a response with an error message
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart", error });
  }
};

// Update the cart
const updateCart = async () => {
  try {
  } catch (error) {}
};
// Cart detials
const cartDetails = async () => {
  try {
  } catch (error) {}
};
// Remove from cart
const removeFromCart = async () => {
  try {
  } catch (error) {}
};
// Clear cart
const clearCart = async () => {
  try {
  } catch (error) {}
};
module.exports = {
  addToCart,
  updateCart,
  cartDetails,
  removeFromCart,
  clearCart,
};
