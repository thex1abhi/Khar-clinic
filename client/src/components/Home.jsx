import React from "react";

function Home() {
    return <>
        <main>
            <section className="bg-[linear-gradient(135deg,#f1f8fd,#fff_70%)] py-[100px] max-[800px]:py-[65px]">
                <div className="mx-auto grid w-[92%] max-w-[1120px] grid-cols-[1.12fr_0.88fr] items-center gap-20 max-[800px]:grid-cols-1 max-[800px]:gap-[38px]">
                    <div>
                        <label className="mb-[13px] block text-[11px] font-extrabold tracking-[2px] text-[#1769aa]">PATIENT-FIRST HEALTHCARE</label>
                        <h1 className="mb-[22px] mt-0 font-['Manrope'] text-[clamp(46px,6vw,72px)] leading-[1.03] font-extrabold tracking-[-2.5px] max-[800px]:text-[48px]">
                            Healthcare you can <em className="not-italic text-[#1769aa]">trust.</em>
                        </h1>
                        <p className="max-w-[580px] text-[19px] text-[#667582]">Professional consultation for piles in a comfortable, welcoming clinic environment.</p>
                        <div className="my-[30px] flex gap-3">
                            <a className="inline-flex items-center justify-center rounded-[9px] border border-[#1769aa] bg-[#1769aa] px-[18px] py-3 text-[14px] font-bold text-white no-underline" href="#appointment">Book an Appointment →</a>
                            <a className="inline-flex items-center justify-center rounded-[9px] border border-[#ccd7df] bg-white px-[18px] py-3 text-[14px] font-bold no-underline" href="tel:+919876543210">Call Clinic</a>
                        </div>
                        <div className="mt-10 flex gap-[38px] max-[800px]:flex-wrap max-[800px]:gap-5">
                            <span className="flex flex-col text-[12px] text-[#667582]"><b className="font-['Manrope'] text-[22px] font-extrabold text-[#12212d]">30+</b>Years experience</span>
                            <span className="flex flex-col text-[12px] text-[#667582]"><b className="font-['Manrope'] text-[22px] font-extrabold text-[#12212d]">5,000+</b>Patients served</span>
                            <span className="flex flex-col text-[12px] text-[#667582]"><b className="font-['Manrope'] text-[22px] font-extrabold text-[#12212d]">6 Days</b>Open weekly</span>
                        </div>
                    </div>
                    <aside className="flex min-h-[410px] flex-col items-center justify-center rounded-[26px] bg-[#e7f2f9] text-center shadow-[0_24px_60px_#1769aa1f] max-[800px]:min-h-[310px]">
                        <div className="mb-[22px] grid size-[148px] place-items-center rounded-full bg-[#1769aa] font-['Manrope'] text-[38px] font-extrabold text-white">DR</div>
                        <small className="text-[24px] font-extrabold tracking-[2px]">Qasim Mastan Sayed</small>
                        <h2 className="my-[5px] font-['Manrope'] text-[26px] leading-[1.15] font-bold tracking-[-1px]"></h2>
                        <p className="text-[#667582]"> BAMS  </p>
                        <strong className="rounded-full mt-3 bg-white px-[15px] py-[9px] text-[12px]">● Appointments available</strong>
                    </aside>
                </div>
            </section>
            <section className="py-[90px]" id="about">
                <div className="mx-auto grid w-[92%] max-w-[1120px] grid-cols-2 items-center gap-[90px] max-[800px]:grid-cols-1 max-[800px]:gap-[38px]">
                    <div>
                        <label className="mb-[13px] block text-[11px] font-extrabold tracking-[2px] text-[#1769aa]">ABOUT KHAR PILES CLINIC</label>
                        <h2 className="my-[0.83em] font-['Manrope'] text-[40px] leading-[1.15] font-bold tracking-[-1px] max-[800px]:text-[33px]">Good healthcare starts with listening.</h2>
                        <p className="text-[#667582]">Khar Piles Clinic is built around clear communication, respectful care and convenient access to medical consultation.</p>
                        <ul className="grid list-none gap-[9px] p-0 font-semibold">
                            <li className="before:mr-[10px] before:text-[#1769aa] before:content-['✓']">Easy appointment requests</li>
                            <li className="before:mr-[10px] before:text-[#1769aa] before:content-['✓']">Patient-friendly consultation</li>
                            <li className="before:mr-[10px] before:text-[#1769aa] before:content-['✓']">Convenient clinic timings</li>
                        </ul>
                    </div>
                    <aside className="rounded-[20px] border border-[#e2e9ef] bg-white p-[34px]">
                        <small className="font-extrabold tracking-[2px]">CLINIC HOURS</small>
                        <h3 className="my-[15px] mb-[2px] text-[18px] font-bold">Monday – Saturday</h3>
                        <p className="text-[#667582]">9:00 AM –   9:00 PM</p>
                        <hr className="my-[22px] border-0 border-t border-[#e2e9ef]" />
                        <h3 className="my-[15px] mb-[2px] text-[18px] font-bold">Sunday</h3>
                        <p className="text-[#667582]"> 9:00 AM –   9:00 PM </p>
                    </aside>
                </div>
            </section>
            <section className="bg-[#f5f9fc] py-[90px]" id="services">
                <div className="mx-auto w-[92%] max-w-[1120px]">
                    <label className="mb-[13px] block text-[11px] font-extrabold tracking-[2px] text-[#1769aa]">SERVICES</label>
                    <h2 className="my-[0.83em] font-['Manrope'] text-[40px] leading-[1.15] font-bold tracking-[-1px] max-[800px]:text-[33px]">Focused on your everyday health.</h2>
                    <div className="mt-[35px] grid grid-cols-3 gap-5 max-[800px]:grid-cols-1">
                        <article className="rounded-[17px] border border-[#e2e9ef] bg-white p-7">
                            <b className="grid size-11 place-items-center rounded-[11px] bg-[#e7f2f9] text-[21px] text-[#1769aa]">+</b>
                            <h3 className="mb-[7px] mt-[18px] text-[18px] font-bold">General Consultation</h3>
                            <p className="text-[14px] text-[#667582]">Consultation and guidance for common health concerns and routine needs.</p>
                        </article>
                        <article className="rounded-[17px] border border-[#e2e9ef] bg-white p-7">
                            <b className="grid size-11 place-items-center rounded-[11px] bg-[#e7f2f9] text-[21px] text-[#1769aa]">♥</b>
                            <h3 className="mb-[7px] mt-[18px] text-[18px] font-bold">Preventive Care</h3>
                            <p className="text-[14px] text-[#667582]">Health check-ups and practical guidance focused on prevention and wellbeing.</p>
                        </article>
                        <article className="rounded-[17px] border border-[#e2e9ef] bg-white p-7">
                            <b className="grid size-11 place-items-center rounded-[11px] bg-[#e7f2f9] text-[21px] text-[#1769aa]">✓</b>
                            <h3 className="mb-[7px] mt-[18px] text-[18px] font-bold">Follow-up Care</h3>
                            <p className="text-[14px] text-[#667582]">Ongoing consultations and follow-up support for existing patients.</p>
                        </article>
                    </div>
                </div>
            </section>
            <section className="py-[90px]" id="doctor">
                <div className="mx-auto grid w-[92%] max-w-[1120px] grid-cols-[280px_1fr] items-center gap-[55px] max-[800px]:grid-cols-1 max-[800px]:gap-[38px]">
                    <div className="m-0 grid size-[250px] place-items-center rounded-full bg-[#1769aa] font-['Manrope'] text-[38px] font-extrabold text-white max-[800px]:size-[190px]">DR</div>
                    <div>
                        <label className="mb-[13px] block text-[11px] font-extrabold tracking-[2px] text-[#1769aa]">MEET THE DOCTOR</label>
                        <h2 className="my-[0.83em] font-['Manrope'] text-[40px] leading-[1.15] font-bold tracking-[-1px] max-[800px]:text-[33px]">Dr.Qasim Mastan Sayed </h2>
                        <strong className="text-[#1769aa]">BAMS</strong>
                        <p className="text-[#667582]">Dr. Qasim Mastan Sayed provides patient-friendly consultations</p>
                        <a className="font-extrabold text-[#1769aa] no-underline" href="#appointment">Schedule a consultation →</a>
                    </div>
                </div>
            </section>


        </main>
    </>
}

export default Home;
