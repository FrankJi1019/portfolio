import type { FC } from "react"
import { useForm } from "react-hook-form"
import type { AboutResponse } from "../../types/portfolio"
import { PageHeader, SaveNotification } from "../../components/FormControls"
import { useSaveHandler } from "../../hooks/useSaveHandler"
import {type UserRole} from "../../providers/AuthProvider"

interface AboutPageProps {
  content: AboutResponse
  userRole: UserRole
  onSave: (data: AboutResponse) => Promise<void> | void
}

const AboutPage: FC<AboutPageProps> = ({ content, userRole, onSave }) => {
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<AboutResponse>({
    defaultValues: content,
  })

  const { handleSave, showNotification, dismissNotification } = useSaveHandler(onSave, reset)

  return (
    <div className="max-w-2xl h-full flex flex-col">
      <SaveNotification isVisible={showNotification} onDismiss={dismissNotification} />
      <PageHeader
        title="About"
        description="Your bio displayed in the About section."
        onRevert={() => reset(content)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
        userRole={userRole}
      />
      <label className="flex flex-col flex-1 min-h-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 block">Bio</span>
        <textarea
          className="flex-1 w-full border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 text-sm leading-relaxed resize-none bg-white dark:bg-[#1a1d24] shadow-sm dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 dark:focus:border-blue-500 transition-all placeholder:text-gray-300"
          {...register("about")}
        />
      </label>
    </div>
  )
}

export default AboutPage
