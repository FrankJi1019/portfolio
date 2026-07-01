import { useCallback, useMemo, type FC } from "react"
import type { SkillsResponse } from "../../types/portfolio"
import SkillsPage from "./SkillsPage"
import PageLoader from "../../components/PageLoader"
import { useFetchContentSection, useUpdateContentSection } from "../../api-hooks/content-section"
import { useAuth } from "../../providers/AuthProvider"

const SkillsPageBuilder: FC = () => {
  const { userRole } = useAuth()
  const { data, refetch } = useFetchContentSection("skills")

  const { mutateAsync } = useUpdateContentSection()

  const handleSave = useCallback(async (data: SkillsResponse) => {
    await mutateAsync({
      content: data,
      section: "skills",
    })
    await refetch()
  }, [mutateAsync])

  const isLoading = useMemo(() => !data, [data])

  if (isLoading) {
    return <PageLoader />
  }

  return <SkillsPage content={data} onSave={handleSave} userRole={userRole} />
}

export default SkillsPageBuilder
