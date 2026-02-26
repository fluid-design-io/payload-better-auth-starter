'use client'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'

import { useFieldContext } from '../hooks/form-context'

export default function PasswordField({
  label,
  description,
  enableToggle = true,
  ...inputProps
}: {
  label: string
  description?: string
  enableToggle?: boolean
} & Omit<
  React.ComponentProps<typeof PasswordInput>,
  'id' | 'name' | 'value' | 'onBlur' | 'onChange'
>) {
  const field = useFieldContext<string>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <FieldContent>
        <PasswordInput
          {...inputProps}
          id={field.name}
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          enableToggle={enableToggle}
        />
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  )
}

