import type { FC } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocket } from "@fortawesome/free-solid-svg-icons"
import { usePublishPortfolio } from "../api-hooks/publish"
import { useNotification } from "../providers/NotificationProvider"

const PublishButton: FC = () => {
  const { mutateAsync, isPending } = usePublishPortfolio()
  const { showNotification } = useNotification()

  const handlePublish = async () => {
    try {
      await mutateAsync()
      showNotification("Published to live site")
    } catch (error) {
      console.error("Publish failed", error)
      showNotification("Publish failed — please try again", "error")
    }
  }

  return (
    <button
      onClick={handlePublish}
      disabled={isPending}
      title="Refresh the live site's cache with the latest saved content"
      className="mt-4 mx-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md shadow-blue-200/40 dark:shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <FontAwesomeIcon icon={faRocket} className="text-[11px]" />
      {isPending ? "Publishing..." : "Publish"}
    </button>
  )
}

export default PublishButton
