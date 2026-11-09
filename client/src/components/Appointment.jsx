import React, { useState } from "react";

function Appointment() {
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus("");

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData.entries())),
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "We could not submit your request. Please try again.");
            }

            form.reset();
            setStatus("Your appointment request has been sent. The clinic will contact you.");
        } catch (error) {
            setStatus(error.message || "We could not submit your request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return <>
        <section className="bg-[#f5f9fc] py-[90px]" id="appointment">
            <div className="mx-auto grid w-[92%] max-w-[1120px] grid-cols-2 items-center gap-[90px] max-[800px]:grid-cols-1 max-[800px]:gap-[38px]">
                <div>
                    <label className="mb-[13px] block text-[11px] font-extrabold tracking-[2px] text-[#1769aa]">APPOINTMENTS</label>
                    <h2 className="my-[0.83em] font-['Manrope'] text-[40px] leading-[1.15] font-bold tracking-[-1px] max-[800px]:text-[33px]">Request an appointment.</h2>
                    <p className="text-[#667582]">Submit your details below. The clinic can contact you to confirm the appointment.</p>
                </div>
                <form className="grid gap-[18px] rounded-[20px] border border-[#e2e9ef] bg-white p-[30px] shadow-[0_18px_45px_#12212d0d] max-[800px]:p-[22px]" id="form" onSubmit={handleSubmit}>
                    <label className="m-0 block text-[13px] font-bold tracking-normal text-[#12212d]">Name<input className="mt-[6px] block w-full rounded-[9px] border border-[#cdd8e0] bg-[#fbfdfe] px-[14px] py-[13px] font-[inherit] text-[#12212d] transition-[border-color,box-shadow,background] duration-200 placeholder:text-[#94a2ad] focus:border-[#1769aa] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1769aa1a]" name="name" required maxLength="80" placeholder="Your full name" /></label>
                    <label className="m-0 block text-[13px] font-bold tracking-normal text-[#12212d]">Phone<input className="mt-[6px] block w-full rounded-[9px] border border-[#cdd8e0] bg-[#fbfdfe] px-[14px] py-[13px] font-[inherit] text-[#12212d] transition-[border-color,box-shadow,background] duration-200 placeholder:text-[#94a2ad] focus:border-[#1769aa] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1769aa1a]" name="phone" required maxLength="20" placeholder="+91 98765 43210" /></label>
                    <label className="m-0 block text-[13px] font-bold tracking-normal text-[#12212d]">Preferred date<input className="mt-[6px] block w-full rounded-[9px] border border-[#cdd8e0] bg-[#fbfdfe] px-[14px] py-[13px] font-[inherit] text-[#12212d] transition-[border-color,box-shadow,background] duration-200 focus:border-[#1769aa] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1769aa1a]" name="date" type="date" required /></label>
                    <label className="m-0 block text-[13px] font-bold tracking-normal text-[#12212d]">Message <small className="tracking-normal text-[#667582]">(optional)</small><textarea className="mt-[6px] block min-h-[112px] w-full resize-y rounded-[9px] border border-[#cdd8e0] bg-[#fbfdfe] px-[14px] py-[13px] font-[inherit] text-[#12212d] transition-[border-color,box-shadow,background] duration-200 placeholder:text-[#94a2ad] focus:border-[#1769aa] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1769aa1a]" name="message" maxLength="500" rows="4" placeholder="Reason for visit" /></label>
                    <button className="mt-[2px] w-full cursor-pointer rounded-[9px] border border-[#1769aa] bg-[#1769aa] px-[18px] py-3 text-[14px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Submit Appointment Request"}</button>
                    <div className="min-h-[25px] text-[13px] text-[#1769aa]" id="msg" role="status" aria-live="polite">{status}</div>
                </form>
            </div>
        </section>
    </>
}

export default Appointment;
