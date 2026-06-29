import { useState } from "react"
import { mockPortfolio } from "../data/mockPortfolio"
import type { Project } from "../types/portfolio"
import { PageHeader, EntryCard, Field, TagList, updateArr } from "../components/FormControls"

const ProjectsPage = () => {
  const [items, setItems] = useState<Project[]>(mockPortfolio.projects)

  return (
    <div className="max-w-3xl">
      <PageHeader title="Projects" onRevert={() => setItems(mockPortfolio.projects)} onAdd={() => setItems((p) => [{ title: "", description: "", tech: [], link: "" }, ...p])} />
      <div className="space-y-4">
        {items.map((proj, i) => (
          <EntryCard key={i} onRemove={() => setItems((p) => p.filter((_, j) => j !== i))}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Title" value={proj.title} onChange={(v) => updateArr(items, i, { title: v }, setItems)} />
              <Field label="Link" value={proj.link ?? ""} onChange={(v) => updateArr(items, i, { link: v || undefined }, setItems)} />
            </div>
            <Field label="Description" value={proj.description} onChange={(v) => updateArr(items, i, { description: v }, setItems)} multiline className="mt-4" />
            <TagList label="Tech Stack" items={proj.tech} onChange={(tags) => updateArr(items, i, { tech: tags }, setItems)} className="mt-4" />
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage
