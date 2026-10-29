// Dates are stored as "mm/yyyy"; shown as-is in tile subheadings.
export const formatDateRange = (startDate: string, endDate: string, isOngoing?: boolean) => {
  if (!startDate) return ""
  const end = isOngoing || !endDate ? "Present" : endDate
  return `${startDate} – ${end}`
}

export const joinSubheading = (...parts: (string | undefined)[]) =>
  parts.filter((part) => part?.trim()).join(" · ")
