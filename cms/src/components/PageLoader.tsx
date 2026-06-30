import type { FC } from "react"

const PageLoader: FC = () => {
  return (
    <div className="max-w-2xl animate-pulse">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="flex items-center gap-2">
            <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
        </div>
        <div className="mt-4 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent dark:from-gray-700 dark:via-gray-800 dark:to-transparent" />
      </div>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-11 w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-11 w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-11 w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-20 w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-11 w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default PageLoader
