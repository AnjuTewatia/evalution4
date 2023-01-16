const express = require("express");
const MovieModel = require("../models/movie.models");
const movieRouter=express.Router();

movieRouter.get("/",async(req,res,next)=>{
    try {
        const userId=req.body.userId;
        const posts=await MovieModel.find({userId:userId,device:req.query.device});
        res.send(posts);
    } 
    catch(err) {
        res.send({err:err.message})
    }
})

movieRouter.post("/add",async(req,res)=>{
    try {
        const post =new PostModel(req.body);
        await post.save();
        res.send(post)
    } catch (error) {
        res.send({error:error.message})
    }
})

movieRouter.patch('/posts/update/:id',async(req,res)=>{
    try {
        const userId=req.body.userId;
        const id=req.params.id;
        const post=await MovieModel.findById(id);
        if(post.userId===userId){
            await MovieModel.findByIdAndUpdate(id,req.body);
            res.send("post is updated")
        }else{
            res.send("You not login");
        }
    } catch (error) {
        res.send({error:error.message})
    }
})

movieRouter.delete('/posts/delete/:id',async(req,res)=>{
    try {
        const userId=req.body.userId;
        const id=req.params.id;

        const post=await MovieModel.findById(id);

        if(post.userId===userId){
            await PostModel.findByIdAndDelete(id);
            res.send("post is delete")
        }
        else{

            res.send("You are not login");
        }
    } 

    catch (err) {
        res.send({err:err.message})
    }
})




module.exports=movieRouter;