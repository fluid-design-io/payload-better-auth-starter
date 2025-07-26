import { Section, Text } from "@react-email/components";
import { render } from "@react-email/render";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import AcmeTemplate from "../email/email-template";

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined;
};

const otpStyles = {
  container: {
    backgroundColor: "#f3f4f6",
    padding: "1rem",
    borderRadius: "0.5rem",
    margin: "1rem 0",
    textAlign: "center" as const,
  },
  code: {
    fontSize: "2rem",
    fontWeight: "bold",
    letterSpacing: "0.5rem",
    color: "#1f2937",
  },
};

export async function sendVerificationEmail({
  user,
  url,
  token,
}: {
  user: User;
  url: string;
  token: string;
}) {
  const config = await payloadConfig;
  const payload = await getPayload({ config });
  const name = user.name || user.email.split("@")[0];

  await payload.sendEmail({
    to: user.email,
    subject: "Verify your email address",
    html: await render(
      <AcmeTemplate
        heading='Verify your email address'
        subtitle='Click the button below to verify your email address.'
        content={
          <>
            <Text>Hi {name},</Text>
            <Text>Click the button below to verify your email address.</Text>
          </>
        }
        url={url}
      />
    ),
  });
}

export async function sendChangeEmailVerification({
  user,
  newEmail,
  url,
  token,
}: {
  user: User;
  newEmail: string;
  url: string;
  token: string;
}) {
  const config = await payloadConfig;
  const payload = await getPayload({ config });

  await payload.sendEmail({
    to: user.email,
    subject: "Email verified successfully",
    html: await render(
      <AcmeTemplate
        action='Email verified'
        content={
          <>
            <Text>{`Hello ${user?.name || user?.email || "there"},`}</Text>
            <Text>
              Your email has been verified. You can now login to your account.
            </Text>
            {token && (
              <div style={otpStyles.container}>
                <Text>Or use this verification code:</Text>
                <div style={otpStyles.code}>{token}</div>
              </div>
            )}
          </>
        }
        heading='Email verified'
      />
    ),
  });
}

export async function sendResetPasswordEmail({
  user,
  url,
  token,
}: {
  user: User;
  url: string;
  token: string;
}) {
  const config = await payloadConfig;
  const payload = await getPayload({ config });

  await payload.sendEmail({
    to: user.email,
    subject: "Reset your password",
    html: await render(
      <AcmeTemplate
        action='Reset Password'
        content={
          <>
            <Text>{`Hello ${user?.name || user?.email || "there"},`}</Text>
            <Text>Click the button below to reset your password.</Text>
            {token && (
              <div style={otpStyles.container}>
                <Text>Or use this reset code:</Text>
                <div style={otpStyles.code}>{token}</div>
              </div>
            )}
          </>
        }
        heading='Reset Password'
        url={url}
      />
    ),
  });
}

export async function sendDeleteAccountVerification({
  user,
  url,
  token,
}: {
  user: User;
  url: string;
  token: string;
}) {
  const config = await payloadConfig;
  const payload = await getPayload({ config });

  await payload.sendEmail({
    to: user.email,
    subject: "Delete your account",
    html: await render(
      <AcmeTemplate
        action='Delete Account'
        content={
          <>
            <Text>{`Hello ${user?.name || user?.email || "there"},`}</Text>
            <Text>
              Click the button below to delete your account. This action cannot
              be undone.
            </Text>
            {token && (
              <div style={otpStyles.container}>
                <Text>Or use this verification code:</Text>
                <div style={otpStyles.code}>{token}</div>
              </div>
            )}
          </>
        }
        heading='Delete Account'
        url={url}
      />
    ),
  });
}

export async function sendVerificationOTP({
  email,
  otp,
  type,
}: {
  email: string;
  otp: string;
  type: string;
}) {
  const config = await payloadConfig;
  const payload = await getPayload({ config });
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
            <Section style={otpStyles.container}>
              <Text style={otpStyles.code}>{otp}</Text>
            </Section>
          </>
        }
      />
    ),
  });
}
