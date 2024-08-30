const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
const dotenv = require("dotenv")

const requireAuth = async (req,res,next)=>{
    
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error:"Authorization token required"});
    }

    const token = authorization.split(' ')[1]
    

    try {

       const email = jwt.verify(token,process.env.SECRET)
       req.user = await User.findOne({email:email}).select('_id')
       next();

    } catch (error) {
        console.log(error)
        res.status(401).json({error:"Request is not authorized"})
    }

}

module.exports = requireAuth;