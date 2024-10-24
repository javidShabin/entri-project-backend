const express = require("express");
const {
  getAllRestaurants,
  getRestautantById,
  createRestaurant,
} = require("../../controllers/restautantController");
const { upload } = require("../../middleware/multer");
const router = express.Router();

router.get("/all-restaurants", getAllRestaurants);
router.get("/:id", getRestautantById);
router.post("/create-restaurant", upload.single("image"), createRestaurant);

module.exports = { restaurantRouter: router };
