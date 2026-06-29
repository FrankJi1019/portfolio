import { useState } from "react"
import { mockPortfolio } from "../data/mockPortfolio"
import type { ContactLink } from "../types/portfolio"
import { PageHeader, EntryCard, Field, updateArr } from "../components/FormControls"

const ContactPage = () => {
  const [items, setItems] = useState<ContactLink[]>(mockPortfolio.contact)

  return (
    <div className="max-w-3xl">
      <PageHeader title="Contact" onRevert={() => setItems(mockPortfolio.contact)} onAdd={() => setItems((p) => [{ label: "", href: "", display: "" }, ...p])} />
      <div className="space-y-4">
        {items.map((link, i) => (
          <EntryCard key={i} onRemove={() => setItems((p) => p.filter((_, j) => j !== i))}>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Label" value={link.label} onChange={(v) => updateArr(items, i, { label: v }, setItems)} />
              <Field label="URL" value={link.href} onChange={(v) => updateArr(items, i, { href: v }, setItems)} />
              <Field label="Display Text" value={link.display} onChange={(v) => updateArr(items, i, { display: v }, setItems)} />
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default ContactPage
