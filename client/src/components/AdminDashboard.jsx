import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaSignOutAlt,
  FaSyncAlt,
  FaUserInjured,
} from "react-icons/fa"
import { ServerUrl } from "../App"


// const getError = (error, fallback) => error.response?.data?.message || fallback

const toMonthKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

const statusStyles = {
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
}

function formatDate(value) {
  const [year, month, day] = String(value || "").slice(0, 10).split("-").map(Number)
  if (!year || !month || !day) return "Date not available"
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const inputClass =
  "rounded-xl border border-[#dce5eb] bg-[#fbfdfe] px-4 py-3.5 text-sm font-medium outline-none transition focus:border-[#25847d] focus:ring-4 focus:ring-[#25847d]/10"

const cardClass = "rounded-2xl border border-[#e5ebf0] bg-white shadow-[0_5px_18px_#12212d05]"



function LoginScreen({ onLogin }) {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    const success = await onLogin(phone, password)
    if (!success) setIsLoading(false)
  }

  return (
    <main className="grid min-h-screen bg-[#f4f7fb] p-5 lg:grid-cols-[1.05fr_0.95fr] lg:p-0">
      <section className="relative hidden overflow-hidden bg-[#102e43] px-[9vw] py-16 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-36 -top-32 size-[520px] rounded-full border border-white/10" />
        <div className="absolute -right-16 -top-12 size-[360px] rounded-full border border-white/10" />

        <a href="/" className="relative z-10 flex w-fit items-center gap-3 text-white no-underline">
          <span className="grid size-11 place-items-center rounded-xl bg-[#2b8a83] text-2xl font-bold">+</span>
          <span className="font-['Manrope'] text-lg font-extrabold leading-tight">
            Khar Piles Clinic
            <small className="mt-1 block text-[9px] font-bold tracking-[2px] text-white/55">ADMINISTRATION</small>
          </span>
        </a>

        <div className="relative z-10 max-w-xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold tracking-[1.5px] text-[#9bd6ce]">
            <FaCheckCircle />  CLINIC ADMIN PORTAL
          </span>
          <h1 className="font-['Manrope'] text-5xl font-extrabold leading-[1.15] tracking-[-2px]">
            Care begins with a clear view.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-white/65">
            Review appointment requests, follow monthly activity, and keep your clinic moving smoothly.
          </p>

        </div>

        <p className="relative z-10 m-0 text-xs text-white/40">Khar Piles  Clinic · Since 1992</p>
      </section>

      <section className="flex items-center justify-center">
        <div className="w-full max-w-[430px] rounded-[26px] border border-[#e4eaf0] bg-white p-8 shadow-[0_24px_70px_#102e4310] sm:p-11">
          <a href="/" className="mb-9 inline-flex items-center gap-2 text-sm font-bold text-[#557082] no-underline hover:text-[#1769aa] lg:hidden">
            <span className="grid size-8 place-items-center rounded-lg bg-[#1769aa] text-lg text-white">+</span>
            Khar Clinic
          </a>

          <div className="mb-8">
            <p className="mb-2 text-[11px] font-extrabold tracking-[2px] text-[#25847d]">ADMIN PORTAL</p>
            <h2 className="m-0 font-['Manrope'] text-[30px] font-extrabold leading-tight tracking-[-1px] text-[#142b3a]">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-[#738391]">Sign in with your admin credentials to view appointments.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <label className="grid gap-2 text-[13px] font-bold text-[#263e4d]">
              Admin phone
              <input
                className={inputClass}
                type="tel"
                autoComplete="username"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>

            <label className="grid gap-2 text-[13px] font-bold text-[#263e4d]">
              Password
              <input
                className={inputClass}
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              disabled={isLoading}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#1769aa] px-4 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_18px_#1769aa2b] transition hover:bg-[#125b94] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in…" : "Sign in securely"}
              {!isLoading && <FaChevronRight size={11} />}
            </button>
          </form>

          <p className="mt-7 mb-0 text-center text-xs text-[#8795a0]">Authorized clinic administrators only</p>
        </div>
      </section>
    </main>
  )
}


function AdminDashboard() {
  const [appointments, setAppointments] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [isBusy, setIsBusy] = useState(false)
  const [month, setMonth] = useState(() => toMonthKey(new Date()))
  const [search, setSearch] = useState("")

  async function loadAppointments() {
    const { data } = await axios.get(`${ServerUrl}/api/appointments/get-appointments`, {
      withCredentials: true,
    })
    setAppointments(data)
    setIsAuthenticated(true)
  }

  useEffect(() => {
    let ignore = false

    async function checkSession() {
      try {
        const { data } = await axios.get(`${ServerUrl}/api/appointments/get-appointments`, {
          withCredentials: true
        })
        if (ignore) return
        setAppointments(data)
        setIsAuthenticated(true)
      } catch (error) {
        if (!ignore && error.response?.status !== 401) {
          toast.error("Could not load appointments")
        }
      } finally {
        if (!ignore) setIsCheckingSession(false)
      }
    }

    checkSession()

    return () => {
      ignore = true
    }
  }, [])

  async function handleLogin(phone, password) {
    try {
      await axios.post(`${ServerUrl}/api/admin/login`, { phone, password }, {
        withCredentials: true
      })
      await loadAppointments()
      toast.success("Signed in")
      return true
    } catch (error) {
      toast.error("Login failed")
      return false
    }
  }

  async function handleLogout() {
    setIsBusy(true)
    try {
      await axios.get(`${ServerUrl}/api/admin/logout`, {
        withCredentials: true
      })
      setIsAuthenticated(false)
      setAppointments([])
      toast.success("Signed out")
    } catch (error) {
      toast.error("Logout failed")
    } finally {
      setIsBusy(false)
    }
  }

  async function handleRefresh() {
    setIsBusy(true)
    try {
      await loadAppointments()
      toast.success("Appointments updated")
    } catch (error) {
      toast.error("Could not refresh appointments")
      if (error.response?.status === 401) setIsAuthenticated(false)
    } finally {
      setIsBusy(false)
    }
  }

  function changeMonth(offset) {
    const [year, monthNumber] = month.split("-").map(Number)
    setMonth(toMonthKey(new Date(year, monthNumber - 1 + offset, 1)))
  }

  const monthAppointments = useMemo(
    () => appointments.filter((a) => String(a.date || "").slice(0, 7) === month),
    [appointments, month],
  )

  const visibleAppointments = useMemo(() => {
    const query = search.trim().toLowerCase()
    return monthAppointments
      .filter(
        (a) =>
          !query ||
          String(a.name || "").toLowerCase().includes(query) ||
          String(a.phone || "").toLowerCase().includes(query),
      )
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  }, [monthAppointments, search])

  const counts = useMemo(() => {
    const result = { total: monthAppointments.length, pending: 0, approved: 0, rejected: 0 }
    monthAppointments.forEach((a) => {
      if (a.status === "approved") result.approved++
      else if (a.status === "rejected") result.rejected++
      else result.pending++
    })
    return result
  }, [monthAppointments])

  const dailyCounts = useMemo(() => {
    const [year, monthNumber] = month.split("-").map(Number)
    const days = Array(new Date(year, monthNumber, 0).getDate()).fill(0)
    monthAppointments.forEach((a) => {
      const day = Number(String(a.date || "").slice(8, 10))
      if (day >= 1 && day <= days.length) days[day - 1]++
    })
    return days
  }, [month, monthAppointments])

  const maxDaily = Math.max(...dailyCounts, 1)

  const monthLabel = new Date(`${month}-01T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const stats = [
    { label: "Appointments", value: counts.total, icon: <FaCalendarAlt />, color: "bg-sky-50 text-sky-700" },
    { label: "Awaiting review", value: counts.pending, icon: <FaClock />, color: "bg-amber-50 text-amber-700" },
    { label: "Approved", value: counts.approved, icon: <FaCheckCircle />, color: "bg-emerald-50 text-emerald-700" },
    { label: "Rejected", value: counts.rejected, icon: <FaUserInjured />, color: "bg-rose-50 text-rose-700" },
  ]

  if (isCheckingSession) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f7fb] text-sm font-semibold text-[#667582]">
        Checking secure admin session…
      </main>
    )
  }

  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />

  return (
    <main className="min-h-screen bg-[#f5f8fb] text-[#172d3a]">
      <header className="border-b border-[#e5ebf0] bg-white">
        <div className="mx-auto flex min-h-[76px] w-[94%] max-w-[1320px] items-center gap-4">
          <a href="/" className="mr-auto flex items-center gap-3 text-[#172d3a] no-underline">
            <span className="grid size-10 place-items-center rounded-xl bg-[#1769aa] text-2xl font-bold text-white">+</span>
            <span className="font-['Manrope'] text-base font-extrabold leading-tight">
              Khar Piles  Clinic
              <small className="mt-1 block text-[9px] font-bold tracking-[1.5px] text-[#83919c]">ADMIN DASHBOARD</small>
            </span>
          </a>

          <span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:inline-flex">
            <span className="size-2 rounded-full bg-emerald-500" /> Secure session
          </span>

          <button
            onClick={handleLogout}
            disabled={isBusy}
            className="inline-flex items-center gap-2 rounded-lg border border-[#dce5eb] bg-white px-3 py-2 text-xs font-bold text-[#526978] transition hover:border-rose-200 hover:text-rose-700 disabled:opacity-50 sm:px-4 sm:text-sm cursor-pointer"
          >
            <FaSignOutAlt /> <span className="hidden sm:inline cursor-pointer ">Logout</span>
          </button>
        </div>
      </header>

      <div className="mx-auto w-[94%] max-w-[1320px] py-8 sm:py-10">
        {/* Title + month picker */}
        <section className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-extrabold tracking-[2px] text-[#25847d]">CLINIC OVERVIEW</p>
            <h1 className="m-0 font-['Manrope'] text-[30px] font-extrabold leading-tight tracking-[-1px] sm:text-[36px]">
              Appointment dashboard
            </h1>
            <p className="mt-2 mb-0 text-sm text-[#738391]">A clear monthly view of your patients and incoming requests.</p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-[#e1e8ed] bg-white p-1.5 sm:self-auto">
            <button title="Previous month" onClick={() => changeMonth(-1)} className="grid size-9 place-items-center rounded-lg text-[#637783] hover:bg-[#f1f5f8]">
              <FaChevronLeft size={12} />
            </button>
            <span className="min-w-[130px] text-center text-sm font-extrabold">{monthLabel}</span>
            <button title="Next month" onClick={() => changeMonth(1)} className="grid size-9 place-items-center rounded-lg text-[#637783] hover:bg-[#f1f5f8]">
              <FaChevronRight size={12} />
            </button>
            <button onClick={() => setMonth(toMonthKey(new Date()))} className="ml-1 rounded-lg bg-[#edf5f8] px-3 py-2 text-xs font-extrabold text-[#1769aa] hover:bg-[#e1eef4]">
              Today
            </button>
          </div>
        </section>

        {/* Stat cards */}
        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat) => (
            <article key={stat.label} className={`${cardClass} p-4 sm:p-5`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#748591] sm:text-sm">{stat.label}</span>
                <span className={`grid size-9 place-items-center rounded-xl ${stat.color}`}>{stat.icon}</span>
              </div>
              <p className="mt-4 mb-0 font-['Manrope'] text-[28px] font-extrabold leading-none tracking-[-1px]">{stat.value}</p>
              <p className="mt-2 mb-0 text-[11px] text-[#98a4ad]">in {monthLabel}</p>
            </article>
          ))}
        </section>

        {/* Daily chart */}
        <section className={`${cardClass} mb-6 p-5 sm:p-6`}>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h2 className="m-0 font-['Manrope'] text-base font-extrabold">Monthly activity</h2>
              <p className="mt-1 mb-0 text-xs text-[#8795a0]">Appointment requests by day · {monthLabel}</p>
            </div>
            <span className="rounded-lg bg-[#f1f6f9] px-3 py-1.5 text-xs font-bold text-[#617786]">{counts.total} total</span>
          </div>

          <div className="flex h-[145px] items-end gap-[3px] border-b border-[#edf1f4] px-1 sm:gap-1">
            {dailyCounts.map((count, index) => {
              const day = index + 1
              const showDay = day === 1 || day % 5 === 0 || day === dailyCounts.length
              const label = `${count} appointment${count === 1 ? "" : "s"}`
              return (
                <div key={day} title={`${day}: ${label}`} className="group relative flex h-full min-w-0 flex-1 flex-col items-center justify-end">
                  <span className="pointer-events-none absolute bottom-full mb-1 hidden whitespace-nowrap rounded-md bg-[#172d3a] px-2 py-1 text-[10px] text-white group-hover:block">
                    {label}
                  </span>
                  <div
                    className={`w-full max-w-[22px] rounded-t-[4px] transition-colors ${count ? "bg-[#328f91] hover:bg-[#1769aa]" : "bg-[#edf2f5]"}`}
                    style={{ height: `${count ? Math.max(8, (count / maxDaily) * 100) : 4}%` }}
                  />
                  <span className="absolute top-full mt-2 h-3 text-[9px] text-[#8795a0]">{showDay ? day : ""}</span>
                </div>  
              )
            })}
          </div>
        </section>

        <section className={`${cardClass} overflow-hidden`}>
          <div className="flex flex-col gap-4 border-b border-[#edf1f4] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="m-0 font-['Manrope'] text-base font-extrabold">Appointments</h2>
              <p className="mt-1 mb-0 text-xs text-[#8795a0]">{visibleAppointments.length} booking for {monthLabel}</p>
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Search patient or phone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="min-w-0 flex-1 rounded-lg border border-[#e0e8ed] bg-[#fbfdfe] px-3 py-2 text-sm outline-none focus:border-[#25847d] sm:w-[230px] sm:flex-none"
              />
              <button
                title="Refresh appointments"
                onClick={handleRefresh}
                disabled={isBusy}
                className="grid cursor-pointer size-10 shrink-0 place-items-center rounded-lg border border-[#e0e8ed] text-[#617786] hover:bg-[#f4f8fa] disabled:opacity-50"
              >
                <FaSyncAlt size={13} className={isBusy ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          {visibleAppointments.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#f0f6f8] text-[#67949a]"><FaCalendarAlt /></span>
              <h3 className="mt-4 mb-1 text-sm font-extrabold">No appointments found</h3>
              <p className="m-0 text-xs text-[#8795a0]">
                {search ? "Try another patient name or phone number." : `There are no bookings for ${monthLabel}.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[690px] border-collapse text-left">
                <thead className="bg-[#f8fafb] text-[10px] font-extrabold tracking-[1px] text-[#81909a]">
                  <tr>
                    <th className="px-6 py-3.5">PATIENT</th>
                    <th className="px-5 py-3.5">DATE &amp; TIME</th>
                    <th className="px-5 py-3.5">STATUS</th>
                    <th className="px-5 py-3.5">MESSAGE</th> 
                    <th className="px-5 py-3.5">Confirm/Reject</th> 
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf1f4]">
                  {visibleAppointments.map((a) => {
                    const status = a.status || "pending"
                    return (
                      <tr key={a._id} className="transition hover:bg-[#fbfdfe]">
                        <td className="px-6 py-4">
                          <p className="m-0 text-sm font-bold text-[#263e4d]">{a.name || "Unnamed patient"}</p>
                          <p className="mt-1 mb-0 text-xs text-[#83919c]">{a.phone || "No phone provided"}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="m-0 text-sm font-semibold text-[#354c5a]">{formatDate(a.date)}</p>
                          <p className="mt-1 mb-0 text-xs text-[#83919c]">{a.timeSlot || "Time not specified"}</p>
                        </td>
                       
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-extrabold capitalize ring-1 ring-inset ${statusStyles[status] || statusStyles.pending}`}>
                            {status}
                          </span>
                        </td>
                         <td className="max-w-[280px] px-5 py-4 text-xs leading-5 text-[#71818d]">{a.message || "—"}</td>
                         <td className="">
                          <div className="flex items-center gap-4 ">
                            <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer " >Confirm </button>
                            <button className="rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ">Reject</button>
                          </div>
                         </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="mt-5 mb-0 text-center text-[11px] text-[#9aa6af]">
          Patient information is confidential. Sign out when you’re finished.
        </p>
      </div>
    </main>
  )
}

export default AdminDashboard