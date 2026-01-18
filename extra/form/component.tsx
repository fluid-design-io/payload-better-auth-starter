'use client'

import { useSearchParams } from 'next/navigation'
import type React from 'react'

import RichText from '@/components/payload/rich-text'

import { getClientSideURL } from '@/lib/payload'
import { cn } from '@/lib/utils'

import { useStore } from '@tanstack/react-form'
import { toast } from 'sonner'
import type { Form } from '@/payload-types'
import { useBlockForm } from '.'
import { UserInfo } from './UserInfo'

// Capitalize first letter to match fieldComponents keys (avoids 'state' conflict with field.state)
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  form: Form
  /*
   * Additional content to render after the form,
   * for example, modify the form default values inside form context
   */
  children?: React.ReactNode
  /**
   * Wrapper class name of the form, outside of the intro content
   */
  rootClassName?: string
  /**
   * Base class name of the form, inside the form wrapper
   */
  className?: string
  /**
   * Class name of the form container
   */
  formClassName?: string
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    rootClassName,
    className,
    formClassName,
    children,
    form: formFromProps,
    form: { id: formID, confirmationMessage, submitButtonLabel } = {},
  } = props
  const searchParams = useSearchParams()
  const allParams = Object.fromEntries(searchParams.entries())

  const defaultValues = formFromProps.fields?.reduce((acc: Record<string, string>, field) => {
    if ('name' in field) {
      if (allParams[field.name]) {
        acc[field.name] = allParams[field.name]
      }
    }
    return acc
  }, {})

  const form = useBlockForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const dataToSend = Object.entries(value).map(([name, value]) => ({
        field: name,
        value,
      }))

      try {
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          body: JSON.stringify({
            form: formFromProps.id,
            submissionData: dataToSend,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const res = await req.json()

        if (req.status >= 400) {
          throw new Error(res.errors?.[0]?.message || 'Internal Server Error')
        }
      } catch (err) {
        console.warn(err)
        toast.error(err instanceof Error ? err.message : 'Unknown error')
      }
    },
  })

  const isSubmitted = useStore(form.store, (state) => state.isSubmitted)

  if (isSubmitted) {
    return (
      <div className={cn('container lg:max-w-[48rem]', rootClassName)}>
        <RichText data={confirmationMessage} enableProse={false} />
      </div>
    )
  }

  return (
    <div className={cn('container lg:max-w-[48rem]', rootClassName)}>
      <form
        id={formID}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className={cn('rounded-md border border-border p-4 lg:p-6', className)}
      >
        <form.AppForm>
          <form.Subscribe selector={(state) => state.errors}>
            {(errors) => (
              <div className="mb-4 flex flex-col gap-6 last:mb-0">
                {Object.entries(errors).map(([name, error]) => (
                  <div key={name}>{typeof error === 'string' ? error : JSON.stringify(error)}</div>
                ))}
              </div>
            )}
          </form.Subscribe>
          <div className={cn('mb-4 flex flex-col gap-6 last:mb-0', formClassName)}>
            {formFromProps?.fields?.map((field, index) => {
              // Special field types that manage their own fields or are display-only
              // - userInfo: renders multiple form.AppField internally (one per option)
              if (field.blockType === 'userInfo') {
                return <UserInfo key={`${field.blockType}-${index}`} {...(field as any)} />
              }

              if ('name' in field) {
                const componentKey = capitalize(field.blockType)
                return (
                  <form.AppField
                    name={field.name}
                    key={`${field.blockType}-${index}`}
                    children={(component) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const Component = (component as any)?.[componentKey]
                      if (Component) {
                        return <Component {...(field as any)} />
                      }
                      return (
                        <p className="text-red-500">Component not found for {field.blockType}</p>
                      )
                    }}
                  />
                )
              }
              return null
            })}
          </div>
          {children}
          <form.SubmitButton label={submitButtonLabel || 'Submit'} />
        </form.AppForm>
      </form>
    </div>
  )
}
