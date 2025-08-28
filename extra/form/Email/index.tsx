import type React from 'react'

import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { FormInput } from '../FormInput'
import { Width } from '../Width'

export const Email: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
  } & EmailField & {
      hidden: boolean
      width: string
      placeholder?: string
      label: string
    }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width = 'full',
  placeholder,
  hidden,
}) => {
  return (
    <Width width={width}>
      <FormInput
        type="email"
        {...{
          errors,
          label,
          name,
          placeholder,
          register,
          required,
          hidden,
          defaultValue,
        }}
      />
    </Width>
  )
}
