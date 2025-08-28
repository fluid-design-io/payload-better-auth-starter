import type React from 'react'

import { FormDescription } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'

import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
  } & TextField & {
      width: string
      label: string
      description?: string
      hidden?: boolean
    }
> = ({ name, defaultValue, errors, label, register, required, width, description }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <TextAreaComponent
        required={required}
        defaultValue={defaultValue}
        id={name}
        rows={3}
        {...register}
      />
      {description && <FormDescription>{description}</FormDescription>}
      {required && errors[name] && <Error name={name} />}
    </Width>
  )
}
