import { useState } from "react"
import { mockPortfolio } from "../data/mockPortfolio"
import type { SkillCategory } from "../types/portfolio"
import { PageHeader, EntryCard, Field, TagList, updateArr } from "../components/FormControls"

const SkillsPage = () => {
  const [items, setItems] = useState<SkillCategory[]>(mockPortfolio.skills)

  return (
    <div className="max-w-3xl">
      <PageHeader title="Skills" onRevert={() => setItems(mockPortfolio.skills)} onAdd={() => setItems((p) => [{ label: "", items: [] }, ...p])} />
      <div className="space-y-4">
        {items.map((cat, i) => (
          <EntryCard key={i} onRemove={() => setItems((p) => p.filter((_, j) => j !== i))}>
            <Field label="Category" value={cat.label} onChange={(v) => updateArr(items, i, { label: v }, setItems)} />
            <TagList label="Skills" items={cat.items} onChange={(tags) => updateArr(items, i, { items: tags }, setItems)} className="mt-4" />
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default SkillsPage
