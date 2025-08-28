import { Container, Section, Text } from '@react-email/components'
import { render } from '@react-email/render'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import AcmeTemplate from '../email/email-template'

type User = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
  image?: string | null | undefined
}

const emailStyles = {
  container: {
    backgroundColor: '#f3f4f6',
    padding: '1rem',
    borderRadius: '0.5rem',
    margin: '1rem 0',
    textAlign: 'center' as const,
  },
  code: {
    fontSize: '2rem',
    fontWeight: 'bold',
    letterSpacing: '0.5rem',
    color: '#1f2937',
  },
  center: {
    textAlign: 'center' as const,
  },
  bold: {
    fontWeight: 'bold',
  },
  large: {
    fontSize: '24px',
  },
  muted: {
    color: '#6b7280',
  },
}

export async function sendVerificationEmail({
  user,
  url,
  token,
}: {
  user: User
  url: string
  token: string
}) {
  const config = await payloadConfig
  const payload = await getPayload({ config })
  const name = user.name || user.email.split('@')[0]

  await payload.sendEmail({
    to: user.email,
    subject: 'Verify your email address',
    html: await render(
      <AcmeTemplate
        heading="Verify your email address"
        subtitle="Account verification"
        content={
          <>
            <Text>Hi {name},</Text>
            <Text>Click the button below to verify your email address.</Text>
          </>
        }
        url={url}
        action="Verify Email"
      />
    ),
  })
}

export async function sendChangeEmailVerification({
  user,
  newEmail,
  url,
  token,
}: {
  user: User
  newEmail: string
  url: string
  token: string
}) {
  const config = await payloadConfig
  const payload = await getPayload({ config })

  await payload.sendEmail({
    to: newEmail,
    subject: 'Account Email Change',
    html: await render(
      <AcmeTemplate
        heading="Account Email Change"
        action="Verify Email"
        url={url}
        content={
          <>
            <Text>{`Hello ${user?.name || user?.email || 'there'},`}</Text>
            <Text>
              You are receiving this email because you have requested to change your email address.
              Once verified, you will be able to login with your new email address.
            </Text>
            <Container style={emailStyles.container}>
              <Text style={emailStyles.muted}>Old Email:</Text>
              <Text style={emailStyles.large}>{user.email}</Text>
            </Container>
            <Container style={emailStyles.center}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Arrow Down</title>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M18 13l-6 6" />
                <path d="M6 13l6 6" />
              </svg>
            </Container>
            <Container style={emailStyles.container}>
              <Text style={emailStyles.muted}>New Email:</Text>
              <Text style={emailStyles.large}>{newEmail}</Text>
            </Container>
          </>
        }
      />
    ),
  })
}

export async function sendResetPasswordEmail({
  user,
  url,
  token,
}: {
  user: User
  url: string
  token: string
}) {
  const config = await payloadConfig
  const payload = await getPayload({ config })

  await payload.sendEmail({
    to: user.email,
    subject: 'Reset your password',
    html: await render(
      <AcmeTemplate
        action="Reset Password"
        content={
          <>
            <Text>{`Hello ${user?.name || user?.email || 'there'},`}</Text>
            <Text>Click the button below to reset your password.</Text>
            {token && (
              <div style={emailStyles.container}>
                <Text>Or use this reset code:</Text>
                <div style={emailStyles.code}>{token}</div>
              </div>
            )}
          </>
        }
        heading="Reset Password"
        url={url}
      />
    ),
  })
}

export async function sendDeleteAccountVerification({
  user,
  url,
  token,
}: {
  user: User
  url: string
  token: string
}) {
  const config = await payloadConfig
  const payload = await getPayload({ config })

  await payload.sendEmail({
    to: user.email,
    subject: 'Delete your account',
    html: await render(
      <AcmeTemplate
        action="Delete Account"
        content={
          <>
            <Text>{`Hello ${user?.name || user?.email || 'there'},`}</Text>
            <Text>
              Click the button below to delete your account. This action cannot be undone.
            </Text>
          </>
        }
        heading="Delete Account"
        url={url}
      />
    ),
  })
}

export async function sendVerificationOTP({
  email,
  otp,
  type,
}: {
  email: string
  otp: string
  type: string
}) {
  const config = await payloadConfig
  const payload = await getPayload({ config })
  await payload.sendEmail({
    to: email,
    subject: `Verify your ${type}`,
    html: await render(
      <AcmeTemplate
        heading={`Verify ${type}`}
        action={`OTP Verification`}
        content={
          <>
            <Text>Hello,</Text>
            <Text>Use the code below to verify your {type}.</Text>
            <Section style={emailStyles.container}>
              <Text style={emailStyles.code}>{otp}</Text>
            </Section>
          </>
        }
      />
    ),
  })
}
