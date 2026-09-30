import { useCallback } from "react"
import { isAxiosError } from "axios"
import { TOGGLEABLE_SECTIONS, type SectionId, type VisibilityResponse } from "../types/portfolio"
import { useFetchContentSection, useUpdateContentSection } from "../api-hooks/content-section"

const SECTION = "visibility"

// The portfolio treats a missing visibility file as "show everything", so the CMS mirrors that default.
const ALL_VISIBLE = Object.fromEntries(
  TOGGLEABLE_SECTIONS.map(({ id }) => [id, true])
) as VisibilityResponse["sections"]

// The sections Lambda responds 400 when the S3 object doesn't exist yet.
const isNotCreatedYet = (error: unknown) =>
  isAxiosError(error) && (error.response?.status === 400 || error.response?.status === 404)

export const useSectionVisibility = () => {
  const { data, error, isPending, refetch } = useFetchContentSection(SECTION, { retry: false })
  const { mutateAsync, isPending: isSaving } = useUpdateContentSection()

  const hasLoadError = !!error && !isNotCreatedYet(error)
  // Spread over defaults so sections added after the file was last saved still have a value.
  const visibility: VisibilityResponse["sections"] = { ...ALL_VISIBLE, ...(data as VisibilityResponse | undefined)?.sections }

  const setVisibility = useCallback(async (id: SectionId, isVisible: boolean) => {
    const content: VisibilityResponse = { sections: { ...visibility, [id]: isVisible } }
    await mutateAsync({ content, section: SECTION })
    await refetch()
  }, [visibility, mutateAsync, refetch])

  return {
    visibility,
    isReady: !isPending && !hasLoadError,
    isSaving,
    setVisibility,
  }
}
