'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type React from 'react'
import { useCallback, useState } from 'react'

import RichText from '@/components/payload/rich-text'
import { Button } from '@/components/ui/button'

import { getClientSideURL } from '@/lib/payload'
import { cn } from '@/lib/utils'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { FormProvider, useForm } from 'react-hook-form'
import type { Form } from '@/payload-types'
import { fields } from './fields'

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
  enableIntro: boolean
  form: Form
  introContent?: SerializedEditorState
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
  buttonClassName?: string
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    introContent,
    rootClassName,
    className,
    formClassName,
    buttonClassName,
    children,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
  } = props
  const searchParams = useSearchParams()
  const allParams = Object.fromEntries(searchParams.entries())

  // Add default values from search params
  const defaultValues = formFromProps.fields?.reduce((acc: Record<string, string>, field) => {
    if ('name' in field) {
      if (allParams[field.name]) {
        acc[field.name] = allParams[field.name]
      }
    }
    return acc
  }, {})

  const formMethods = useForm<NonNullable<Form>>({
    defaultValues,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Form) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

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

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType]
  )

  return (
    <div className={cn('container lg:max-w-[48rem]', rootClassName)}>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className={cn('rounded-md border border-border p-4 lg:p-6', className)}>
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && (
            <RichText data={confirmationMessage} enableProse={false} />
          )}
          {isLoading && !hasSubmitted && (
            <div className="flex items-center justify-center gap-2">
              <p>Loading, please wait...</p>
            </div>
          )}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className={cn('mb-4 flex flex-col gap-6 last:mb-0', formClassName)}>
                {formFromProps?.fields?.map((field, index) => {
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <Field
                        key={`${field.blockType}-${index}`}
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    )
                  }
                  return null
                })}
              </div>
              {children}
              <Button form={formID} type="submit" className={buttonClassName}>
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
