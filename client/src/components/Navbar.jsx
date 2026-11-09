import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-[#e2e9ef] bg-[#fffffff5] backdrop-blur-[12px]">
        <div className="mx-auto flex h-[76px] w-[92%] max-w-[1120px] items-center gap-7 max-[800px]:h-[70px]">
          <a className="mr-auto flex items-center gap-[10px] font-['Manrope'] text-[20px] font-extrabold no-underline" href="#">
            <b className="grid size-[34px] place-items-center rounded-[9px] bg-[#1769aa] text-[24px] text-white">+</b>
            <span>
            Khar Piles
              <small className="block font-['DM_Sans'] text-[8px] font-extrabold tracking-[2px] text-[#667582]">CLINIC Since 1992</small>
            </span>
          </a>
          <button
            type="button"
            className="hidden border-0 bg-transparent text-[24px] max-[800px]:block"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
          <nav
            id="mobile-navigation"
            className={`flex gap-[25px] text-[14px] font-semibold max-[800px]:absolute max-[800px]:left-[4%] max-[800px]:right-[4%] max-[800px]:top-full max-[800px]:flex-col max-[800px]:gap-0 max-[800px]:border-t max-[800px]:border-[#e2e9ef] max-[800px]:bg-white max-[800px]:px-5 max-[800px]:py-3 max-[800px]:shadow-lg ${isMenuOpen ? "max-[800px]:flex" : "max-[800px]:hidden"}`}
          >
            <a className="no-underline hover:text-[#1769aa] max-[800px]:py-2" href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a className="no-underline hover:text-[#1769aa] max-[800px]:py-2" href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a className="no-underline hover:text-[#1769aa] max-[800px]:py-2" href="#doctor" onClick={() => setIsMenuOpen(false)}>Doctor</a>
            <a className="no-underline hover:text-[#1769aa] max-[800px]:py-2" href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <a className="hidden items-center justify-center rounded-[9px] border border-[#1769aa] bg-[#1769aa] px-[18px] py-3 text-center font-bold text-white no-underline max-[800px]:mt-2 max-[800px]:inline-flex" href="#appointment" onClick={() => setIsMenuOpen(false)}>Book Appointment</a>
          </nav>
          <a className="inline-flex items-center justify-center rounded-[9px] border border-[#1769aa] bg-[#1769aa] px-[18px] py-3 text-[14px] font-bold text-white no-underline max-[800px]:hidden" href="#appointment">Book Appointment</a>
        </div>
    </header>
  )
}

export default Navbar;
