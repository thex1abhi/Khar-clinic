// controllers/appointment.controller.js
import Appointment from "../model/appointment.model.js"

// PUBLIC: patient books
export const createAppointment = async (req, res) => {
    try {
        const { name, phone,  date, timeSlot, message } = req.body
        if (!name || !phone || !date ) {
            return res.status(400).json({ message: "Missing required fields" })
        }


        const appointment = await Appointment.create({
            name, phone,  date, timeSlot, message,
        })
        return res.status(201).json({ message: "Appointment request submitted", id: appointment._id })
    } catch (error) {
        return res.status(500).json({ message: `Booking error ${error}` })
    }
}

// ADMIN: list (optional ?status=pending)
export const getAppointments = async (req, res) => {
    try {
        const filter = req.query.status ? { status: req.query.status } : {}
        const appointments = await Appointment.find(filter).sort({ date: 1 })
        return res.status(200).json(appointments)
    } catch (error) {
        return res.status(500).json({ message: `Fetch error ${error}` })
    }
} 

// ADMIN: approve / reject
export const updateAppointmentStatus = async (req, res) => {
    try {   
        const { status } = req.body
        if (!["confirmed", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" })
        }
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id, { status }, { new: true }
        )
        if (!appointment) return res.status(404).json({ message: "Appointment not found" })
        return res.status(200).json(appointment)
    } catch (error) {
        return res.status(500).json({ message: `Update error ${error}` })
    }
}