import { FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Error } from '../Error'

type Props = {
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
  label: string
  name: string
  type: 'text' | 'email' | 'tel' | 'number'
  placeholder?: string
  description?: string
  required?: boolean
  defaultValue?: string
  hidden?: boolean
  register: UseFormRegister<any & FieldValues>
}

export const FormInput = (props: Props) => {
  let pattern: any
  switch (props.type) {
    case 'text':
    case 'number':
      pattern = { required: props.required }
      break
    case 'tel':
      pattern = {
        required: props.required,
        pattern: {
          message: 'Please enter a valid phone number',
          value: /^\d{10,}$/,
        },
      }
      break
    case 'email':
      pattern = {
        required: props.required,
        pattern: {
          message: 'Please enter a valid email address',
          value: /^\S[^\s@]*@\S+$/,
        },
      }
      break
  }

  return (
    <div className={props.hidden ? 'hidden' : `flex flex-col gap-2 mb-2`}>
      <Label htmlFor={props.name}>{props.label}</Label>
      <Input
        required={props.required}
        id={props.name}
        placeholder={
          props.placeholder ? props.placeholder : `Enter your ${props.label.toLowerCase()}`
        }
        type={props.type}
        hidden={props.hidden}
        defaultValue={props.defaultValue ? props.defaultValue : ''}
        {...props.register(props.name, pattern)}
      />
      {props.description && <FormDescription>{props.description}</FormDescription>}
      {props.required && props.errors[props.name] && <Error name={props.name} />}
    </div>
  )
}
