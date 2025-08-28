'use client'

import { use, useEffect } from 'react'

import { useBetterAuth } from '@/lib/auth/context'

import { useFormContext } from 'react-hook-form'
import { FormInput } from '../FormInput'
import { Width } from '../Width'
import type { UserInfoFieldProps, UserInfoOptions } from './config'

export const UserInfo: React.FC<UserInfoFieldProps> = ({
  defaultValue,
  errors,
  register,
  required,
  width = 'full',
  options,
}) => {
  const { setValue } = useFormContext()
  const { currentUserPromise } = useBetterAuth()
  const user = use(currentUserPromise)

  useEffect(() => {
    if (user) {
      options.forEach((name) => {
        setValue(name, user[name as keyof UserInfoOptions] || '')
      })
    }
  }, [user, options])

  // return a text input for each user info option
  return options.map((name, index) => (
    <Width width={width} key={`${name}-${index}`}>
      <FormInput
        type="text"
        {...{
          errors,
          label: toTitleCase(name),
          name,
          placeholder: toTitleCase(name),
          register,
          required,
          hidden: false,
          defaultValue,
          description: undefined,
        }}
      />
    </Width>
  ))
}

// camel case to title case
const toTitleCase = (str: string) => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, (match) => match.toUpperCase())
}
