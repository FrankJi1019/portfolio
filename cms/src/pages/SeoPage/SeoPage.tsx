import type { FC } from "react"
import { useForm, Controller } from "react-hook-form"
import type { MetaData } from "../../types/portfolio"
import { PageHeader, SeoHint, Field, TagList } from "../../components/FormControls"
import { useSaveHandler } from "../../hooks/useSaveHandler"
import type { UserRole } from "../../providers/AuthProvider"

interface SeoPageProps {
  content: MetaData
  onSave: (data: MetaData) => Promise<void> | void
  userRole: UserRole
}

const SeoPage: FC<SeoPageProps> = ({ content, onSave, userRole }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<MetaData>({
    defaultValues: content,
  })

  const { handleSave, isSaving } = useSaveHandler(onSave, reset)

  const isReadOnly = userRole !== 'AUTHENTICATED'

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="SEO & Meta"
        onRevert={() => reset(content)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
        isSaving={isSaving}
        userRole={userRole}
      />
      <SeoHint />
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Field elevated label="Name" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
            )}
          />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Field elevated label="Title" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
            )}
          />
          <Controller
            name="siteUrl"
            control={control}
            render={({ field }) => (
              <Field elevated label="Site URL" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
            )}
          />
          <Controller
            name="seoTitle"
            control={control}
            render={({ field }) => (
              <Field elevated label="SEO Title" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
            )}
          />
        </div>
        <Controller
          name="seoDescription"
          control={control}
          render={({ field }) => (
            <Field elevated label="SEO Description" value={field.value} onChange={field.onChange} multiline disabled={isReadOnly} />
          )}
        />
        <Controller
          name="ogDescription"
          control={control}
          render={({ field }) => (
            <Field elevated label="OG Description" value={field.value} onChange={field.onChange} multiline disabled={isReadOnly} />
          )}
        />
        <Controller
          name="twitterDescription"
          control={control}
          render={({ field }) => (
            <Field elevated label="Twitter Description" value={field.value} onChange={field.onChange} multiline disabled={isReadOnly} />
          )}
        />
        <Controller
          name="seoKeywords"
          control={control}
          render={({ field }) => (
            <TagList label="SEO Keywords" items={field.value} onChange={field.onChange} disabled={isReadOnly} />
          )}
        />
      </div>
    </div>
  )
}

export default SeoPage
