import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { CertificationsResponse, Certification } from "../../types/portfolio"
import { PageHeader, EntryCard, Field, DateField, SaveNotification } from "../../components/FormControls"
import { useSaveHandler } from "../../hooks/useSaveHandler"

interface CertificationsPageProps {
  content: CertificationsResponse
  onSave: (data: CertificationsResponse) => Promise<void> | void
}

const emptyCertification: Certification = {
  name: "",
  issuer: "",
  issuedDate: "",
  expiresDate: "",
  credlyUrl: "",
}

const CertificationsPage: FC<CertificationsPageProps> = ({ content, onSave }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<CertificationsResponse>({
    defaultValues: content,
  })

  const { fields, prepend, remove } = useFieldArray({ control, name: "certifications" })
  const { handleSave, showNotification, dismissNotification } = useSaveHandler(onSave, reset)

  return (
    <div className="max-w-3xl">
      <SaveNotification isVisible={showNotification} onDismiss={dismissNotification} />
      <PageHeader
        title="Certifications"
        onRevert={() => reset(content)}
        onAdd={() => prepend(emptyCertification)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
      />
      <div className="space-y-4">
        {fields.map((field, i) => (
          <EntryCard key={field.id} onRemove={() => remove(i)}>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name={`certifications.${i}.name`}
                control={control}
                render={({ field }) => (
                  <Field label="Name" value={field.value} onChange={field.onChange} />
                )}
              />
              <Controller
                name={`certifications.${i}.issuer`}
                control={control}
                render={({ field }) => (
                  <Field label="Issuer" value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Controller
                name={`certifications.${i}.issuedDate`}
                control={control}
                render={({ field }) => (
                  <DateField label="Issued" value={field.value} onChange={field.onChange} />
                )}
              />
              <Controller
                name={`certifications.${i}.expiresDate`}
                control={control}
                render={({ field }) => (
                  <DateField label="Expires" value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
            <Controller
              name={`certifications.${i}.credlyUrl`}
              control={control}
              render={({ field }) => (
                <Field label="Credly URL" value={field.value ?? ""} onChange={field.onChange} className="mt-4" />
              )}
            />
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default CertificationsPage
