const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;