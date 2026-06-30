import { useCallback, useState } from "react"
import type { UseFormReset } from "react-hook-form"

export function useSaveHandler<T extends Record<string, unknown>>(
  onSave: (data: T) => Promise<void> | void,
  reset: UseFormReset<T>,
) {
  const [showNotification, setShowNotification] = useState(false)

  const handleSave = useCallback(async (data: T) => {
    await onSave(data)
    reset(data)
    setShowNotification(true)
  }, [onSave, reset])

  const dismissNotification = useCallback(() => {
    setShowNotification(false)
  }, [])

  return { handleSave, showNotification, dismissNotification }
}
