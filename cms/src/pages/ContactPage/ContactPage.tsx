import type { FC } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import type { ContactResponse, ContactLink } from "../../types/portfolio"
import { PageHeader, EntryCard, Field, SaveNotification } from "../../components/FormControls"
import { useSaveHandler } from "../../hooks/useSaveHandler"

interface ContactPageProps {
  content: ContactResponse
  onSave: (data: ContactResponse) => Promise<void> | void
}

const emptyLink: ContactLink = {
  label: "",
  href: "",
  display: "",
}

const ContactPage: FC<ContactPageProps> = ({ content, onSave }) => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<ContactResponse>({
    defaultValues: content,
  })

  const { fields, prepend, remove } = useFieldArray({ control, name: "contact" })
  const { handleSave, showNotification, dismissNotification } = useSaveHandler(onSave, reset)

  return (
    <div className="max-w-3xl">
      <SaveNotification isVisible={showNotification} onDismiss={dismissNotification} />
      <PageHeader
        title="Contact"
        onRevert={() => reset(content)}
        onAdd={() => prepend(emptyLink)}
        onSave={handleSubmit(handleSave)}
        isSaveDisabled={!isDirty}
      />
      <div className="space-y-4">
        {fields.map((field, i) => (
          <EntryCard key={field.id} onRemove={() => remove(i)}>
            <div className="grid grid-cols-3 gap-4">
              <Controller
                name={`contact.${i}.label`}
                control={control}
                render={({ field }) => (
                  <Field label="Label" value={field.value} onChange={field.onChange} />
                )}
              />
              <Controller
                name={`contact.${i}.href`}
                control={control}
                render={({ field }) => (
                  <Field label="URL" value={field.value} onChange={field.onChange} />
                )}
              />
              <Controller
                name={`contact.${i}.display`}
                control={control}
                render={({ field }) => (
                  <Field label="Display Text" value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </EntryCard>
        ))}
      </div>
    </div>
  )
}

export default ContactPage
