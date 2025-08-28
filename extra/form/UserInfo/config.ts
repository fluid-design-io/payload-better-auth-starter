import { fields } from '@payloadcms/plugin-form-builder'
import type { Block } from 'payload'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import type { User } from '@/payload-types'
import { width } from '../fields-config'

export const userInfoOptions = {
  name: 'Name',
  email: 'Email',
  phoneNumber: 'Phone',
  id: 'ID',
} as const

export type UserInfoOptions = typeof userInfoOptions

export type UserInfoFieldProps = UserInfoField & {
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  register: UseFormRegister<any & FieldValues>
  fieldName: string
  userField: keyof User
}

export const userInfo: Block = {
  slug: 'userInfo',
  labels: {
    plural: 'User Info',
    singular: 'User Info',
  },
  fields: [
    width,
    {
      ...fields.select,
      name: 'options',
      type: 'select',
      options: Object.entries(userInfoOptions).map(([value, label]) => ({
        label,
        value,
      })),
      defaultValue: 'name',
      label: 'Select User Info to include',
      hasMany: true,
      required: true,
    },
    {
      name: 'editable',
      type: 'checkbox',
      label: 'Allow user to edit',
      defaultValue: false,
      required: false,
    },
  ],
}

export interface UserInfoField {
  blockName?: string
  blockType: 'userInfo'
  defaultValue?: string
  label?: string
  name: string
  options: string[]
  required?: boolean
  width?: string
  editable?: boolean
}
