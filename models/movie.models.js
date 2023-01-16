const mongoose = require("mongoose");

const movieSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userId:String
},{
    versionKey:false
});

const MovieModel=mongoose.model("movie",movieSchema);

module.exports=MovieModel;