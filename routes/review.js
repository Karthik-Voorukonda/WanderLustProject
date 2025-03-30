const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/revies.js");
const Listing = require("../models/listing.js");
const { reviewSchema } = require("../Schema.js");

const reviewController =  require("../controllers/reviews.js")

//validation
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Reviews Route
router.post(
  "/",
  validateReview,
  wrapAsync(reviewController.createReview)
);

//DELETE REVIEW ROUTE
router.delete(
  "/:reviewId",
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
