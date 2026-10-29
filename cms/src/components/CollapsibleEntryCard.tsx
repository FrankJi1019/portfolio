import { useId, useState, type FC, type ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons"

interface CollapsibleEntryCardProps {
  heading: string
  subheading?: string
  placeholderHeading: string
  children: ReactNode
  onRemove: () => void
  disabled?: boolean
  headerActions?: ReactNode
  isMuted?: boolean
}

const CollapsibleEntryCard: FC<CollapsibleEntryCardProps> = ({
  heading,
  subheading,
  placeholderHeading,
  children,
  onRemove,
  disabled,
  headerActions,
  isMuted,
}) => {
  // Collapsed by default to keep tiles short for drag-and-drop. Entries without a heading
  // (e.g. just added) start open so they can be filled in. Only read on mount.
  const [isOpen, setIsOpen] = useState(() => !heading.trim())
  const bodyId = useId()

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-[#1a1d24] shadow-sm hover:shadow-md dark:hover:shadow-xl dark:hover:shadow-black/10 transition-all duration-200 border-l-[3px] border-l-blue-400 dark:border-l-blue-500">
      <div className="flex items-center gap-2 px-6 py-4">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls={bodyId}
          className="flex flex-1 min-w-0 items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-lg"
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`text-[10px] text-gray-400 dark:text-gray-500 transition-transform duration-150 ${isOpen ? "rotate-90" : ""}`}
          />
          <span className={`min-w-0 ${isMuted ? "opacity-50" : ""}`}>
            <span className="block truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
              {heading.trim() || <span className="italic font-normal text-gray-400 dark:text-gray-500">{placeholderHeading}</span>}
            </span>
            {subheading && (
              <span className="block truncate text-xs text-gray-400 dark:text-gray-500 mt-0.5">{subheading}</span>
            )}
          </span>
        </button>
        {headerActions}
        {!disabled && (
          <button
            type="button"
            onClick={onRemove}
            className="w-7 h-7 shrink-0 flex items-center justify-center rounded-full text-gray-300 dark:text-gray-600 hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-150 hover:scale-110"
            title="Remove"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xs" />
          </button>
        )}
      </div>
      {isOpen && (
        <div id={bodyId} className="px-6 pb-6">
          {children}
        </div>
      )}
    </div>
  )
}

export default CollapsibleEntryCard
