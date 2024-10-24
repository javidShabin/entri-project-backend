const express = require("express");
const { getAllRestaurants } = require("../../controllers/restautantController");
const router = express.Router();

router.get("/all-restaurants", getAllRestaurants)

module.exports = { restaurantRouter: router };
