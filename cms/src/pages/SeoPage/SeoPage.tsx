import type { FC } from "react"
import { useForm, Controller } from "react-hook-form"
import type { MetaData } from "../../types/portfolio"
import { PageHeader, SeoHint, Field, TagList, SaveNotification } from "../../components/FormControls"
import { useSaveHandler } from "../../hooks/useSaveHandler"

interface SeoPageProps {
  content: MetaData
  onSave: (data: MetaData) => Promise<void> | void
}

const SeoPage: FC<SeoPageProps> = ({ content, onSave }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<MetaData>({
    defaultValues: content,
  })

  const { handleSave, showNotification, dismissNotification } = useSaveHandler(onSave, reset)

  return (
    <div className="max-w-2xl">
      <SaveNotification isVisible={showNotification} onDismiss={dismissNotification} />
      <PageHeader
        title="SEO & Meta"
        onRevert={() => reset(content)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
      />
      <SeoHint />
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Field elevated label="Name" value={field.value} onChange={field.onChange} />
            )}
          />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Field elevated label="Title" value={field.value} onChange={field.onChange} />
            )}
          />
          <Controller
            name="siteUrl"
            control={control}
            render={({ field }) => (
              <Field elevated label="Site URL" value={field.value} onChange={field.onChange} />
            )}
          />
          <Controller
            name="seoTitle"
            control={control}
            render={({ field }) => (
              <Field elevated label="SEO Title" value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <Controller
          name="seoDescription"
          control={control}
          render={({ field }) => (
            <Field elevated label="SEO Description" value={field.value} onChange={field.onChange} multiline />
          )}
        />
        <Controller
          name="ogDescription"
          control={control}
          render={({ field }) => (
            <Field elevated label="OG Description" value={field.value} onChange={field.onChange} multiline />
          )}
        />
        <Controller
          name="twitterDescription"
          control={control}
          render={({ field }) => (
            <Field elevated label="Twitter Description" value={field.value} onChange={field.onChange} multiline />
          )}
        />
        <Controller
          name="seoKeywords"
          control={control}
          render={({ field }) => (
            <TagList label="SEO Keywords" items={field.value} onChange={field.onChange} />
          )}
        />
      </div>
    </div>
  )
}

export default SeoPage
