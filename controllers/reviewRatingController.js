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
    res.status(201).json({ message: "Review added successfully", review });
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
    // Destructure values from req.query
    const { restaurantId, menuItemId } = req.query;
    let filter = {};
    if (restaurantId) {
      filter.restaurant = restaurantId;
    }
    if (menuItemId) {
      filter.menuItem = menuItemId;
    }
    // Find the review using filter
    const review = await Review.find(filter);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the reviews.",
    });
  }
};
// Update review
const updateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const { rating, comment } = req.body;

    // Find the edit review using id
    const review = await Review.findById(reviewId);

    // Check the review in database
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    // Check if the review belongs to the current user
    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this review" });
    }
    // Update fields only if they are provided in the request
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    // Save updated review to the database
    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the review.",
      error: error.message,
    });
  }
};
// Remove review
const removeReview = async (req, res) => {
  try {
    // Get the reviewId from req.params
    const { reviewId } = req.params;

    // Check if reviewId was provided
    if (!reviewId) {
      return res.status(400).json({ message: "Review ID is required" });
    }

    // Find and delete the review
    const review = await Review.findByIdAndDelete(reviewId);

    // If no review is found, send a 404 response
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Send a success response if the review is deleted
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the review.",
    });
  }
};

module.exports = {
  createReview,
  getReview,
  updateReview,
  removeReview,
};
