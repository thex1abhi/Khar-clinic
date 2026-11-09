import Appointment from "./components/Appointment"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import { FaWhatsapp } from "react-icons/fa"

function App() {
  return (
    <div className="min-h-screen bg-white font-['DM_Sans',Arial,sans-serif] text-base leading-[1.6] text-[#12212d]">
      <a
        className="fixed bottom-5 right-5 z-20 flex items-center justify-center gap-2 rounded-full bg-[#168c45] px-[17px] py-3 text-[13px] font-extrabold text-white no-underline max-[800px]:bottom-3 max-[800px]:right-3"
        target="_blank"
        href="https://wa.me/919820190878"
      >
        <FaWhatsapp size={16} />
        WhatsApp
      </a>
      <Navbar />
      <Home />
      <Appointment />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
