import { useState } from "react"
import { mockPortfolio } from "../data/mockPortfolio"
import type { Certification } from "../types/portfolio"
import { PageHeader, EntryCard, Field, DateField, updateArr } from "../components/FormControls"

const CertificationsPage = () => {
  const [items, setItems] = useState<Certification[]>(mockPortfolio.certifications)

  return (
    <div className="max-w-3xl">
      <PageHeader title="Certifications" onRevert={() => setItems(mockPortfolio.certifications)} onAdd={() => setItems((p) => [{ name: "", issuer: "", issuedDate: "", expiresDate: "", credlyUrl: "" }, ...p])} />
      <div className="space-y-4">
        {items.map((cert, i) => (
          <EntryCard key={i} onRemove={() => setItems((p) => p.filter((_, j) => j !== i))}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name" value={cert.name} onChange={(v) => updateArr(items, i, { name: v }, setItems)} />
              <Field label="Issuer" value={cert.issuer} onChange={(v) => updateArr(items, i, { issuer: v }, setItems)} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <DateField label="Issued" value={cert.issuedDate} onChange={(v) => updateArr(items, i, { issuedDate: v }, setItems)} />
              <DateField label="Expires" value={cert.expiresDate} onChange={(v) => updateArr(items, i, { expiresDate: v }, setItems)} />
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default CertificationsPage
