import { NavLink } from "react-router-dom"
import { Routes } from "../routes/routes"
import { useTheme } from "../providers/ThemeProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faBriefcase, faGraduationCap, faCode, faCubes, faCertificate, faAddressBook, faMagnifyingGlass, faFileArrowUp, faFeather, faCircleHalfStroke, faCloudArrowUp, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

const navItems: { path: string; label: string; icon: IconDefinition }[] = [
  { ...Routes.HERO, icon: faStar },
  { ...Routes.ABOUT, icon: faFeather },
  { ...Routes.EXPERIENCE, icon: faBriefcase },
  { ...Routes.EDUCATION, icon: faGraduationCap },
  { ...Routes.PROJECTS, icon: faCode },
  { ...Routes.SKILLS, icon: faCubes },
  { ...Routes.CERTIFICATIONS, icon: faCertificate },
  { ...Routes.CONTACT, icon: faAddressBook },
  { ...Routes.SEO, icon: faMagnifyingGlass },
  { ...Routes.RESUME, icon: faFileArrowUp },
]

const Sidebar = () => {
  const { isDark, toggle } = useTheme()

  return (
    <aside className="w-64 border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-[#13151a] py-6 px-5 flex flex-col shrink-0">
      {/* Brand */}
      <div className="mb-8 px-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L28.5 9V23L16 30L3.5 23V9L16 2Z" stroke="currentColor" strokeWidth="1.5" className="text-blue-500" />
              <path d="M11 10H21M11 10V22M11 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-blue-500" />
              <circle cx="21" cy="10" r="1.5" fill="currentColor" className="text-blue-500" />
              <circle cx="18" cy="16" r="1.5" fill="currentColor" className="text-blue-500" />
              <circle cx="11" cy="22" r="1.5" fill="currentColor" className="text-blue-500" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Portfolio CMS</h1>
            <a href="https://www.frankji.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-400 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">frankji.com</a>
          </div>
        </div>
      </div>

      {/* Sync / Revert */}
      <div className="flex gap-2 px-3 mb-6">
        <div className="relative group flex-1">
          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all shadow-sm hover:shadow-md">
            <FontAwesomeIcon icon={faCloudArrowUp} className="text-[10px]" />
            Sync
          </button>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-[10px] rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            Promote staged changes to online
          </span>
        </div>
        <div className="relative group flex-1">
          <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all">
            <FontAwesomeIcon icon={faRotateLeft} className="text-[10px]" />
            Revert
          </button>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-[10px] rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            Revert all changes since last sync
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${isActive ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-sm shadow-blue-100/50 dark:shadow-none" : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"}`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="w-3.5 text-[11px] opacity-60 group-hover:opacity-100 transition-opacity" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="mt-4 mx-3 flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
      >
        <FontAwesomeIcon icon={faCircleHalfStroke} className="w-3.5 text-[11px] opacity-60" />
        {isDark ? "Light mode" : "Dark mode"}
      </button>
    </aside>
  )
}

export default Sidebar
