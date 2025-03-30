const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../Schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middlewares.js");
const lisitingController = require("../controllers/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



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

router
  .route("/")
  .get(wrapAsync(lisitingController.index))
  .post(isLoggedIn, wrapAsync(lisitingController.createRoute));

  //New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});


router
  .route("/:id")
  .get(wrapAsync(lisitingController.showRoute))
  .put(isLoggedIn, wrapAsync(lisitingController.updateRoute))
  .delete(isLoggedIn, wrapAsync(lisitingController.deleteRoute));



//Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(lisitingController.editRoute));

module.exports = router;
