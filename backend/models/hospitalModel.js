const mongoose = require("mongoose")

const HospitalSchema = new mongoose.Schema({    
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{
      type:String,
      required:true
    },
    city:{
        type:String,
        required:true,
    }
  });


module.exports = mongoose.model('Hospital', HospitalSchema);