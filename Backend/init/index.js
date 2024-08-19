const mongoose=require("mongoose");
const initdata=require("./data");
const Listing=require("../models/listing");
const MongoUrl='mongodb://127.0.0.1:27017/wanderlust';
const main=async()=>{
    await mongoose.connect(MongoUrl);
}
main().then(()=>{
    console.log(" the Mongodb is connected");
    
}).catch(err=>{console.log(" there is an error in the mongobd connection");
})
const initlisting=async()=>{
    await Listing.deleteMany({});
   await Listing.insertMany(initdata.data);
   console.log(" the data is initialled");

   
}
initlisting();
