import { useCallback, useMemo, type FC } from "react"
import type { MetaData } from "../../types/portfolio"
import SeoPage from "./SeoPage"
import PageLoader from "../../components/PageLoader"
import { useFetchContentSection, useUpdateContentSection } from "../../api-hooks/content-section"

const SeoPageBuilder: FC = () => {
  const { data, refetch } = useFetchContentSection("seo")

  const { mutateAsync } = useUpdateContentSection()

  const handleSave = useCallback(async (data: MetaData) => {
    await mutateAsync({
      content: data,
      section: "seo",
    })
    await refetch()
  }, [mutateAsync])

  const isLoading = useMemo(() => !data, [data])

  if (isLoading) {
    return <PageLoader />
  }

  return <SeoPage content={data} onSave={handleSave} />
}

export default SeoPageBuilder
