import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const isAdmin = async (req, res, next) => {
    try {

        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({ message: ` Token not found` })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(400).json({ message: `admin does not has a valid token ` })
        }
        if (verifyToken.role !== "admin") {
            return res.status(403).json({ message: "Request denied" })
        }
        req.adminId = verifyToken.userId

        next()
    } catch (error) {
        console.log(`isAuth error : ${error}`);
        return res.status(500).json({ message: `IsAuth error ${error} ` })
    }
}