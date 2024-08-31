const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    fullname:{
        type:String,
        requied:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        requied:true
    }
})

module.exports = mongoose.model("Admin",adminSchema)