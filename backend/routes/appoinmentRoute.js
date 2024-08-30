const express = require("express")
const {createAppointment, getuserAppointments, gethospitalAppointmentsRequest, deleteAppointmentrequest, updateAppointmentStatus}  = require("../controllers/appointmentController");
const requireAuth = require("../middlewares/requireAuth");


const router = express.Router();

// router.use(requireAuth)

router.post("/:hospitalid",requireAuth,createAppointment)

router.get("/",requireAuth,getuserAppointments)

router.get("/:hospitalEmail",requireAuth,gethospitalAppointmentsRequest)

router.delete("/:appid",requireAuth,deleteAppointmentrequest)

router.put("/:appid/status",requireAuth,updateAppointmentStatus)


module.exports = router;