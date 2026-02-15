import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export const buildInitialFormState = (fields: FormFieldBlock[]) => {
  return fields?.reduce((initialSchema, field) => {
    if (field.blockType === 'checkbox') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'country') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'email') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'text') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'select') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'state') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'textarea') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'date') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    if (field.blockType === 'radio') {
      return {
        ...initialSchema,
        [field.name]: field.defaultValue,
      }
    }
    return initialSchema
  }, {})
}
