const Listing = require("../models/listing.js");
const Reviews = require("../models/revies.js")

module.exports.createReview= async (req, res) => {
    let listings = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listings.reviews.push(newReview);
    await newReview.save();
    await listings.save();
    req.flash("success","New Review Created!");

    res.redirect(`/listings/${req.params.id}`);
  }


  module.exports.deleteReview=async (req, res) => {
      let { id, reviewId } = req.params;
  
      await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
      req.flash("success","New Review Deleted!");
      res.redirect(`/listings/${id}`);
    }