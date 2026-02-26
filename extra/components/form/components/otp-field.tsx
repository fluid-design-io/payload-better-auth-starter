'use client'

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'

import { useFieldContext } from '../hooks/form-context'

export default function OTPField({
  label,
  description,
  maxLength = 6,
  onComplete,
  showSeparator = true,
  ...otpProps
}: {
  label: string
  description?: string
  maxLength?: number
  onComplete?: () => void
  showSeparator?: boolean
} & Omit<
  React.ComponentProps<typeof InputOTP>,
  'value' | 'onChange' | 'maxLength' | 'onComplete' | 'children' | 'render'
>) {
  const field = useFieldContext<string>()

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
  const halfLength = Math.floor(maxLength / 2)

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name} className={label ? '' : 'sr-only'}>
        {label || 'One-Time Password'}
      </FieldLabel>
      <FieldContent>
        <InputOTP
          {...otpProps}
          id={field.name}
          maxLength={maxLength}
          value={field.state.value}
          onChange={(value) => field.handleChange(value)}
          onComplete={onComplete}
          aria-invalid={isInvalid}
        >
          <InputOTPGroup>
            {Array.from({ length: halfLength }).map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
          {showSeparator && <InputOTPSeparator />}
          <InputOTPGroup>
            {Array.from({ length: maxLength - halfLength }).map((_, index) => (
              <InputOTPSlot key={halfLength + index} index={halfLength + index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  )
}
