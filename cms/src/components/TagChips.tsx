import type { FC } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

interface TagChipsProps {
  items: string[]
  onChange: (items: string[]) => void
  disabled?: boolean
  isSortable?: boolean
}

interface TagChipProps {
  id: string
  label: string
  onRemove: () => void
  disabled?: boolean
  isSortable?: boolean
}

// Items are plain strings that may repeat, so number repeats to keep ids unique and stable across reorders.
const toIds = (items: string[]) => {
  const seen = new Map<string, number>()
  return items.map((item) => {
    const count = seen.get(item) ?? 0
    seen.set(item, count + 1)
    return `${item}__${count}`
  })
}

const TagChip: FC<TagChipProps> = ({ id, label, onRemove, disabled, isSortable }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !isSortable,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <span
      ref={setNodeRef}
      style={style}
      {...(isSortable ? { ...attributes, ...listeners, "aria-roledescription": "sortable skill" } : {})}
      className={`inline-flex items-center gap-1.5 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 text-xs font-medium pl-3 pr-2 py-1.5 rounded-full border border-blue-200/80 dark:border-blue-700/50 shadow-sm hover:shadow-md transition-shadow duration-150 ${isSortable ? "cursor-grab active:cursor-grabbing touch-none" : "cursor-default hover:scale-[1.03]"}`}
    >
      {label}
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          // Keep Enter/Space on this button from bubbling to the chip and starting a keyboard drag.
          onKeyDown={(e) => e.stopPropagation()}
          aria-label={`Remove ${label}`}
          className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white text-blue-300 dark:text-blue-600 transition-all"
        >
          <FontAwesomeIcon icon={faXmark} className="text-[8px]" />
        </button>
      )}
    </span>
  )
}

export const TagChips: FC<TagChipsProps> = ({ items, onChange, disabled, isSortable }) => {
  const canSort = !!isSortable && !disabled
  const ids = toIds(items)

  const sensors = useSensors(
    // The distance threshold lets clicks on the remove button through without starting a drag.
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return
    const oldIndex = ids.indexOf(String(active.id))
    const newIndex = ids.indexOf(String(over.id))
    onChange(arrayMove(items, oldIndex, newIndex))
  }

  const chips = (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <TagChip
          key={ids[i]}
          id={ids[i]}
          label={item}
          onRemove={() => onChange(items.filter((_, j) => j !== i))}
          disabled={disabled}
          isSortable={canSort}
        />
      ))}
    </div>
  )

  if (!canSort) {
    return chips
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={rectSortingStrategy}>
        {chips}
      </SortableContext>
    </DndContext>
  )
}
