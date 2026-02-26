import dynamic from 'next/dynamic'

import { createFormHook } from '@tanstack/react-form'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import { fieldContext, formContext, useFormContext } from './hooks/form-context'

const TextField = dynamic(() => import('./components/text-field'))
const PasswordField = dynamic(() => import('./components/password-field'))
const PhoneField = dynamic(() => import('./components/phone-field'))
const SelectField = dynamic(() => import('./components/select-field'))
const TextareaField = dynamic(() => import('./components/textarea-field'))
const OTPField = dynamic(() => import('./components/otp-field'))

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

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    PasswordField,
    PhoneField,
    SelectField,
    TextareaField,
    OTPField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})

export type { CountryData } from './components/phone-field'
// Re-export types for convenience
export type { SelectOption } from './components/select-field'
