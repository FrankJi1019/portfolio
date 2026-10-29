import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { CertificationsResponse, Certification } from "../../types/portfolio"
import { PageHeader, Field, DateField } from "../../components/FormControls"
import CollapsibleEntryCard from "../../components/CollapsibleEntryCard"
import { joinSubheading } from "../../utils/subheading"
import { SortableList, SortableItem } from "../../components/SortableList"
import { useSaveHandler } from "../../hooks/useSaveHandler"
import type { UserRole } from "../../providers/AuthProvider"

interface CertificationsPageProps {
  content: CertificationsResponse
  onSave: (data: CertificationsResponse) => Promise<void> | void
  userRole: UserRole
}

const emptyCertification: Certification = {
  name: "",
  issuer: "",
  issuedDate: "",
  expiresDate: "",
  credlyUrl: "",
}

const CertificationsPage: FC<CertificationsPageProps> = ({ content, onSave, userRole }) => {
  const { control, handleSubmit, reset, watch, formState: { isDirty } } = useForm<CertificationsResponse>({
    defaultValues: content,
  })

  const { fields, prepend, remove, move } = useFieldArray({ control, name: "certifications" })
  const { handleSave, isSaving } = useSaveHandler(onSave, reset)

  const isReadOnly = userRole !== 'AUTHENTICATED'

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Certifications"
        onRevert={() => reset(content)}
        onAdd={() => prepend(emptyCertification)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
        isSaving={isSaving}
        userRole={userRole}
      />
      <SortableList items={fields} onReorder={move} disabled={isReadOnly}>
        <div className="space-y-4 pl-8">
          {fields.map((field, i) => {
            const [name, issuer, issuedDate] = watch([
              `certifications.${i}.name`,
              `certifications.${i}.issuer`,
              `certifications.${i}.issuedDate`,
            ])
            return (
              <SortableItem key={field.id} id={field.id} disabled={isReadOnly}>
                <CollapsibleEntryCard
                  heading={name}
                  subheading={joinSubheading(issuer, issuedDate && `Issued ${issuedDate}`)}
                  placeholderHeading="New certification"
                  onRemove={() => remove(i)}
                  disabled={isReadOnly}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name={`certifications.${i}.name`}
                      control={control}
                      render={({ field }) => (
                        <Field label="Name" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
                      )}
                    />
                    <Controller
                      name={`certifications.${i}.issuer`}
                      control={control}
                      render={({ field }) => (
                        <Field label="Issuer" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Controller
                      name={`certifications.${i}.issuedDate`}
                      control={control}
                      render={({ field }) => (
                        <DateField label="Issued" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
                      )}
                    />
                    <Controller
                      name={`certifications.${i}.expiresDate`}
                      control={control}
                      render={({ field }) => (
                        <DateField label="Expires" value={field.value} onChange={field.onChange} disabled={isReadOnly} />
                      )}
                    />
                  </div>
                  <Controller
                    name={`certifications.${i}.credlyUrl`}
                    control={control}
                    render={({ field }) => (
                      <Field label="Credly URL" value={field.value ?? ""} onChange={field.onChange} className="mt-4" disabled={isReadOnly} />
                    )}
                  />
                </CollapsibleEntryCard>
              </SortableItem>
            )
          })}
        </div>
      </SortableList>
    </div>
  )
}

export default CertificationsPage
