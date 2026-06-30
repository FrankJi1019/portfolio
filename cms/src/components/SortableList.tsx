import type { FC, ReactNode } from "react"
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
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGripVertical } from "@fortawesome/free-solid-svg-icons"

interface SortableItemProps {
  id: string
  children: ReactNode
}

const SortableItem: FC<SortableItemProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative group/sortable">
      <button
        type="button"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2 flex items-center justify-center w-8 h-10 text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 cursor-grab active:cursor-grabbing opacity-0 group-hover/sortable:opacity-100 transition-opacity"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        <FontAwesomeIcon icon={faGripVertical} className="text-sm" />
      </button>
      {children}
    </div>
  )
}

interface SortableListProps {
  items: { id: string }[]
  onReorder: (oldIndex: number, newIndex: number) => void
  children: ReactNode
}

export const SortableList: FC<SortableListProps> = ({ items, onReorder, children }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      onReorder(oldIndex, newIndex)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export { SortableItem }
