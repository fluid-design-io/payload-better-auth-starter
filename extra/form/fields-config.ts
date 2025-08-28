import type { Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
  admin: {
    width: '50%',
  },
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  admin: {
    width: '50%',
  },
}

const description: Field = {
  name: 'description',
  type: 'text',
  label: 'Description',
  admin: {
    width: '100%',
  },
}

const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
  admin: {
    width: '50%',
  },
}

const placeholder: Field = {
  name: 'placeholder',
  type: 'text',
  label: 'Placeholder',
  admin: {
    width: '50%',
  },
}

const defaultValue: Field = {
  name: 'defaultValue',
  type: 'text',
  admin: {
    width: '25%',
  },
  label: 'Default Value',
}

const width: Field = {
  name: 'width',
  type: 'select',
  defaultValue: 'full',
  options: [
    { value: 'full', label: '100%' },
    { value: '3/4', label: '75%' },
    { value: '2/3', label: '66%' },
    { value: '1/2', label: '50%' },
    { value: '1/3', label: '33%' },
    { value: '1/4', label: '25%' },
  ],
  admin: {
    width: '25%',
  },
}

const hidden: Field = {
  name: 'hidden',
  type: 'checkbox',
  admin: {
    width: '50%',
  },
  label: 'Hidden Field?',
}

export { defaultValue, description, hidden, label, name, placeholder, required, width }
