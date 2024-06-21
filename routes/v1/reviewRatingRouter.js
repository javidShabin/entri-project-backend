const express = require("express");
const { userAuth } = require("../../middleware/userAuth");
const {
  createReview,
  getReview,
  updateReview,
  removeReview,
} = require("../../controllers/reviewRatingController");
const router = express.Router();

router.post("/create-review", userAuth, createReview);
router.get("/get-all-reivews", getReview);
router.put("/edit-review/:reviewId",userAuth, updateReview);
router.delete("/revome-review/:id", removeReview);

module.exports = { reviewRatingRouter: router };
