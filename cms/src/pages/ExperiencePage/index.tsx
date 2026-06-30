import { useCallback, useMemo, type FC } from "react"
import type { ExperienceResponse } from "../../types/portfolio"
import ExperiencePage from "./ExperiencePage"
import PageLoader from "../../components/PageLoader"
import { useFetchContentSection, useUpdateContentSection } from "../../api-hooks/content-section"

const ExperiencePageBuilder: FC = () => {
  const { data, refetch } = useFetchContentSection("experience")

  const { mutateAsync } = useUpdateContentSection()

  const handleSave = useCallback(async (data: ExperienceResponse) => {
    await mutateAsync({
      content: data,
      section: "experience",
    })
    await refetch()
  }, [mutateAsync])

  const isLoading = useMemo(() => !data, [data])

  if (isLoading) {
    return <PageLoader />
  }

  return <ExperiencePage content={data} onSave={handleSave} />
}

export default ExperiencePageBuilder
