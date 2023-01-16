
const jwt =require ("jsonwebtoken")

require("dotenv").config()

const authentation=(req,res,next) =>{

    const token=req.headers.token

    if(!token) 
        return res.send("plz login")

        const decoded=jwt.verify(token,process.env.key)
        
        const userID=decoded.userID
        req.body.userID=userID
        console.log(decoded)

        next()
    
}


module.exports={authentation}