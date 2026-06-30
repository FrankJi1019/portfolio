import { useState, type FC } from "react"
import { useForm, Controller } from "react-hook-form"
import type { ResumeData } from "../../types/portfolio"
import { PageHeader, Tooltip, SaveNotification } from "../../components/FormControls"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileLines } from "@fortawesome/free-solid-svg-icons"

interface ResumePageProps {
  content: ResumeData
  onSync: (fileId: string) => Promise<void> | void
}

const ResumePage: FC<ResumePageProps> = ({ content, onSync }) => {
  const { control, watch } = useForm<ResumeData>({
    defaultValues: content,
  })

  const [isSyncing, setIsSyncing] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const selectedFileId = watch("selectedFileId")

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      await onSync(selectedFileId)
      setShowNotification(true)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="max-w-md">
      <SaveNotification isVisible={showNotification} onDismiss={() => setShowNotification(false)} />
      <PageHeader title="Resume" />

      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 block">Select file from Google Drive</span>
          <Controller
            name="selectedFileId"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                {content.files.map((file) => (
                  <label key={file.id} className={`flex items-center gap-3 px-5 py-4 rounded-xl border cursor-pointer transition-all duration-150 ${field.value === file.id ? "border-blue-300 dark:border-blue-600 bg-gradient-to-r from-blue-50/80 to-blue-50/60 dark:from-blue-950/30 dark:to-blue-950/20 shadow-sm" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1d24] hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"}`}>
                    <input type="radio" name="file" value={file.id} checked={field.value === file.id} onChange={() => field.onChange(file.id)} className="accent-blue-600" />
                    <FontAwesomeIcon icon={faFileLines} className={`text-sm ${field.value === file.id ? "text-blue-500" : "text-gray-300 dark:text-gray-600"}`} />
                    <span className={`text-sm ${field.value === file.id ? "text-blue-700 dark:text-blue-300 font-medium" : "text-gray-600 dark:text-gray-300"}`}>{file.name}</span>
                  </label>
                ))}
              </div>
            )}
          />
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
      </div>
    </div>
  )
}

export default ResumePage
