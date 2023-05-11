const express = require("express");
const router = express.Router();

router.post("/foodData",(req,res)=>{
    try{
        console.log(global.fooddb);
        res.send([global.fooddb,global.fooditems])
    }catch(err){
        console.log(err);
        res.send("Server error")
    }
})
module.exports=router;