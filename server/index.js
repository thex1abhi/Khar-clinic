import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./configs/connectDB.js"
import appointmentRouter from "./routes/appointment.routes.js"
import adminRoute from "./routes/admin.routes.js"


const app = express() 

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}
))
const PORT = process.env.PORT || 3000 

app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => {
    res.json("Hello from server ")
})

app.use("/api/appointments", appointmentRouter)
app.use("/api/admin", adminRoute)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
    connectDB()
}) 