import { useState } from "react"
import { mockPortfolio } from "../data/mockPortfolio"
import type { HeroData } from "../types/portfolio"
import { STATUS_OPTIONS } from "../types/portfolio"
import { PageHeader, Field, Select, TagList } from "../components/FormControls"

const HeroPage = () => {
  const [hero, setHero] = useState<HeroData>(mockPortfolio.hero)

  return (
    <div className="max-w-2xl">
      <PageHeader title="Hero" description="The main banner section of your portfolio." onRevert={() => setHero(mockPortfolio.hero)} />
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <Field elevated label="Heading" value={hero.heading} onChange={(v) => setHero((p) => ({ ...p, heading: v }))} />
          <Select label="Status" value={hero.statusText} options={STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))} onChange={(v) => setHero((p) => ({ ...p, statusText: v }))} />
        </div>
        <Field elevated label="Subtitle" value={hero.subtitle} onChange={(v) => setHero((p) => ({ ...p, subtitle: v }))} hint="Portfolio will prefix with '> '" />
        <Field elevated label="Tagline" value={hero.tagline} onChange={(v) => setHero((p) => ({ ...p, tagline: v }))} multiline />
        <TagList label="Tech Badges" items={hero.techBadges} onChange={(items) => setHero((p) => ({ ...p, techBadges: items }))} />
      </div>
    </div>
  )
}

export default HeroPage
