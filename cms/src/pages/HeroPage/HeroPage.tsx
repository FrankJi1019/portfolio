import type { FC } from "react"
import { useForm, Controller } from "react-hook-form"
import type { HeroResponse } from "../../types/portfolio"
import { STATUS_OPTIONS } from "../../types/portfolio"
import { PageHeader, Field, Select, TagList, SaveNotification } from "../../components/FormControls"
import { useSaveHandler } from "../../hooks/useSaveHandler"

interface HeroPageProps {
  content: HeroResponse
  onSave: (data: HeroResponse) => Promise<void> | void
}

const statusOptions = STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))

const HeroPage: FC<HeroPageProps> = ({ content, onSave }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<HeroResponse>({
    defaultValues: content,
  })

  const { handleSave, showNotification, dismissNotification } = useSaveHandler(onSave, reset)

  return (
    <div className="max-w-2xl">
      <SaveNotification isVisible={showNotification} onDismiss={dismissNotification} />
      <PageHeader
        title="Hero"
        description="The main banner section of your portfolio."
        onRevert={() => reset(content)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
      />
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <Controller
            name="heroHeading"
            control={control}
            render={({ field }) => (
              <Field elevated label="Heading" value={field.value} onChange={field.onChange} />
            )}
          />
          <Controller
            name="heroStatusText"
            control={control}
            render={({ field }) => (
              <Select label="Status" value={field.value} options={statusOptions} onChange={field.onChange} />
            )}
          />
        </div>
        <Controller
          name="heroSubtitle"
          control={control}
          render={({ field }) => (
            <Field elevated label="Subtitle" value={field.value} onChange={field.onChange} hint="Portfolio will prefix with '> '" />
          )}
        />
        <Controller
          name="heroTagline"
          control={control}
          render={({ field }) => (
            <Field elevated label="Tagline" value={field.value} onChange={field.onChange} multiline />
          )}
        />
        <Controller
          name="heroTechBadges"
          control={control}
          render={({ field }) => (
            <TagList label="Tech Badges" items={field.value} onChange={field.onChange} />
          )}
        />
      </div>
    </div>
  )
}

export default HeroPage
