
import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        deafault:"admin",
    }

}, { timestamps: true })

const Admin = mongoose.model("Admin", adminSchema)

export default Admin;