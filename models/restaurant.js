const mongoose = require("mongoose");

// Define the schema for a menu item
const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0, // Ensure price is not negative
      max: 1000, // Example maximum price
    },
    image: {
      type: String, // URL for the image
    },
    category: {
      type: String,
      enum: ["Appetizer", "Main Course", "Dessert", "Beverage"],
      required: true, // Make it required
    },
  },
  { timestamps: true }
);

// Define the schema for a restaurant
const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensure unique names for restaurants
    },
    location: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL for the image
    },
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    menuItems: [menuItemSchema], // Embed menu items
  },
  { timestamps: true }
);

// Create the model
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = { Restaurant };
