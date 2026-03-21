const mongoose = require("mongoose");
const Listing = require("./models/listing");
require("dotenv").config();

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
    accessToken: process.env.MAP_TOKEN
});

async function fixListings() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust"); // ✅ your DB name

        console.log("✅ DB Connected");

        const listings = await Listing.find({
            $or: [
                { geometry: { $exists: false } },
                { geometry: null },
                { "geometry.coordinates": { $exists: false } }
            ]
        });

        console.log(`🔍 Found ${listings.length} listings`);

        for (let listing of listings) {
            try {
                let response = await geocodingClient.forwardGeocode({
                    query: listing.location,
                    limit: 1,
                }).send();

                if (response.body.features.length > 0) {
                    listing.geometry = response.body.features[0].geometry;
                    await listing.save();

                    console.log(`✅ Updated: ${listing.title}`);
                } else {
                    console.log(`⚠️ No result for: ${listing.title}`);
                }

            } catch (err) {
                console.log(`❌ Error: ${listing.title}`, err.message);
            }
        }

        console.log("🎉 Done fixing listings");
        mongoose.connection.close();

    } catch (err) {
        console.log("❌ DB Error:", err);
    }
}

fixListings();