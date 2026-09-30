import type { FC } from "react"

interface SectionVisibilityToggleProps {
  label: string
  isVisible: boolean
  onToggle: () => void
  disabled?: boolean
}

const SectionVisibilityToggle: FC<SectionVisibilityToggleProps> = ({ label, isVisible, onToggle, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={isVisible}
    aria-label={`Show ${label} section on portfolio`}
    title={isVisible ? `${label} is shown on the portfolio` : `${label} is hidden from the portfolio`}
    onClick={onToggle}
    disabled={disabled}
    className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed ${isVisible ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
  >
    <span className={`inline-block h-3 w-3 rounded-full bg-white shadow transition-transform ${isVisible ? "translate-x-3.5" : "translate-x-0.5"}`} />
  </button>
)

export default SectionVisibilityToggle
