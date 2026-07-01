import { useCallback, useMemo, type FC } from "react"
import type { ResumeData } from "../../types/portfolio"
import ResumePage from "./ResumePage"
import PageLoader from "../../components/PageLoader"
import { useFetchResumes, useSyncResume } from "../../api-hooks/resume"
import { useAuth } from "../../providers/AuthProvider"

const MOCK_CONTENT: ResumeData = {
  files: [
    {
      mimeType: "application/vnd.google-apps.document",
      parents: ["1325FDep0RL4SOwwkWBg-2yljw4TUGCnD"],
      id: "11ivV9GR6KgWIBlKK49TuFjwwuarBURJpQ8x42r-AtLM",
      name: "Frank-Ji-CV",
    },
    {
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      parents: ["1325FDep0RL4SOwwkWBg-2yljw4TUGCnD"],
      id: "1d0eO7YhUWKFnYrFfjjzVWSDHcicA4mlm",
      name: "FrankJi Resume.docx",
    },
  ],
  selectedFileId: "11ivV9GR6KgWIBlKK49TuFjwwuarBURJpQ8x42r-AtLM",
}

const ResumePageBuilder: FC = () => {
  const { userRole } = useAuth()
  const { data } = useFetchResumes()
  const { mutateAsync } = useSyncResume()

  const handleSync = useCallback(async (fileId: string) => {
    await mutateAsync(fileId)
  }, [mutateAsync])

  const isLoading = useMemo(() => !data, [data])

  if (isLoading) {
    return <PageLoader />
  }

  return <ResumePage content={MOCK_CONTENT} onSync={handleSync} userRole={userRole} />
}

export default ResumePageBuilder
