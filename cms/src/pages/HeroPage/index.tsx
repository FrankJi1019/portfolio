import { useCallback, useMemo, type FC } from "react"
import type { HeroResponse } from "../../types/portfolio"
import HeroPage from "./HeroPage"
import PageLoader from "../../components/PageLoader"
import { useFetchContentSection, useUpdateContentSection } from "../../api-hooks/content-section"

const HeroPageBuilder: FC = () => {
  const { data, refetch } = useFetchContentSection("hero")

  const { mutateAsync } = useUpdateContentSection()

  const handleSave = useCallback(async (data: HeroResponse) => {
    await mutateAsync({
      content: data,
      section: "hero",
    })
    await refetch()
  }, [mutateAsync])

  const isLoading = useMemo(() => !data, [data])

  if (isLoading) {
    return <PageLoader />
  }

  return <HeroPage content={data} onSave={handleSave} />
}

export default HeroPageBuilder
