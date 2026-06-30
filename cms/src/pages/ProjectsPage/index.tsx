import { useCallback, useMemo, type FC } from "react"
import type { ProjectsResponse } from "../../types/portfolio"
import ProjectsPage from "./ProjectsPage"
import PageLoader from "../../components/PageLoader"
import { useFetchContentSection, useUpdateContentSection } from "../../api-hooks/content-section"

const ProjectsPageBuilder: FC = () => {
  const { data, refetch } = useFetchContentSection("projects")

  const { mutateAsync } = useUpdateContentSection()

  const handleSave = useCallback(async (data: ProjectsResponse) => {
    await mutateAsync({
      content: data,
      section: "projects",
    })
    await refetch()
  }, [mutateAsync])

  const isLoading = useMemo(() => !data, [data])

  if (isLoading) {
    return <PageLoader />
  }

  return <ProjectsPage content={data} onSave={handleSave} />
}

export default ProjectsPageBuilder
