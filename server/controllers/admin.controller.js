import { genToken } from "../configs/token.js"
import Admin from "../model/admin.model.js"
import bcrypt from "bcrypt"

export const adminAuth = async (req, res) => {

    try {
        const { phone, password } = req.body
        if (!phone || !password) {
            return res.status(400).json({ message: "Phone and password required" })
        }
        let admin = await Admin.findOne({ phone })
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        let token = await genToken(admin._id)
        res.cookie("token", token, {
            httpOnly: true, //false in production 
            secure: false, //true in production 
            sameSite: "strict", //none in production 
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            _id: admin._id,
            phone: admin.phone,
            role: "admin",
        })
    } catch (error) {
        return res.status(500).json({
            message: ` auth error ${error} ` //change to internal server error for security this is for verification only 
        })
    }

}
export const logout = async (req, res) => {
    try {
        await res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        })
        return res.status(200).json({ message: "Logout successfull " })
    } catch (error) {
        return res.status(400).json({ message: `Logout Failed ${error} ` })
    }

}