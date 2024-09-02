const express = require("express")
const adminAuth = require("../middlewares/requireAdminAuth")
const {adminLogin, hospitalSignup, deleteHospital} = require("../controllers/adminController")

const router = express.Router()

// router.use(adminAuth)

router.post("/login",adminLogin)

router.post("/signuphospital",adminAuth,hospitalSignup)

router.delete("/deletehospital/:id",adminAuth,deleteHospital)

module.exports = router;