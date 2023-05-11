const express = require("express");
const router = express.Router();
const Order = require("../models/Order")

router.post("/orderData",async (req,res)=>{
    let data = req.body.order_data;
    await data.splice(0,0,{order_date:req.body.order_date})

    let eid = await Order.findOne({'email':req.body.email})
    if(eid === null){
        try{
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.send({success:true})
            })
        }
        catch(err){
            console.log(err);
            res.send("server error",err.message)
        }
        
    }
    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}).then(()=>{
                    res.send({success:true})
                })
                
        }
        catch(err){
            console.log(err);
            res.send("server error",err.message)
        }
    }
})

router.post("/myorder",async (req,res)=>{
    try{
  let mydata=await Order.findOne({"email":req.body.email})
  res.json({orderData:mydata})
    }
    catch(err){
      res.send("server error",err.message)
    }
})

module.exports=router
