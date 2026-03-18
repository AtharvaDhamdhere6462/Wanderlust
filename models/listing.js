const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "https://unsplash.com/photos/a-person-walks-down-a-narrow-sunlit-street-qXNkrU5ENIw",
        set: (v) => v === "" ? "https://unsplash.com/photos/a-person-walks-down-a-narrow-sunlit-street-qXNkrU5ENIw" : v,

    },
    price: {
        type: Number,

    },
    location: {
        type: String,

    },
    country: {
        type: String,

    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }, ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

});

listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;