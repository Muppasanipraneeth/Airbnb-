const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
const port =3000;
app.use(cors());
app.use(express.json);
app.listen(port,()=>{
    console.log(" this port is working ",{port});
    
})
app.get("/",(req,res)=>{
    res.send(" this is the backend of the airbnb");
})
