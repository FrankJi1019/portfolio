import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { ProjectsResponse, Project } from "../../types/portfolio"
import { PageHeader, EntryCard, Field, TagList } from "../../components/FormControls"
import { SortableList, SortableItem } from "../../components/SortableList"
import { useSaveHandler } from "../../hooks/useSaveHandler"
import type { UserRole } from "../../providers/AuthProvider"

interface ProjectsPageProps {
  content: ProjectsResponse
  onSave: (data: ProjectsResponse) => Promise<void> | void
  userRole: UserRole
}

const emptyProject: Project = {
  title: "",
  description: "",
  tech: [],
  link: "",
}

const ProjectsPage: FC<ProjectsPageProps> = ({ content, onSave, userRole }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<ProjectsResponse>({
    defaultValues: content,
  })

  const { fields, prepend, remove, move } = useFieldArray({ control, name: "projects" })
  const { handleSave, isSaving } = useSaveHandler(onSave, reset)

  const isReadOnly = userRole !== 'AUTHENTICATED'

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Projects"
        onRevert={() => reset(content)}
        onAdd={() => prepend(emptyProject)}
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
                    name={`projects.${i}.title`}
                    control={control}
                    render={({ field }) => (
                      <Field label="Title" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
                    )}
                  />
                  <Controller
                    name={`projects.${i}.link`}
                    control={control}
                    render={({ field }) => (
                      <Field label="Link" value={field.value ?? ""} onChange={field.onChange} disabled={isReadOnly} />
                    )}
                  />
                </div>
                <Controller
                  name={`projects.${i}.description`}
                  control={control}
                  render={({ field }) => (
                    <Field label="Description" value={field.value} onChange={field.onChange} multiline className="mt-4" disabled={isReadOnly} />
                  )}
                />
                <Controller
                  name={`projects.${i}.tech`}
                  control={control}
                  render={({ field }) => (
                    <TagList label="Tech Stack" items={field.value} onChange={field.onChange} className="mt-4" disabled={isReadOnly} />
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

export default ProjectsPage
