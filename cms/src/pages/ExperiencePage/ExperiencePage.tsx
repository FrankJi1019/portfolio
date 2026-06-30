import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { ExperienceResponse, Role } from "../../types/portfolio"
import { PageHeader, EntryCard, Field, DateField, SaveNotification } from "../../components/FormControls"
import { useSaveHandler } from "../../hooks/useSaveHandler"

interface ExperiencePageProps {
  content: ExperienceResponse
  onSave: (data: ExperienceResponse) => Promise<void> | void
}

const emptyRole: Role = {
  title: "",
  company: "",
  startDate: "",
  endDate: "",
  isCurrentRole: false,
  description: "",
}

const ExperiencePage: FC<ExperiencePageProps> = ({ content, onSave }) => {
  const { control, handleSubmit, reset, watch, formState: { isDirty } } = useForm<ExperienceResponse>({
    defaultValues: content,
  })

  const { fields, prepend, remove } = useFieldArray({ control, name: "experience" })
  const { handleSave, showNotification, dismissNotification } = useSaveHandler(onSave, reset)

  return (
    <div className="max-w-3xl">
      <SaveNotification isVisible={showNotification} onDismiss={dismissNotification} />
      <PageHeader
        title="Experience"
        onRevert={() => reset(content)}
        onAdd={() => prepend(emptyRole)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
      />
      <div className="space-y-4">
        {fields.map((field, i) => {
          const isCurrentRole = watch(`experience.${i}.isCurrentRole`)
          return (
            <EntryCard key={field.id} onRemove={() => remove(i)}>
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name={`experience.${i}.title`}
                  control={control}
                  render={({ field }) => (
                    <Field label="Job Title" value={field.value} onChange={field.onChange} />
                  )}
                />
                <Controller
                  name={`experience.${i}.company`}
                  control={control}
                  render={({ field }) => (
                    <Field label="Company" value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Controller
                  name={`experience.${i}.startDate`}
                  control={control}
                  render={({ field }) => (
                    <DateField label="Start Date" value={field.value} onChange={field.onChange} />
                  )}
                />
                {!isCurrentRole && (
                  <Controller
                    name={`experience.${i}.endDate`}
                    control={control}
                    render={({ field }) => (
                      <DateField label="End Date" value={field.value} onChange={field.onChange} />
                    )}
                  />
                )}
              </div>
              <div className="mt-3">
                <Controller
                  name={`experience.${i}.isCurrentRole`}
                  control={control}
                  render={({ field }) => (
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="accent-blue-600 w-4 h-4 rounded"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">I currently work here</span>
                    </label>
                  )}
                />
              </div>
              <Controller
                name={`experience.${i}.description`}
                control={control}
                render={({ field }) => (
                  <Field label="Description" value={field.value} onChange={field.onChange} multiline tall className="mt-4" />
                )}
              />
            </EntryCard>
          )
        })}
      </div>
    </div>
  )
}

export default ExperiencePage
