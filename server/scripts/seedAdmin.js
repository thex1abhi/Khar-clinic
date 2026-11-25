
// scripts/seedAdmin.js
import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import Admin from "../model/admin.model.js"

const run = async () => {
    await mongoose.connect(process.env.MONGODB_URL) // use your own env name
    const { ADMIN_PHONE, ADMIN_PASSWORD } = process.env

    if (!ADMIN_PHONE || !ADMIN_PASSWORD) {
        console.log("Set ADMIN_PHONE and ADMIN_PASSWORD in .env")
        process.exit(1)
    }

    const existing = await Admin.findOne({ phone: ADMIN_PHONE })
    if (existing) {
        console.log("Admin already exists")
        process.exit(0)
    }

    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 12)
    await Admin.create({ phone: ADMIN_PHONE, password: hashed })
    console.log("Admin created")
    process.exit(0)
}

run()