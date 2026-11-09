
import "dotenv/config";
import express from "express";
import twilio from "twilio";

const app = express();
const port = process.env.PORT || 3000;
const requiredConfig = [
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_FROM_NUMBER",
    "APPOINTMENT_NOTIFICATION_NUMBER",
];
const missingConfig = requiredConfig.filter((key) => !process.env[key]);
const twilioClient = missingConfig.length === 0
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

if (missingConfig.length > 0) {
    console.error(`SMS notifications are not configured. Missing: ${missingConfig.join(", ")}`);
}

app.use(express.json({ limit: "10kb" }));

app.post("/api/appointments", async (req, res) => {
    if (!twilioClient) {
        return res.status(503).json({ error: "Appointment notifications are not configured yet." });
    }

    const { name, phone, date, message = "" } = req.body ?? {};
    const normalizedPhone = typeof phone === "string" ? phone.replace(/[\s()-]/g, "") : "";
    const parsedDate = typeof date === "string" ? new Date(`${date}T00:00:00Z`) : null;

    if (
        typeof name !== "string" ||
        !name.trim() ||
        name.trim().length > 80 ||
        !/^\+[1-9]\d{7,14}$/.test(normalizedPhone) ||
        typeof date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(parsedDate?.getTime()) ||
        parsedDate.toISOString().slice(0, 10) !== date ||
        (typeof message !== "string" || message.length > 500)
    ) {
        return res.status(400).json({ error: "Please provide a valid name, phone number, date, and message." });
    }

    try {
        const smsBody = [
            "New appointment request",
            `Name: ${name.trim()}`,
            `Phone: ${normalizedPhone}`,
            `Preferred date: ${date}`,
            message.trim() ? `Message: ${message.trim()}` : null,
        ].filter(Boolean).join("\n");

        await twilioClient.messages.create({
            body: smsBody,
            from: process.env.TWILIO_FROM_NUMBER,
            to: process.env.APPOINTMENT_NOTIFICATION_NUMBER,
        });

        return res.status(200).json({ message: "Appointment request sent successfully." });
    } catch (error) {
        console.error("Failed to send appointment notification:", error.message);
        return res.status(502).json({ error: "We could not send your request right now. Please try again." });
    }
});

app.listen(port, () => {
    console.log(` server listening on port ${port}`);
});
