const express = require("express")
const adminAuth = require("../middlewares/requireAdminAuth")
const {adminLogin, hospitalSignup} = require("../controllers/adminController")

const router = express.Router()

// router.use(adminAuth)

router.post("/login",adminLogin)

router.post("/signuphospital",adminAuth,hospitalSignup)

module.exports = router;