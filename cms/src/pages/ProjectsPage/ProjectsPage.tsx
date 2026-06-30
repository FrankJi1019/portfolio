import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { ProjectsResponse, Project } from "../../types/portfolio"
import { PageHeader, EntryCard, Field, TagList, SaveNotification } from "../../components/FormControls"
import { useSaveHandler } from "../../hooks/useSaveHandler"

interface ProjectsPageProps {
  content: ProjectsResponse
  onSave: (data: ProjectsResponse) => Promise<void> | void
}

const emptyProject: Project = {
  title: "",
  description: "",
  tech: [],
  link: "",
}

const ProjectsPage: FC<ProjectsPageProps> = ({ content, onSave }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<ProjectsResponse>({
    defaultValues: content,
  })

  const { fields, prepend, remove } = useFieldArray({ control, name: "projects" })
  const { handleSave, showNotification, dismissNotification } = useSaveHandler(onSave, reset)

  return (
    <div className="max-w-3xl">
      <SaveNotification isVisible={showNotification} onDismiss={dismissNotification} />
      <PageHeader
        title="Projects"
        onRevert={() => reset(content)}
        onAdd={() => prepend(emptyProject)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
      />
      <div className="space-y-4">
        {fields.map((field, i) => (
          <EntryCard key={field.id} onRemove={() => remove(i)}>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name={`projects.${i}.title`}
                control={control}
                render={({ field }) => (
                  <Field label="Title" value={field.value} onChange={field.onChange} />
                )}
              />
              <Controller
                name={`projects.${i}.link`}
                control={control}
                render={({ field }) => (
                  <Field label="Link" value={field.value ?? ""} onChange={field.onChange} />
                )}
              />
            </div>
            <Controller
              name={`projects.${i}.description`}
              control={control}
              render={({ field }) => (
                <Field label="Description" value={field.value} onChange={field.onChange} multiline className="mt-4" />
              )}
            />
            <Controller
              name={`projects.${i}.tech`}
              control={control}
              render={({ field }) => (
                <TagList label="Tech Stack" items={field.value} onChange={field.onChange} className="mt-4" />
              )}
            />
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage
