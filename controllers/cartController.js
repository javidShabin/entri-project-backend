const { Cart } = require("../models/cartModel");
const { Menu } = require("../models/menuModel");

// Add items in cart
const addItemToCart = async (req, res) => {
  try {
    const { items } = req.body; // Get item from req.body
    const userId = req.user.id; // Get user id from req.user

    // Validate the items input
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Items array is required and should not be empty.",
      });
    }

    // Find or create the user's cart
    let cart =
      (await Cart.findOne({ userId })) ||
      new Cart({ userId, items: [], totalPrice: 0 });

    // Prepare to store menu items and their details
    const menuItemIds = items.map(({ menuItem }) => menuItem);
    const menuItems = await Menu.find({ _id: { $in: menuItemIds } });
    const menuItemMap = Object.fromEntries(
      menuItems.map((item) => [item._id.toString(), item])
    );

    // Initialize total price change
    let totalPriceChange = 0;

    for (const { menuItem, quantity } of items) {
      // Validate menuItem and quantity
      if (!menuItem || quantity <= 0) {
        return res.status(400).json({
          message:
            "Each item must have a valid menuItem ID and quantity greater than zero.",
        });
      }

      const menuItemDetails = menuItemMap[menuItem];
      if (!menuItemDetails) {
        return res.status(404).json({
          message: "Menu item not found",
        });
      }

      // Check if item is already in the cart
      const itemExists = cart.items.some(
        (item) => item.menuItem.toString() === menuItem
      );
      if (itemExists) {
        return res.status(400).json({
          message: `Item is already in the cart.`,
        });
      }

      // Add new item to cart
      cart.items.push({
        menuItem,
        quantity,
        image: menuItemDetails.image,
        price: menuItemDetails.price,
        ItemName: menuItemDetails.name,
      });

      // Calculate total price change
      totalPriceChange += menuItemDetails.price * quantity;
    }

    // Update total price in the cart
    cart.totalPrice += totalPriceChange; // Add to existing total price

    // Save the cart
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding item to cart.",
      error: error.message,
    });
  }
};

// Update the cart
const updateCart = async (req, res) => {
  try {
    const { items } = req.body; // Get item from req.body
    const userId = req.user.id; // Get user id from req.user

    // Check if files are present
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Items array is required and should not be empty.",
      });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found.",
      });
    }
    // Loop through the items and update the quantity or other properties
    for (let { menuItem, quantity } of items) {
      const itemIndex = cart.items.findIndex(
        (item) => item.menuItem.toString() === menuItem
      );

      if (itemIndex > -1) {
        // If item exists, update the quantity
        cart.items[itemIndex].quantity = quantity;

        // Optional: If the quantity is 0 or less, remove the item from the cart
        if (quantity <= 0) {
          cart.items.splice(itemIndex, 1);
        }
      } else {
        return res.status(404).json({
          message: `Menu item with ID ${menuItem} not found in the cart.`,
        });
      }
    }
    // Recalculate the total price
    let totalPrice = 0;
    for (let item of cart.items) {
      const menuItemDetails = await Menu.findById(item.menuItem);
      if (menuItemDetails) {
        totalPrice += menuItemDetails.price * item.quantity;
      } else {
        return res.status(404).json({
          message: "One or more menu items were not found.",
        });
      }
    }
    cart.totalPrice = totalPrice;
    // Save the updated cart
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error)
  }
};
// Cart detials
const getCartDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user id from req.user
    // Find the cart details using user id
    const cart = await Cart.findOne({ userId });
    // If didnt find the cart details send error as respone
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    // If find
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error)
  }
};
// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const { menuItem } = req.body; // Get the menu item from req.body
    const userId = req.user.id; // Get the user id from req.user

    // Check the menu item present or not
    if (!menuItem) {
      return res.status(400).json({
        message: "menu item is required.",
      });
    }
    // Find cart using user id
    const cart = await Cart.findOne({ userId });

    // Check have any cart for the user in databse
    if (!cart) {
      return res.status(404).json({
        message: "cart not found.",
      });
    }
    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuItem
    );

    // recalculate total price
    let totalPrice = 0;
    for (let item of cart.items) {
      const menuItemDetails = await Menu.findById(item.menuItem);
      if (menuItemDetails) {
        totalPrice += menuItemDetails.price * item.quantity;
      }
    }

    cart.totalPrice = totalPrice;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error)
  }
};
// Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user id from req.user

    // Find cart using user id
    const cart = await Cart.findOne({ userId });

    // Check if there's any cart for the user in the database
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found.",
      });
    }

    // Clear items and reset total price
    cart.items = [];
    cart.totalPrice = 0;

    const savedCart = await cart.save();
    if (!savedCart) {
      return res.status(500).json({
        message: "Failed to clear the cart. Please try again.",
      });
    }

    // Send a response confirming the cart has been cleared
    res.status(204).send(); // No content to return
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while clearing the cart.",
    });
  }
};

module.exports = {
  addItemToCart,
  updateCart,
  getCartDetails,
  removeFromCart,
  clearCart,
};
