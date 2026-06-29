import { useState } from "react"
import { mockPortfolio } from "../data/mockPortfolio"
import type { EducationEntry } from "../types/portfolio"
import { PageHeader, EntryCard, Field, DateField, updateArr } from "../components/FormControls"

const EducationPage = () => {
  const [items, setItems] = useState<EducationEntry[]>(mockPortfolio.education)

  return (
    <div className="max-w-3xl">
      <PageHeader title="Education" onRevert={() => setItems(mockPortfolio.education)} onAdd={() => setItems((p) => [{ institution: "", degree: "", startDate: "", endDate: "", description: "" }, ...p])} />
      <div className="space-y-4">
        {items.map((edu, i) => (
          <EntryCard key={i} onRemove={() => setItems((p) => p.filter((_, j) => j !== i))}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Institution" value={edu.institution} onChange={(v) => updateArr(items, i, { institution: v }, setItems)} />
              <Field label="Degree" value={edu.degree} onChange={(v) => updateArr(items, i, { degree: v }, setItems)} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <DateField label="Start Date" value={edu.startDate} onChange={(v) => updateArr(items, i, { startDate: v }, setItems)} />
              <DateField label="End Date" value={edu.endDate} onChange={(v) => updateArr(items, i, { endDate: v }, setItems)} />
            </div>
            <Field label="Description" value={edu.description} onChange={(v) => updateArr(items, i, { description: v }, setItems)} multiline tall className="mt-4" />
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default EducationPage
