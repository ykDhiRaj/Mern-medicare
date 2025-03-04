const express = require("express");
const { signup, getInsurances } = require("../controllers/insuranceController");
const requireAdminAuth = require("../middlewares/requireAdminAuth");

const router = express.Router();

router.post("/signup",requireAdminAuth,signup);  

router.get('/get-insurances',getInsurances)

module.exports = router;

