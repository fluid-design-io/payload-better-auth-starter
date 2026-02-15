'use client'

import { useEffect } from 'react'

import { useAuth } from '@/components/auth'
import { useFormContext } from '@/components/form/hooks/form-context'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { useStore } from '@tanstack/react-form'
import type { User } from '@/payload-types'
import { Width } from '../Width'
import type { UserInfoField } from './config'

export const UserInfo: React.FC<
  UserInfoField & {
    description?: string
  }
> = ({ required, width = 'full', options, editable, description }) => {
  const form = useFormContext()
  const { data: user } = useAuth()

  useEffect(() => {
    if (user) {
      options.forEach((name) => {
        form.setFieldValue(name, (user[name as keyof User] as string) || '')
      })
    }
  }, [user, options, form])

  // return a text input for each user info option
  return options.map((name, index) => (
    <UserInfoInput
      key={`${name}-${index}`}
      name={name}
      width={width}
      required={required}
      editable={editable}
      description={description}
    />
  ))
}

function UserInfoInput({
  name,
  width,
  required,
  editable,
  description,
}: {
  name: string
  width?: string
  required?: boolean
  editable?: boolean
  description?: string
}) {
  const form = useFormContext()
  const fieldState = useStore(form.store, (state) => state.fieldMeta[name])
  const value = useStore(form.store, (state) => state.values[name] as string)

  const isInvalid = fieldState?.isTouched && !fieldState?.isValid

  return (
    <Width width={width}>
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={name}>{toTitleCase(name)}</FieldLabel>
        <FieldContent>
          <Input
            id={name}
            name={name}
            value={value || ''}
            onBlur={() => form.setFieldMeta(name, (prev) => ({ ...prev, isTouched: true }))}
            onChange={(e) => form.setFieldValue(name, e.target.value)}
            aria-invalid={isInvalid}
            required={required}
            disabled={!editable}
            placeholder={toTitleCase(name)}
          />
          {isInvalid && fieldState?.errors && <FieldError errors={fieldState.errors} />}
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
      </Field>
    </Width>
  )
}

// camel case to title case
const toTitleCase = (str: string) => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, (match) => match.toUpperCase())
}
