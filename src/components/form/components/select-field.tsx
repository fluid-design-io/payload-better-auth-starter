'use client'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useFieldContext } from '../hooks/form-context'

export type SelectOption = {
  label: string
  value: string
}

export default function SelectField({
  label,
  description,
  placeholder,
  options,
  ...selectProps
}: {
  label: string
  description?: string
  placeholder?: string
  options: SelectOption[]
} & Omit<React.ComponentProps<typeof Select>, 'value' | 'onValueChange' | 'items'>) {
  const field = useFieldContext<string>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Convert options to Base UI items format for automatic label lookup
  const items = options.map((opt) => ({ label: opt.label, value: opt.value }))

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <FieldContent>
        <Select
          {...selectProps}
          items={items}
          value={field.state.value || null}
          onValueChange={(value) => field.handleChange((value as string) ?? '')}
        >
          <SelectTrigger id={field.name} aria-invalid={isInvalid}>
            <SelectValue>
              {(value: string | null) => {
                if (!value) return placeholder || 'Select...'
                const option = options.find((opt) => opt.value === value)
                return option?.label ?? value
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  )
}
