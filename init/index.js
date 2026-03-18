const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { init } = require("../models/review.js");


main().then(() => {
    console.log("connected to Db");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


const initDB = async() => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "69b8074378c834e92aa1c3de" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialase");
}

initDB();