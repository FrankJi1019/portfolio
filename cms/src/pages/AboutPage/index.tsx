import { useCallback, useMemo, type FC } from "react"
import type { AboutResponse } from "../../types/portfolio"
import AboutPage from "./AboutPage"
import PageLoader from "../../components/PageLoader"
import { useFetchContentSection, useUpdateContentSection } from '../../api-hooks/content-section'

const AboutPageBuilder: FC = () => {

  const { data, refetch } = useFetchContentSection('about')

  const { mutateAsync } = useUpdateContentSection()

  const handleSave = useCallback(async (data: AboutResponse) => {
    await mutateAsync({
      content: data,
      section: 'about'
    })
    await refetch()
  }, [mutateAsync])

  const isLoading = useMemo(() => !data, [data])

  if (isLoading) {
    return <PageLoader />
  }

  return <AboutPage content={data} onSave={handleSave} />
}

export default AboutPageBuilder
