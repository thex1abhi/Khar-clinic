import { useState } from "react";
import axios from "axios";
import { ServerUrl } from "../App";
import toast from "react-hot-toast";

const labelClass = "block text-[13px] font-bold text-[#12212d]";
const fieldClass =
    "mt-1.5 block w-full rounded-[9px] border border-[#cdd8e0] bg-[#fbfdfe] px-3.5 py-3 text-[#12212d] placeholder:text-[#94a2ad] transition focus:border-[#1769aa] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1769aa1a]";

const timeSlots = ["9:00 AM - 12:00 PM", "12:00 PM - 3:00 PM", "3:00 PM - 6:00 PM", "6:00 PM - 9:00 PM"];

const today = new Date().toISOString().split("T")[0];

function Appointment() {

    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        setIsSubmitting(true);
        try {
            const data = Object.fromEntries(new FormData(form));
            await axios.post(`${ServerUrl}/api/appointments/book-appointment`, data);
            form.reset();
            toast.success("Your appointment request has been sent. The clinic will contact you.")
        } catch (error) {
            toast.error("We could not submit your request. Please try again.")
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="appointment" className="bg-[#f5f9fc] py-[90px]">
            <div className="mx-auto grid w-[92%] max-w-[1120px] grid-cols-2 items-center gap-[90px] max-[800px]:grid-cols-1 max-[800px]:gap-[38px]">
                <div>
                    <p className="mb-3 text-[11px] font-extrabold tracking-[2px] text-[#1769aa]">APPOINTMENTS</p>
                    <h2 className="my-[0.83em] font-['Manrope'] text-[40px] font-bold leading-[1.15] tracking-[-1px] max-[800px]:text-[33px]">
                        Request an appointment.
                    </h2>
                    <p className="text-[#667582]">
                        Submit your details below. The clinic can contact you to confirm the appointment.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-[18px] rounded-[20px] border border-[#e2e9ef] bg-white p-[30px] shadow-[0_18px_45px_#12212d0d] max-[800px]:p-[22px]"
                >
                    <label className={labelClass}>
                        Name
                        <input className={fieldClass} name="name" maxLength={80} placeholder="Your full name" required />
                    </label>

                    <label className={labelClass}>
                        Phone
                        <input className={fieldClass} name="phone" type="tel" maxLength={20} placeholder="+91 98765 43210" required />
                    </label>

                    <label className={labelClass}>
                        Preferred date
                        <input className={fieldClass} name="date" type="date" min={today} required />
                    </label>

                    <label className={labelClass}>
                        Preferred time
                        <select className={fieldClass} name="timeSlot" defaultValue="" required>
                            <option value="" disabled>Select a time slot</option>
                            {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </label>

                    <label className={labelClass}>
                        Message <small className="text-[#667582]">(optional)</small>
                        <textarea className={`${fieldClass} min-h-[112px] resize-y`} name="message" rows={4} maxLength={500} placeholder="Reason for visit" />
                    </label>

                    <button
                        disabled={isSubmitting}
                        className="w-full cursor-pointer rounded-[9px] border border-[#1769aa] bg-[#1769aa] px-[18px] py-3 text-[14px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Sending..." : "Submit Appointment Request"}
                    </button>

                </form>
            </div>
        </section>
    );
}

export default Appointment;