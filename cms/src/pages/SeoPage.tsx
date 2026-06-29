import { useState } from "react"
import { mockPortfolio } from "../data/mockPortfolio"
import type { MetaData } from "../types/portfolio"
import { PageHeader, SeoHint, Field, TagList } from "../components/FormControls"

const SeoPage = () => {
  const [meta, setMeta] = useState<MetaData>(mockPortfolio.meta)

  return (
    <div className="max-w-2xl">
      <PageHeader title="SEO & Meta" onRevert={() => setMeta(mockPortfolio.meta)} />
      <SeoHint />
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <Field elevated label="Name" value={meta.name} onChange={(v) => setMeta((p) => ({ ...p, name: v }))} />
          <Field elevated label="Title" value={meta.title} onChange={(v) => setMeta((p) => ({ ...p, title: v }))} />
          <Field elevated label="Site URL" value={meta.siteUrl} onChange={(v) => setMeta((p) => ({ ...p, siteUrl: v }))} />
          <Field elevated label="SEO Title" value={meta.seoTitle} onChange={(v) => setMeta((p) => ({ ...p, seoTitle: v }))} />
        </div>
        <Field elevated label="SEO Description" value={meta.seoDescription} onChange={(v) => setMeta((p) => ({ ...p, seoDescription: v }))} multiline />
        <Field elevated label="OG Description" value={meta.ogDescription} onChange={(v) => setMeta((p) => ({ ...p, ogDescription: v }))} multiline />
        <Field elevated label="Twitter Description" value={meta.twitterDescription} onChange={(v) => setMeta((p) => ({ ...p, twitterDescription: v }))} multiline />
        <TagList label="SEO Keywords" items={meta.seoKeywords} onChange={(items) => setMeta((p) => ({ ...p, seoKeywords: items }))} />
      </div>
    </div>
  )
}

export default SeoPage
