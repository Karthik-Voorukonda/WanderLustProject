const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Review = require("./revies.js")

const listingSchema = new Schema({
  title: {
    type:String,
    require:true
  },
  description: {
    type:String
  },
  image: {
    type: String,
    default:"https://media.istockphoto.com/id/610041376/photo/beautiful-sunrise-over-the-sea.jpg?s=612x612&w=0&k=20&c=R3Tcc6HKc1ixPrBc7qXvXFCicm8jLMMlT99MfmchLNA=",
    set:(v) => v === "" ? "https://media.istockphoto.com/id/610041376/photo/beautiful-sunrise-over-the-sea.jpg?s=612x612&w=0&k=20&c=R3Tcc6HKc1ixPrBc7qXvXFCicm8jLMMlT99MfmchLNA=" : v,
    filename:String,
    url:String,
  },
  
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
});

listingSchema.post("findOneAndDelete",async (listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in :listing.reviews}})
    }
    
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;     