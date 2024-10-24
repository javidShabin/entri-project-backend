const express = require("express");
const {
  getAllRestaurants,
  getRestautantById,
  createRestaurant,
  updateRestautant,
  deleteRestaurant,
} = require("../../controllers/restautantController");
const { upload } = require("../../middleware/multer");
const router = express.Router();

router.get("/all-restaurants", getAllRestaurants);
router.get("/:id", getRestautantById);
router.post("/create-restaurant", upload.single("image"), createRestaurant);
router.put("/update-restaurant/:id", updateRestautant)
router.delete("/delete-restaurant/:id", deleteRestaurant)

module.exports = { restaurantRouter: router };
