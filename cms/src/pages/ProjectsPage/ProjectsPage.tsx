import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { ProjectsResponse, Project } from "../../types/portfolio"
import { PageHeader, Field, TagList } from "../../components/FormControls"
import CollapsibleEntryCard from "../../components/CollapsibleEntryCard"
import { joinSubheading } from "../../utils/subheading"
import { SortableList, SortableItem } from "../../components/SortableList"
import { useSaveHandler } from "../../hooks/useSaveHandler"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
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
  const { control, handleSubmit, reset, watch, formState: { isDirty } } = useForm<ProjectsResponse>({
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
          {fields.map((field, i) => {
            const [title, tech, isHidden] = watch([
              `projects.${i}.title`,
              `projects.${i}.tech`,
              `projects.${i}.isHidden`,
            ])
            const label = title || "project"
            return (
              <SortableItem key={field.id} id={field.id} disabled={isReadOnly}>
                <CollapsibleEntryCard
                  heading={title}
                  subheading={joinSubheading(isHidden ? "Hidden from portfolio" : undefined, tech?.join(", "))}
                  placeholderHeading="New project"
                  onRemove={() => remove(i)}
                  disabled={isReadOnly}
                  isMuted={isHidden}
                  headerActions={
                    <Controller
                      name={`projects.${i}.isHidden`}
                      control={control}
                      render={({ field }) => {
                        const isVisible = !field.value
                        return (
                          <button
                            type="button"
                            aria-pressed={!isVisible}
                            aria-label={isVisible ? `Hide ${label} from portfolio` : `Show ${label} on portfolio`}
                            title={isVisible ? "Hide from portfolio" : "Show on portfolio"}
                            onClick={() => field.onChange(isVisible)}
                            disabled={isReadOnly}
                            className={`w-7 h-7 shrink-0 flex items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed ${isVisible ? "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30" : "text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                          >
                            <FontAwesomeIcon icon={isVisible ? faEye : faEyeSlash} className="text-sm" />
                          </button>
                        )
                      }}
                    />
                  }
                >
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
                </CollapsibleEntryCard>
              </SortableItem>
            )
          })}
        </div>
      </SortableList>
    </div>
  )
}

export default ProjectsPage
