const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");

// const Joi = require("joi");


const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

main().then(() => {
    console.log("connected to Db");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');


}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {

    res.send("connection sucess");
});







app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


// app.get("/testListing", async(req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "beach side",
//         price: 1200,
//         location: "colangute goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("sucess full testing");
// });

// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "page Not Found!"));
// });
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something wents wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
});


app.listen(8080, () => {
    console.log("sever is listen to port 8080");
});