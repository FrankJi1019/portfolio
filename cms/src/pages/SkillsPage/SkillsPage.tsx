import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { SkillsResponse, SkillCategory } from "../../types/portfolio"
import { PageHeader, EntryCard, Field, TagList } from "../../components/FormControls"
import { SortableList, SortableItem } from "../../components/SortableList"
import { useSaveHandler } from "../../hooks/useSaveHandler"
import type { UserRole } from "../../providers/AuthProvider"

interface SkillsPageProps {
  content: SkillsResponse
  onSave: (data: SkillsResponse) => Promise<void> | void
  userRole: UserRole
}

const emptyCategory: SkillCategory = {
  label: "",
  items: [],
}

const SkillsPage: FC<SkillsPageProps> = ({ content, onSave, userRole }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<SkillsResponse>({
    defaultValues: content,
  })

  const { fields, prepend, remove, move } = useFieldArray({ control, name: "skills" })
  const { handleSave, isSaving } = useSaveHandler(onSave, reset)

  const isReadOnly = userRole !== 'AUTHENTICATED'

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Skills"
        onRevert={() => reset(content)}
        onAdd={() => prepend(emptyCategory)}
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
                <Controller
                  name={`skills.${i}.label`}
                  control={control}
                  render={({ field }) => (
                    <Field label="Category" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
                  )}
                />
                <Controller
                  name={`skills.${i}.items`}
                  control={control}
                  render={({ field }) => (
                    <TagList label="Skills" items={field.value} onChange={field.onChange} className="mt-4" disabled={isReadOnly} />
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

export default SkillsPage
