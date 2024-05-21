const { Menu } = require("../models/menuModel");
const { Restaurant } = require("../models/restaurant");
const { Review } = require("../models/reviewRatingModel");

// Create review
const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    // Destructure values from req.body
    const { rating, comment, restaurant, menuItem } = req.body;
    if (!rating || (restaurant === undefined && menuItem === undefined)) {
      return res.status(400).json({
        message:
          "rating is required, and either restaurant or menuItem must be provided.",
      });
    }
    // Check if restaurant
    if (restaurant) {
      const restaurantExists = await Restaurant.findById(restaurant);
      if (!restaurantExists) {
        return res.status(404).json({ message: "restaurant not found" });
      }
    }
    // Check if menu menuItem exists
    if (menuItem) {
      const menuItemExists = await Menu.findById(menuItem);
      if (!menuItemExists) {
        return res.status(404).json({ message: "menu item not found" });
      }
    }
    // Create a new review
    const review = new Review({
      user: userId,
      restaurant,
      menuItem,
      rating,
      comment,
    });
    // Save review to database
    await review.save();
    res.status(201).json({message: "Review added successfully", review});
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the review.",
      error: error.message,
    });
  }
};
// Get review
const getReview = async (req, res) => {
  try {
  } catch (error) {}
};
// Update review
const updateReview = async (req, res) => {
  try {
  } catch (error) {}
};
// Remove review
const removeReview = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  createReview,
  getReview,
  updateReview,
  removeReview,
};
