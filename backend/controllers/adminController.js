const Admin = require("../models/adminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Hospital = require("../models/hospitalModel")

 const adminLogin = async (req,res)=>{
    const {email,password} = req.body
    
    try {
        const admin = await Admin.findOne({email:email});
        if(admin){
            bcrypt.compare(password, admin.password, async function(err, result) {
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
            res.status(400).json({msg:"Admin doesn't exist"})
        }
    } catch (error) {
        res.status(400).json({err:error.message})
    }
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

const deleteHospital = async(req,res) =>{
    const id = req.params.id;

    const deletedHospital = await Hospital.findByIdAndDelete(id);
    
    if(deletedHospital){
        res.status(200).json(deletedHospital)
    }else{
        res.status(400).json({msg:"Something went wrong"})
    }
}


module.exports = {
    adminLogin,
    hospitalSignup,
    deleteHospital
}