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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { CountryField } from '@payloadcms/plugin-form-builder/types'
import { Width } from '../Width'
import { countryOptions } from './options'

export const Country: React.FC<
  CountryField & {
    width: string
    description?: string
  }
> = ({ label, width, description }) => {
  const field = useFieldContext<string>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Width width={width}>
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        <FieldContent>
          <Select
            name={field.name}
            value={field.state.value}
            onValueChange={(value) => field.handleChange(value as string)}
            items={countryOptions}
          >
            <SelectTrigger className="w-full" id={field.name} aria-invalid={isInvalid}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
      </Field>
    </Width>
  )
}
