import React from "react";

function Contact() {
    return <>
        <section className="py-[90px]" id="contact">
            <div className="mx-auto grid w-[92%] max-w-[1120px] grid-cols-2 items-center gap-[90px] max-[800px]:grid-cols-1 max-[800px]:gap-[38px]">
                <div>
                    <label className="mb-[13px] block text-[11px] font-extrabold tracking-[2px] text-[#1769aa]">CONTACT</label>
                    <h2 className="my-[0.83em] font-['Manrope'] text-[40px] leading-[1.15] font-bold tracking-[-1px] max-[800px]:text-[33px]">We&apos;re here to help.</h2>
                    <p className="text-[#667582]"><b>Address</b><br />Khar Pipeline road k.p sharma chawl, Mumbai, Maharashtra</p>
                    <p className="text-[#667582]"><b>Phone</b><br /><a className="text-[#1769aa] no-underline" href="tel:+919876543210">+91 9820198078</a></p>
                    <p className="text-[#667582]"><b>Email</b><br /><a className="text-[#1769aa] no-underline" href="mailto:hello@carepointclinic.in">qsayed80@gmail.com</a></p>
                </div>
                <div className="flex min-h-[290px] flex-col items-center justify-center rounded-[20px] bg-[#eef3f6] text-center">
                    <div className="text-[43px] text-[#1769aa]">⌖</div>
                    <h3 className="my-[1em] text-[18px] font-bold">Khar Piles Clinic</h3>
                    <p className="mb-5 text-[#667582]">Mumbai, Maharashtra</p>
                    <a className="inline-flex items-center justify-center rounded-[9px] border border-[#ccd7df] bg-white px-[18px] py-3 text-[14px] font-bold no-underline" target="_blank" href="https://www.google.com/maps/place/Khar+Piles+Clinic/@19.0684849,72.8420124,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c97da52eef63:0xf01ae19090df579f!8m2!3d19.0684798!4d72.8445873!16s%2Fg%2F11ptllkzbl?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D">Open Google Maps</a>
                </div>
            </div>
        </section>
    </>
}

export default Contact;
