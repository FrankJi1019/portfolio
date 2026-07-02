import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

type NotificationType = "success" | "error"

interface Notification {
  id: number
  message: string
  type: NotificationType
}

interface NotificationContextValue {
  showNotification: (message: string, type?: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextValue>({
  showNotification: () => {},
})

export const useNotification = () => useContext(NotificationContext)

let notificationId = 0

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = useCallback((message: string, type: NotificationType = "success") => {
    const id = ++notificationId
    setNotifications((prev) => [...prev, { id, message, type }])
  }, [])

  const dismiss = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return (
    <NotificationContext value={{ showNotification }}>
      {children}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
        {notifications.map((notification) => (
          <NotificationBanner
            key={notification.id}
            notification={notification}
            onDismiss={() => dismiss(notification.id)}
          />
        ))}
      </div>
    </NotificationContext>
  )
}

const NotificationBanner = ({
  notification,
  onDismiss,
}: {
  notification: Notification
  onDismiss: () => void
}) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  const isError = notification.type === "error"

  return (
    <div
      className={`animate-[slideIn_0.3s_ease-out] flex items-center gap-2.5 px-5 py-3 rounded-xl shadow-lg ${
        isError
          ? "bg-red-50 dark:bg-red-950/40 border border-red-200/60 dark:border-red-800/30 shadow-red-100/50 dark:shadow-red-900/20"
          : "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/30 shadow-emerald-100/50 dark:shadow-emerald-900/20"
      }`}
    >
      <span
        className={`w-5 h-5 flex items-center justify-center rounded-full text-white ${
          isError ? "bg-red-500" : "bg-emerald-500"
        }`}
      >
        <FontAwesomeIcon icon={isError ? faCircleExclamation : faCheck} className="text-[9px]" />
      </span>
      <span
        className={`text-sm font-medium ${
          isError ? "text-red-700 dark:text-red-300" : "text-emerald-700 dark:text-emerald-300"
        }`}
      >
        {notification.message}
      </span>
      <button
        onClick={onDismiss}
        className={`ml-2 transition-colors ${
          isError
            ? "text-red-400 hover:text-red-600 dark:hover:text-red-200"
            : "text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-200"
        }`}
      >
        <FontAwesomeIcon icon={faXmark} className="text-xs" />
      </button>
    </div>
  )
}
