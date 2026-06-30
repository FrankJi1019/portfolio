import { Route, Routes, Navigate } from "react-router-dom"
import { Routes as AppRoutes } from "./routes/routes"
import Sidebar from "./components/Sidebar"
import HeroPage from "./pages/HeroPage"
import AboutPage from "./pages/AboutPage"
import ExperiencePage from "./pages/ExperiencePage"
import EducationPage from "./pages/EducationPage"
import ProjectsPage from "./pages/ProjectsPage"
import SkillsPage from "./pages/SkillsPage"
import CertificationsPage from "./pages/CertificationsPage"
import ContactPage from "./pages/ContactPage"
import SeoPage from "./pages/SeoPage"
import ResumePage from "./pages/ResumePage"


const App = () => {
  return (
    <div className="flex h-screen bg-[#fafbfc] dark:bg-[#0f1117]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-10">
        <Routes>
          <Route path={AppRoutes.HERO.path} element={<HeroPage />} />
          <Route path={AppRoutes.ABOUT.path} element={<AboutPage />} />
          <Route path={AppRoutes.EXPERIENCE.path} element={<ExperiencePage />} />
          <Route path={AppRoutes.EDUCATION.path} element={<EducationPage />} />
          <Route path={AppRoutes.PROJECTS.path} element={<ProjectsPage />} />
          <Route path={AppRoutes.SKILLS.path} element={<SkillsPage />} />
          <Route path={AppRoutes.CERTIFICATIONS.path} element={<CertificationsPage />} />
          <Route path={AppRoutes.CONTACT.path} element={<ContactPage />} />
          <Route path={AppRoutes.SEO.path} element={<SeoPage />} />
          <Route path={AppRoutes.RESUME.path} element={<ResumePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
