const express = require("express");
const dotenv = require("dotenv");
const { authentation } = require("./middleware/authentation.middleware");
const UserRouter = require("./routes/user.route");
const movieRouter = require("./routes/movie.route");
const {connection} = require("./configs/db");


const app = express();
app.use(express.json());


app.use("/users", UserRouter);

app.use(authentation);

app.use("/posts",movieRouter);



app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("connected to db");
    }
    catch(err){
      console.log("error")
    
    }
    console.log(`server is running at port ${process.env.port}`)
})