import { useCallback, useState } from "react"
import type { UseFormReset } from "react-hook-form"
import { useNotification } from "../providers/NotificationProvider"

export function useSaveHandler<T extends Record<string, any>>(
  onSave: (data: T) => Promise<void> | void,
  reset: UseFormReset<T>,
) {
  const [isSaving, setIsSaving] = useState(false)
  const { showNotification } = useNotification()

  const handleSave = useCallback(async (data: T) => {
    setIsSaving(true)
    try {
      await onSave(data)
      reset(data)
      showNotification("Changes saved")
    } finally {
      setIsSaving(false)
    }
  }, [onSave, reset, showNotification])

  return { handleSave, isSaving }
}
