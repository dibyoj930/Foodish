const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("./db");


const app=express();
const cors = require("cors")
const port = process.env.port || 5000;
app.use(express.json());
app.use(cors());
app.use("/api",require("./Routes/CreateUser"))
app.use("/api",require("./Routes/DisplayData"))
app.use("/api",require("./Routes/Orderdata"))
app.get("/",(req,res)=>{
    res.send(`server started on ${port}`);
})

app.listen(port,()=>{
    console.log("server is started")
})

mongodb();