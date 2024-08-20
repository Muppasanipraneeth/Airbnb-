const express = require("express");
const cors = require("cors");
const Listing = require("./models/listing");
const mongoose = require("mongoose");
const path = require("path");
const method_overide=require("method-override");
const ejsmate=require("ejs-mate");

const app = express();
const port = 1234;
app.use(method_overide("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname,"/public")));


const MongoUrl = 'mongodb://127.0.0.1:27017/wanderlust';

const main = async () => {
    await mongoose.connect(MongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

main().then(() => {
    console.log("MongoDB is connected");
}).catch(err => {
    console.log("There was an error connecting to MongoDB", err);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("This is the backend of the Airbnb project");
});

app.get("/listing", async (req, res) => {
    try {
        const alllisting = await Listing.find();
        res.render("listing/index", { alllisting });
    } catch (error) {
        res.status(500).send("Error retrieving listings");
        console.error("Error retrieving listings:", error);
    }
});

app.get("/listing/new", (req, res) => {
    res.render("listing/newform");
});

app.post("/listing", async (req, res) => {
    try {
        const listingData = req.body.listing;
        const listing = new Listing(listingData);
        await listing.save();
        console.log(listing);
        res.redirect("/listing");
    } catch (error) {
        res.status(500).send("Error saving the listing");
        console.error("Error saving the listing:", error);
    }
});

app.get("/listing/:_id", async (req, res) => {
    const { _id } = req.params;
    const list = await Listing.findById(_id);
    res.render("listing/show", { list });
});
app.get("/listing/:_id/edit",async(req,res)=>{
    const { _id } = req.params;
    const list=await Listing.findById(_id);
    console.log(list);
    
    res.render("listing/edit",{list});
})
app.put("/listing/:_id",async(req,res)=>{
    const {_id}=req.params;
    console.log(_id);
    
    const listing=await Listing.findByIdAndUpdate(_id,{...req.body.listing});
    console.log(listing);
    
    console.log(" the data is updated");
    
    res.redirect("/listing");
})
app.get("/listing/:_id/delete",async(req,res)=>{
    const {_id}=req.params;
    await Listing.findByIdAndDelete(_id);
    res.redirect("/listing");
})