const Hospital = require("../models/hospitalModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getHospitals = async (req,res)=>{
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
}

const hospitalSignup = async (req,res)=>{
    const {name,email,password,city} = req.body;
    try {
        const exists = await Hospital.findOne({email:email});
        if(exists){
            return res.status(400).json({msg:"Hospital already exists"})
        }
        else{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    const createdHospital = await Hospital.create({
                        name,
                        email,
                        password:hash,
                        city
                    })
                    var token = jwt.sign(email,process.env.SECRET)
                    res.status(200).json({email,token});
                });
            });
           
        }
    } catch (error) {
        res.status(200).json({msg:error.message})
    }
}

const hospitalLogin = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const hospital = await Hospital.findOne({email:email});
        if(hospital){
            bcrypt.compare(password, hospital.password, async function(err, result) {
                if(result == true){
                    // res.status(200).json(Hospital.email)
                    var token = jwt.sign(email,process.env.SECRET)
                    res.status(200).json({email,token});
                }
                else{
                    res.status(400).json("Incorrect credentials");
                }
            });
        }
        else{
            res.status(400).json({msg:"Hospital doesn't exist"})
        }
    } catch (error) {
        res.status(400).json({msg:error.message});
    }
}

module.exports = {
    getHospitals,
    hospitalSignup,
    hospitalLogin
}