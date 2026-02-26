import dynamic from 'next/dynamic'

import { fieldContext, formContext, useFormContext } from '@/components/form/hooks/form-context'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

import { createFormHook } from '@tanstack/react-form'

const CheckboxField = dynamic(() => import('./Checkbox').then((mod) => mod.Checkbox))
const CountryField = dynamic(() => import('./Country').then((mod) => mod.Country))
const EmailField = dynamic(() => import('./Email').then((mod) => mod.Email))
const NumberField = dynamic(() => import('./Number').then((mod) => mod.Number))
const SelectField = dynamic(() => import('./Select').then((mod) => mod.Select))
const StateField = dynamic(() => import('./State').then((mod) => mod.State))
const TextField = dynamic(() => import('./Text').then((mod) => mod.Text))
const TextareaField = dynamic(() => import('./Textarea').then((mod) => mod.Textarea))
const PhoneField = dynamic(() => import('./Phone').then((mod) => mod.Phone))

function SubmitButton({ label }: { label: string }) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : label}
        </Button>
      )}
    </form.Subscribe>
  )
}

export const {
  useAppForm: useBlockForm,
  withForm: withBlockForm,
  withFieldGroup: withBlockFieldGroup,
} = createFormHook({
  fieldComponents: {
    Checkbox: CheckboxField,
    Country: CountryField,
    Email: EmailField,
    Number: NumberField,
    Select: SelectField,
    State: StateField,
    Text: TextField,
    Textarea: TextareaField,
    Phone: PhoneField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})
