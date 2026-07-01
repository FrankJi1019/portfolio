import { useCallback, useMemo, type FC } from "react"
import type { CertificationsResponse } from "../../types/portfolio"
import CertificationsPage from "./CertificationsPage"
import PageLoader from "../../components/PageLoader"
import { useFetchContentSection, useUpdateContentSection } from "../../api-hooks/content-section"
import { useAuth } from "../../providers/AuthProvider"

const CertificationsPageBuilder: FC = () => {
  const { userRole } = useAuth()
  const { data, refetch } = useFetchContentSection("certifications")

  const { mutateAsync } = useUpdateContentSection()

  const handleSave = useCallback(async (data: CertificationsResponse) => {
    await mutateAsync({
      content: data,
      section: "certifications",
    })
    await refetch()
  }, [mutateAsync])

  const isLoading = useMemo(() => !data, [data])

  if (isLoading) {
    return <PageLoader />
  }

  return <CertificationsPage content={data} onSave={handleSave} userRole={userRole} />
}

export default CertificationsPageBuilder
