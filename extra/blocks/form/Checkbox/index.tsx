'use client'

import type React from 'react'

import { useFieldContext } from '@/components/form/hooks/form-context'
import { Checkbox as CheckboxUI } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'

import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import { Width } from '../Width'

export const Checkbox: React.FC<CheckboxField & { width: string; description?: string }> = ({
  label,
  required: requiredFromProps,
  width,
  description,
}) => {
  const field = useFieldContext<boolean | undefined>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  return (
    <Width width={width}>
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        <FieldContent>
          <CheckboxUI
            id={field.name}
            name={field.name}
            checked={field.state.value}
            onCheckedChange={(checked) =>
              field.handleChange(checked === 'indeterminate' ? undefined : checked)
            }
            aria-invalid={isInvalid}
            required={requiredFromProps}
          />
          {field.state.meta.isTouched && !field.state.meta.isValid && (
            <FieldError errors={field.state.meta.errors} />
          )}
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
      </Field>
    </Width>
  )
}
