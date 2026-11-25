
import express from "express"
import { adminAuth, logout } from "../controllers/admin.controller.js"


const adminRoute = express.Router()


adminRoute.post("/login", adminAuth)
adminRoute.get("/logout", logout)

export default adminRoute