const Admin = require("../models/adminModel")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

dotenv.config();

mongoose.connect(process.env.URI).then(() => {
    console.log('Connected to the database');
    createAdmin();
}).catch((error) => {
    console.error('Database connection error:', error);
});

const createAdmin = async ()=>{
    const fullname = "demo"
    const email = "demo@mail.com"
    const password = "12345"

    try {
        const existingAdmin = await Admin.findOne({ email});

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }
        else{
           
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    const createdAdmin= await Admin.create({
                        fullname,
                        email,
                        password:hash
                    })
                    var token = jwt.sign({email},process.env.SECRET)

                    console.log('Admin created successfully:', { email, token });

                    process.exit(0);
                });
            });

        }


    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}
