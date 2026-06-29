import { useState } from "react"
import { mockPortfolio } from "../data/mockPortfolio"
import { PageHeader } from "../components/FormControls"

const AboutPage = () => {
  const [about, setAbout] = useState(mockPortfolio.about)

  return (
    <div className="max-w-2xl h-full flex flex-col">
      <PageHeader title="About" description="Your bio displayed in the About section." onRevert={() => setAbout(mockPortfolio.about)} />
      <label className="flex flex-col flex-1 min-h-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 block">Bio</span>
        <textarea
          className="flex-1 w-full border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 text-sm leading-relaxed resize-none bg-white dark:bg-[#1a1d24] shadow-sm dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 dark:focus:border-blue-500 transition-all placeholder:text-gray-300"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </label>
    </div>
  )
}

export default AboutPage
