const express = require("express");
const { getAllRestaurants, getRestautantById } = require("../../controllers/restautantController");
const router = express.Router();

router.get("/all-restaurants", getAllRestaurants)
router.get("/:id", getRestautantById)

module.exports = { restaurantRouter: router };
