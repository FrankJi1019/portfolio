import { useState } from "react"
import { PageHeader, Tooltip } from "../components/FormControls"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileLines } from "@fortawesome/free-solid-svg-icons"

const MOCK_FILES = [
  "Frank-Ji-CV.docx",
  "Frank-Ji-CV-Frontend.docx",
  "Frank-Ji-CV-Fullstack.docx",
]

const ResumePage = () => {
  const [selected, setSelected] = useState(MOCK_FILES[0])
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState<string | null>(null)

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      setLastSynced(new Date().toLocaleString())
    }, 1500)
  }

  return (
    <div className="max-w-md">
      <PageHeader title="Resume" />

      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 block">Select file from Google Drive</span>
          <div className="space-y-2">
            {MOCK_FILES.map((file) => (
              <label key={file} className={`flex items-center gap-3 px-5 py-4 rounded-xl border cursor-pointer transition-all duration-150 ${selected === file ? "border-blue-300 dark:border-blue-600 bg-gradient-to-r from-blue-50/80 to-blue-50/60 dark:from-blue-950/30 dark:to-blue-950/20 shadow-sm" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1d24] hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"}`}>
                <input type="radio" name="file" value={file} checked={selected === file} onChange={() => setSelected(file)} className="accent-blue-600" />
                <FontAwesomeIcon icon={faFileLines} className={`text-sm ${selected === file ? "text-blue-500" : "text-gray-300 dark:text-gray-600"}`} />
                <span className={`text-sm ${selected === file ? "text-blue-700 dark:text-blue-300 font-medium" : "text-gray-600 dark:text-gray-300"}`}>{file}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-500 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200/40 dark:shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSyncing ? "Syncing..." : "Sync Resume"}
          </button>
          <Tooltip text="Sync your resume from Google Drive to S3." />
        </div>

        {lastSynced && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 inline-block px-3 py-1.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/30">✓ Last synced: {lastSynced}</p>
        )}
      </div>
    </div>
  )
}

export default ResumePage
