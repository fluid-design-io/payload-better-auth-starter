import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { FormInput } from '../FormInput'
import { Width } from '../Width'

export const Phone: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
  } & TextField & {
      width: string
      placeholder?: string
      label: string
      description?: string
      hidden?: boolean
    }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width = 'full',
  description,
  placeholder,
  hidden,
}) => {
  return (
    <Width width={width}>
      <FormInput
        type="tel"
        {...{
          errors,
          label,
          name,
          placeholder,
          register,
          required,
          hidden,
          defaultValue,
          description,
        }}
      />
    </Width>
  )
}
