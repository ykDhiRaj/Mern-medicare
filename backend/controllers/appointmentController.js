const Appointment  = require("../models/appointmentModel")
const Hospital = require("../models/hospitalModel")

const createAppointment = async (req,res)=>{
    const user = req.user._id;
    const hospitalId = req.params.hospitalid;

    try {

        const existingAppointment = await Appointment.findOne({ user, hospital: hospitalId });

        if (existingAppointment) {
            return res.status(400).json({ message: "You already requested an appointment at this hospital." });
        }
        else{
            const newAppointment = await Appointment.create({
                user,
                hospital:hospitalId
            })
            res.status(200).json(newAppointment);

        }
        
    } catch (error) {
        res.status(400).json({err:error.msg})
    }
}

const getuserAppointments = async (req,res)=>{
    const user = req.user._id
    try {
        const usersAppointments = await Appointment.find({user}).populate('hospital','name city email');
        res.status(200).json(usersAppointments)
        
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const gethospitalAppointmentsRequest = async(req,res)=>{
    const hospitalEmail = req.params.hospitalEmail;
    const hospital = await Hospital.findOne({email:hospitalEmail})

    try {

        const hospitalAppointmentsRequest = await Appointment.find({ hospital: hospital._id }).populate('user', 'fullname email');     
        if(hospitalAppointmentsRequest.length > 0){
            res.status(200).json(hospitalAppointmentsRequest)
        }else{
            res.status(400).json({msg:"No requests yet"})
        } 
        
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

const deleteAppointmentrequest = async(req,res)=>{
    const appointmentId = req.params.appid;

    const deletedRequest = await Appointment.findByIdAndDelete(appointmentId);

    res.status(200).json(deletedRequest);

}

const updateAppointmentStatus = async (req,res)=>{
    const appointmentId = req.params.appid;
    const status = req.query.status; 

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status: status },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


module.exports = {
    createAppointment,
    getuserAppointments,
    gethospitalAppointmentsRequest,
    deleteAppointmentrequest,
    updateAppointmentStatus
}