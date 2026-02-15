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
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'

import type { TextField } from '@payloadcms/plugin-form-builder/types'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    width: string
    label: string
    description?: string
    hidden?: boolean
  }
> = ({ label, required, width, description }) => {
  const field = useFieldContext<string>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  return (
    <Width width={width}>
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        <FieldContent>
          <TextAreaComponent
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            aria-invalid={isInvalid}
            required={required}
            rows={3}
          />
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
      </Field>
    </Width>
  )
}
