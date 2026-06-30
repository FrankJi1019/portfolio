import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { EducationResponse, EducationEntry } from "../../types/portfolio"
import { PageHeader, EntryCard, Field, DateField, SaveNotification } from "../../components/FormControls"
import { useSaveHandler } from "../../hooks/useSaveHandler"

interface EducationPageProps {
  content: EducationResponse
  onSave: (data: EducationResponse) => Promise<void> | void
}

const emptyEntry: EducationEntry = {
  institution: "",
  degree: "",
  startDate: "",
  endDate: "",
  description: "",
}

const EducationPage: FC<EducationPageProps> = ({ content, onSave }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<EducationResponse>({
    defaultValues: content,
  })

  const { fields, prepend, remove } = useFieldArray({ control, name: "education" })
  const { handleSave, showNotification, dismissNotification } = useSaveHandler(onSave, reset)

  return (
    <div className="max-w-3xl">
      <SaveNotification isVisible={showNotification} onDismiss={dismissNotification} />
      <PageHeader
        title="Education"
        onRevert={() => reset(content)}
        onAdd={() => prepend(emptyEntry)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
      />
      <div className="space-y-4">
        {fields.map((field, i) => (
          <EntryCard key={field.id} onRemove={() => remove(i)}>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name={`education.${i}.institution`}
                control={control}
                render={({ field }) => (
                  <Field label="Institution" value={field.value} onChange={field.onChange} />
                )}
              />
              <Controller
                name={`education.${i}.degree`}
                control={control}
                render={({ field }) => (
                  <Field label="Degree" value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Controller
                name={`education.${i}.startDate`}
                control={control}
                render={({ field }) => (
                  <DateField label="Start Date" value={field.value} onChange={field.onChange} />
                )}
              />
              <Controller
                name={`education.${i}.endDate`}
                control={control}
                render={({ field }) => (
                  <DateField label="End Date" value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
            <Controller
              name={`education.${i}.description`}
              control={control}
              render={({ field }) => (
                <Field label="Description" value={field.value} onChange={field.onChange} multiline tall className="mt-4" />
              )}
            />
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default EducationPage
