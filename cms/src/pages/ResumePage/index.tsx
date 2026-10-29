import { useCallback, useMemo, type FC } from "react"
import type { ResumeData } from "../../types/portfolio"
import ResumePage from "./ResumePage"
import PageLoader from "../../components/PageLoader"
import { useFetchResumes, useSyncResume } from "../../api-hooks/resume"
import { useAuth } from "../../providers/AuthProvider"

const ResumePageBuilder: FC = () => {
  const { userRole } = useAuth()
  const { data } = useFetchResumes()
  const { mutateAsync } = useSyncResume()

  const handleSync = useCallback(async (fileId: string) => {
    await mutateAsync(fileId)
  }, [mutateAsync])

  // The API doesn't track which file was last synced, so default to the first file.
  const content = useMemo<ResumeData | undefined>(
    () => data && { files: data, selectedFileId: data[0]?.id ?? "" },
    [data],
  )

  if (!content) {
    return <PageLoader />
  }

  return <ResumePage content={content} onSync={handleSync} userRole={userRole} />
}

export default ResumePageBuilder
