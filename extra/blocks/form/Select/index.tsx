'use client'

import type React from 'react'

import { useFieldContext } from '@/components/form/hooks/form-context'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    description?: string
    placeholder?: string
    width: string
  }
> = ({ label, options, width, description, placeholder }) => {
  const field = useFieldContext<string>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Width width={width}>
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        <FieldContent>
          <SelectComponent
            name={field.name}
            value={field.state.value}
            onValueChange={(value) => field.handleChange(value as string)}
          >
            <SelectTrigger className="w-full" id={field.name} aria-invalid={isInvalid}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectComponent>
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
      </Field>
    </Width>
  )
}
