const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signup = async (req,res)=>{
    const {fullname,email,password} = req.body;
    try {
        const exists = await User.findOne({email:email});
        if(exists){
            return res.status(400).json({msg:"User already exists"})
        }
        else{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    const createdUser = await User.create({
                        fullname,
                        email,
                        password:hash
                    })
                    var token = jwt.sign(email,process.env.SECRET)
                    res.status(200).json({email,token});
                });
            });
           
        }
    } catch (error) {
        res.status(200).json({msg:"Something went wrong"})
    }
}

const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email:email});
        if(user){
            bcrypt.compare(password, user.password, async function(err, result) {
                if(result == true){
                    // res.status(200).json(user.email)
                    var token = jwt.sign(email,process.env.SECRET)
                    res.status(200).json({email,token});
                }
                else{
                    res.status(400).json({msg:"Incorrect credentials"});
                }
            });
        }
        else{
            res.status(400).json({msg:"User doesn't exist"})
        }
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

module.exports = {
    signup,
    login
}