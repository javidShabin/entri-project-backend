const express = require("express");
const {
  getAllRestaurants,
  getRestautantById,
  createRestaurant,
  updateRestautant,
} = require("../../controllers/restautantController");
const { upload } = require("../../middleware/multer");
const router = express.Router();

router.get("/all-restaurants", getAllRestaurants);
router.get("/:id", getRestautantById);
router.post("/create-restaurant", upload.single("image"), createRestaurant);
router.put("/:id", updateRestautant)

module.exports = { restaurantRouter: router };
