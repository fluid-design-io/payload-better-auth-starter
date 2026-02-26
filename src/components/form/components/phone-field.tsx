'use client'

import { PhoneIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

import { lookup } from 'country-data-list'
import parsePhoneNumber from 'libphonenumber-js'
import { CircleFlag } from 'react-circle-flags'
import { useFieldContext } from '../hooks/form-context'

export type CountryData = {
  alpha2: string
  alpha3: string
  countryCallingCodes: string[]
  currencies: string[]
  emoji?: string
  ioc: string
  languages: string[]
  name: string
  status: string
}

export default function PhoneField({
  label,
  description,
  placeholder = 'Enter phone number',
  defaultCountry,
  onCountryChange,
  ...inputProps
}: {
  label: string
  description?: string
  placeholder?: string
  defaultCountry?: string
  onCountryChange?: (data: CountryData | undefined) => void
} & Omit<
  React.ComponentProps<typeof Input>,
  'id' | 'name' | 'value' | 'onBlur' | 'onChange' | 'type'
>) {
  const field = useFieldContext<string>()
  const [displayFlag, setDisplayFlag] = useState<string>('')
  const [hasInitialized, setHasInitialized] = useState(false)

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const value = field.state.value

  // Initialize with default country
  useEffect(() => {
    if (defaultCountry) {
      const countryData = lookup.countries({
        alpha2: defaultCountry.toLowerCase(),
      })[0]
      setDisplayFlag(defaultCountry.toLowerCase())

      if (!hasInitialized && countryData?.countryCallingCodes?.[0] && !value) {
        field.handleChange(countryData.countryCallingCodes[0])
        setHasInitialized(true)
      }
    }
  }, [defaultCountry, value, hasInitialized, field])

  // Update flag when value changes externally
  useEffect(() => {
    if (value) {
      try {
        const parsed = parsePhoneNumber(value)
        if (parsed?.country) {
          setDisplayFlag(parsed.country.toLowerCase())
        }
      } catch {
        // Ignore parsing errors for partial input
      }
    }
  }, [value])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value

    // Ensure the value starts with "+"
    if (!newValue.startsWith('+')) {
      if (newValue.startsWith('00')) {
        newValue = `+${newValue.slice(2)}`
      } else {
        newValue = `+${newValue}`
      }
    }

    try {
      const parsed = parsePhoneNumber(newValue)

      if (parsed?.country) {
        const countryCode = parsed.country
        setDisplayFlag(countryCode.toLowerCase())

        const countryInfo = lookup.countries({ alpha2: countryCode })[0]
        onCountryChange?.(countryInfo)

        field.handleChange(parsed.number)
      } else {
        field.handleChange(newValue)
        setDisplayFlag('')
        onCountryChange?.(undefined)
      }
    } catch {
      field.handleChange(newValue)
      setDisplayFlag('')
      onCountryChange?.(undefined)
    }
  }

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <FieldContent>
        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            {displayFlag ? (
              <CircleFlag countryCode={displayFlag} height={16} className="size-4 rounded-full" />
            ) : (
              <PhoneIcon className="text-muted-foreground size-4" />
            )}
          </div>
          <Input
            {...inputProps}
            id={field.name}
            name={field.name}
            value={value}
            onBlur={field.handleBlur}
            onChange={handlePhoneChange}
            type="tel"
            autoComplete="tel"
            placeholder={placeholder}
            aria-invalid={isInvalid}
            className={cn('pl-9', inputProps.className)}
          />
        </div>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  )
}
