import { useCallback, useMemo, type FC } from "react"
import type { ContactResponse } from "../../types/portfolio"
import ContactPage from "./ContactPage"
import PageLoader from "../../components/PageLoader"
import { useFetchContentSection, useUpdateContentSection } from "../../api-hooks/content-section"
import { useAuth } from "../../providers/AuthProvider"

const ContactPageBuilder: FC = () => {
  const { userRole } = useAuth()
  const { data, refetch } = useFetchContentSection("contact")

  const { mutateAsync } = useUpdateContentSection()

  const handleSave = useCallback(async (data: ContactResponse) => {
    await mutateAsync({
      content: data,
      section: "contact",
    })
    await refetch()
  }, [mutateAsync])

  const isLoading = useMemo(() => !data, [data])

  if (isLoading) {
    return <PageLoader />
  }

  return <ContactPage content={data} onSave={handleSave} userRole={userRole} />
}

export default ContactPageBuilder
