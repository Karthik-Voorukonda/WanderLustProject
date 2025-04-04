const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
    // console.log(allListings)
  }

module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing you requested for is already deleted");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }

  module.exports.createRoute = async (req, res, err, next) => {
      const newListing = new Listing(req.body.listing);
      await newListing.save();
      req.flash("success", "New Listing Created!");
      res.redirect("/listings");
    }


    module.exports.editRoute = async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
          req.flash("error", "Listing you requested for is already deleted");
          res.redirect("/listings");
        }
        res.render("listings/edit.ejs", { listing });
      }

      module.exports.updateRoute = async (req, res) => {
          let { id } = req.params;
          await Listing.findByIdAndUpdate(id, { ...req.body.listing });
          req.flash("success", "New Listing Updated!");
          res.redirect(`/listings/${id}`);
        }


        module.exports.deleteRoute = async (req, res) => {
            let { id } = req.params;
            let deletedListing = await Listing.findByIdAndDelete(id);
            console.log(deletedListing);
            req.flash("success", "New Listing is Deleted!");
            res.redirect("/listings");
          }