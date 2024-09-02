const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
      default: null,
    }
  },
  { timestamps: true }
);

AppointmentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
