// routes/appointment.routes.js
import express from "express"
import rateLimit from "express-rate-limit"
import { createAppointment, getAppointments, updateAppointmentStatus }
    from "../controllers/appointment.controller.js"
import { isAdmin } from "../middlewares/isAdmin.js"



const appointmentRouter = express.Router()

const bookingLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 })

appointmentRouter.post("/book-appointment", bookingLimiter, createAppointment)      // public
appointmentRouter.get("/get-appointments", isAdmin, getAppointments)      // admin
appointmentRouter.put("/:id/status", isAdmin, updateAppointmentStatus)     // admin

export default appointmentRouter