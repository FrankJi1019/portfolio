import { useCallback, useMemo, type FC } from "react"
import type { EducationResponse } from "../../types/portfolio"
import EducationPage from "./EducationPage"
import PageLoader from "../../components/PageLoader"
import { useFetchContentSection, useUpdateContentSection } from "../../api-hooks/content-section"

const EducationPageBuilder: FC = () => {
  const { data, refetch } = useFetchContentSection("education")

  const { mutateAsync } = useUpdateContentSection()

  const handleSave = useCallback(async (data: EducationResponse) => {
    await mutateAsync({
      content: data,
      section: "education",
    })
    await refetch()
  }, [mutateAsync])

  const isLoading = useMemo(() => !data, [data])

  if (isLoading) {
    return <PageLoader />
  }

  return <EducationPage content={data} onSave={handleSave} />
}

export default EducationPageBuilder
