import type { TextField } from '@payloadcms/plugin-form-builder/types'
import { FormInput } from '../FormInput'
import { Width } from '../Width'

export const Number: React.FC<
  TextField & {
    width: string
    placeholder?: string
    label: string
    description?: string
    hidden?: boolean
  }
> = ({ name, defaultValue, label, required, width = 'full', description, placeholder, hidden }) => {
  return (
    <Width width={width}>
      <FormInput
        type="number"
        {...{
          label,
          name,
          placeholder: placeholder ?? `Enter ${label}`,
          required,
          hidden,
          defaultValue,
          description,
        }}
      />
    </Width>
  )
}
