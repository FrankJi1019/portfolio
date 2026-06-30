import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { SkillsResponse, SkillCategory } from "../../types/portfolio"
import { PageHeader, EntryCard, Field, TagList, SaveNotification } from "../../components/FormControls"
import { useSaveHandler } from "../../hooks/useSaveHandler"

interface SkillsPageProps {
  content: SkillsResponse
  onSave: (data: SkillsResponse) => Promise<void> | void
}

const emptyCategory: SkillCategory = {
  label: "",
  items: [],
}

const SkillsPage: FC<SkillsPageProps> = ({ content, onSave }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<SkillsResponse>({
    defaultValues: content,
  })

  const { fields, prepend, remove } = useFieldArray({ control, name: "skills" })
  const { handleSave, showNotification, dismissNotification } = useSaveHandler(onSave, reset)

  return (
    <div className="max-w-3xl">
      <SaveNotification isVisible={showNotification} onDismiss={dismissNotification} />
      <PageHeader
        title="Skills"
        onRevert={() => reset(content)}
        onAdd={() => prepend(emptyCategory)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
      />
      <div className="space-y-4">
        {fields.map((field, i) => (
          <EntryCard key={field.id} onRemove={() => remove(i)}>
            <Controller
              name={`skills.${i}.label`}
              control={control}
              render={({ field }) => (
                <Field label="Category" value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              name={`skills.${i}.items`}
              control={control}
              render={({ field }) => (
                <TagList label="Skills" items={field.value} onChange={field.onChange} className="mt-4" />
              )}
            />
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default SkillsPage
