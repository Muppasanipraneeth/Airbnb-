const express = require("express");
const cors = require("cors");
const Listing = require("./models/listing");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 1234;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
app.get("/listing/:_id",async(req,res)=>{
    const {_id}=req.params;
    console.log(_id);
    const list= await Listing.findById(_id);
    console.log(list);
    res.render("show.ejs",{list});
    
    
})