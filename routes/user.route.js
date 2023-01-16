const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
const UserRouter=express.Router();



UserRouter.post("/users/register",async(req,res)=>{

    try {
        const {name,email,gender,password}=req.body;
        const hash=await bcrypt.hash(password,bcrypt.genSaltSync(10));
        const user=new UserModel({name,email,gender,password:hash});
        await user.save();
        res.send("registered succesfully");
    } 
    catch (err) {
        res.send({err});
        console.log("something went wrong while registered")
    }
});



UserRouter.post("users/login",async(req,res)=>{

    try {
        const {email,password}=req.body;
        const user=await UserModel.findOne({email:email});

        if(user){

            let result=await bcrypt.compare(password,user.password);
            if(result){

                const token=jwt.sign({userId:user._id},process.env.key);
                res.send({msg:"Logged in",token});
            }
            else{
                res.send("please login right deltails");
            }
        }
        else{
            res.send("please registe first");
        }
    } 
    catch (err) {
        res.send({err:err.message});
    }
})



module.exports=UserRouter;