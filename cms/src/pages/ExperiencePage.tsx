import { useState } from "react"
import { mockPortfolio } from "../data/mockPortfolio"
import type { Role } from "../types/portfolio"
import { PageHeader, EntryCard, Field, DateField, updateArr } from "../components/FormControls"

const ExperiencePage = () => {
  const [items, setItems] = useState<Role[]>(mockPortfolio.experience)

  return (
    <div className="max-w-3xl">
      <PageHeader title="Experience" onRevert={() => setItems(mockPortfolio.experience)} onAdd={() => setItems((p) => [{ title: "", company: "", startDate: "", endDate: "", isCurrentRole: false, description: "" }, ...p])} />
      <div className="space-y-4">
        {items.map((role, i) => (
          <EntryCard key={i} onRemove={() => setItems((p) => p.filter((_, j) => j !== i))}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Job Title" value={role.title} onChange={(v) => updateArr(items, i, { title: v }, setItems)} />
              <Field label="Company" value={role.company} onChange={(v) => updateArr(items, i, { company: v }, setItems)} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <DateField label="Start Date" value={role.startDate} onChange={(v) => updateArr(items, i, { startDate: v }, setItems)} />
              {!role.isCurrentRole && (
                <DateField label="End Date" value={role.endDate} onChange={(v) => updateArr(items, i, { endDate: v }, setItems)} />
              )}
            </div>
            <div className="mt-3">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={role.isCurrentRole}
                  onChange={(e) => updateArr(items, i, { isCurrentRole: e.target.checked, endDate: "" }, setItems)}
                  className="accent-blue-600 w-4 h-4 rounded"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">I currently work here</span>
              </label>
            </div>
            <Field label="Description" value={role.description} onChange={(v) => updateArr(items, i, { description: v }, setItems)} multiline tall className="mt-4" />
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default ExperiencePage
