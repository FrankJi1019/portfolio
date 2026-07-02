import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { EducationResponse, EducationEntry } from "../../types/portfolio"
import { PageHeader, EntryCard, Field, DateField } from "../../components/FormControls"
import { SortableList, SortableItem } from "../../components/SortableList"
import { useSaveHandler } from "../../hooks/useSaveHandler"
import type { UserRole } from "../../providers/AuthProvider"

interface EducationPageProps {
  content: EducationResponse
  onSave: (data: EducationResponse) => Promise<void> | void
  userRole: UserRole
}

const emptyEntry: EducationEntry = {
  institution: "",
  degree: "",
  startDate: "",
  endDate: "",
  description: "",
}

const EducationPage: FC<EducationPageProps> = ({ content, onSave, userRole }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<EducationResponse>({
    defaultValues: content,
  })

  const { fields, prepend, remove, move } = useFieldArray({ control, name: "education" })
  const { handleSave, isSaving } = useSaveHandler(onSave, reset)

  const isReadOnly = userRole !== 'AUTHENTICATED'

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Education"
        onRevert={() => reset(content)}
        onAdd={() => prepend(emptyEntry)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
        isSaving={isSaving}
        userRole={userRole}
      />
      <SortableList items={fields} onReorder={move} disabled={isReadOnly}>
        <div className="space-y-4 pl-8">
          {fields.map((field, i) => (
            <SortableItem key={field.id} id={field.id} disabled={isReadOnly}>
              <EntryCard onRemove={() => remove(i)} disabled={isReadOnly}>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name={`education.${i}.institution`}
                    control={control}
                    render={({ field }) => (
                      <Field label="Institution" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
                    )}
                  />
                  <Controller
                    name={`education.${i}.degree`}
                    control={control}
                    render={({ field }) => (
                      <Field label="Degree" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Controller
                    name={`education.${i}.startDate`}
                    control={control}
                    render={({ field }) => (
                      <DateField label="Start Date" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
                    )}
                  />
                  <Controller
                    name={`education.${i}.endDate`}
                    control={control}
                    render={({ field }) => (
                      <DateField label="End Date" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
                    )}
                  />
                </div>
                <Controller
                  name={`education.${i}.description`}
                  control={control}
                  render={({ field }) => (
                    <Field label="Description" value={field.value} onChange={field.onChange} multiline tall className="mt-4" disabled={isReadOnly} />
                  )}
                />
              </EntryCard>
            </SortableItem>
          ))}
        </div>
      </SortableList>
    </div>
  )
}

export default EducationPage
