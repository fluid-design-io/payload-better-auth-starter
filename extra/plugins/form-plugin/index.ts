import { fields, formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import type { FieldsConfig } from '@payloadcms/plugin-form-builder/types'
import {
  defaultValue,
  description,
  hidden,
  label,
  name,
  placeholder,
  required,
  width,
} from 'extra/form/fields-config'
import { userInfo } from 'extra/form/UserInfo/config'
import type { Field, Plugin } from 'payload'
import { authenticated } from '@/access/authenticated'
import { slugField } from '@/fields/slug'
import beforeEmail from './before-email'

const fieldsTransformer = ({ defaultFields }: { defaultFields: Field[] }) => {
  const [formSlugFieldText, formSlugFieldCheckbox] = slugField()
  const transformedFields = defaultFields.map((field) => {
    if (field.type === 'radio' && field.name === 'confirmationType') {
      return {
        ...field,
        hidden: true,
      }
    }
    return field
  })
  return [...transformedFields, formSlugFieldText, formSlugFieldCheckbox]
}

const adminConfig = {
  admin: {
    group: 'Forms',
  },
  access: {
    update: authenticated,
  },
}

const rowConfig: Record<
  string,
  {
    type: 'row'
    fields: Field[]
  }
> = {
  nameLabel: {
    type: 'row',
    fields: [name, label],
  },
  description: {
    type: 'row',
    fields: [description],
  },
  placeholderDefaultValue: {
    type: 'row',
    fields: [
      placeholder,
      {
        ...({
          ...defaultValue,
          admin: {
            ...defaultValue.admin,
            width: '50%',
          },
        } as Field),
      },
    ],
  },
  placeholderDefaultValueWidth: {
    type: 'row',
    fields: [placeholder, defaultValue, width],
  },
  requiredHidden: {
    type: 'row',
    fields: [required, hidden],
  },
}

/** Add a phone number field */
const phoneField: Field = {
  ...fields.text,
  // @ts-expect-error - Slug is valid
  slug: 'phone',
  labels: {
    singular: 'Phone Number',
    plural: 'Phone Numbers',
  },
  fields: [
    rowConfig.nameLabel,
    rowConfig.description,
    rowConfig.placeholderDefaultValueWidth,
    rowConfig.requiredHidden,
  ],
}

/** Custom fields overrides */
const fieldsOverrides: FieldsConfig = {
  userInfo: userInfo,
  phone: phoneField,
  text: {
    labels: { singular: 'Single-line Text', plural: 'Single-line Text' },
    // ...fields.text,
    fields: [
      rowConfig.nameLabel,
      rowConfig.description,
      rowConfig.placeholderDefaultValueWidth,
      rowConfig.requiredHidden,
    ],
  },
  email: {
    fields: [
      rowConfig.nameLabel,
      rowConfig.description,
      rowConfig.placeholderDefaultValueWidth,
      rowConfig.requiredHidden,
    ],
  },
  textarea: {
    // ...fields.textarea,
    fields: [
      rowConfig.nameLabel,
      rowConfig.description,
      {
        type: 'row',
        fields: [placeholder],
      },
      rowConfig.requiredHidden,
    ],
  },
}

const formPlugin: Plugin = formBuilderPlugin({
  fields: {
    ...fieldsOverrides,
    payment: false,
  },
  defaultToEmail: 'contact.form@acme.com',
  beforeEmail,
  formOverrides: {
    ...adminConfig,
    slug: 'forms',
    fields: fieldsTransformer,
    custom: {
      verified: {
        type: 'checkbox',
        defaultValue: false,
      },
    },
  },
  formSubmissionOverrides: {
    ...adminConfig,
    slug: 'form-submissions',
  },
})

export default formPlugin
