const express = require("express");
const {getHospitals, hospitalSignup, hospitalLogin}  = require("../controllers/hospitalController")

const router = express.Router();

router.get("/",getHospitals);

router.post("/login",hospitalLogin);

module.exports = router;