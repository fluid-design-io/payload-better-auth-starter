import payloadConfig from "@/payload.config";
import { getPayload } from "payload";
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

const fromEmail = "bot@acme.com";

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
    from: fromEmail,
    to: user.email,
    subject: "Verify your email address",
    react: AcmeTemplate({
      action: "Verify Email",
      content: (
        <>
          <p>{`Hello ${name},`}</p>
          <p>Click the button below to verify your email address.</p>
          {token && (
            <div style={otpStyles.container}>
              <p>Or use this verification code:</p>
              <div style={otpStyles.code}>{token}</div>
            </div>
          )}
        </>
      ),
      heading: "Verify Email",
      baseUrl: "https://acme.com",
      url,
    }),
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
    from: fromEmail,
    to: user.email,
    subject: "Email verified successfully",
    react: AcmeTemplate({
      action: "Email verified",
      content: (
        <>
          <p>{`Hello ${user?.name || user?.email || "there"},`}</p>
          <p>
            Your email has been verified. You can now login to your account.
          </p>
          {token && (
            <div style={otpStyles.container}>
              <p>Or use this verification code:</p>
              <div style={otpStyles.code}>{token}</div>
            </div>
          )}
        </>
      ),
      heading: "Email verified",
      baseUrl: "https://acme.com",
      url,
    }),
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
    from: fromEmail,
    to: user.email,
    subject: "Reset your password",
    react: AcmeTemplate({
      action: "Reset Password",
      content: (
        <>
          <p>{`Hello ${user?.name || user?.email || "there"},`}</p>
          <p>Click the button below to reset your password.</p>
          {token && (
            <div style={otpStyles.container}>
              <p>Or use this reset code:</p>
              <div style={otpStyles.code}>{token}</div>
            </div>
          )}
        </>
      ),
      heading: "Reset Password",
      baseUrl: "https://acme.com",
      url,
    }),
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
    from: fromEmail,
    to: user.email,
    subject: "Delete your account",
    react: AcmeTemplate({
      action: "Delete Account",
      content: (
        <>
          <p>{`Hello ${user?.name || user?.email || "there"},`}</p>
          <p>
            Click the button below to delete your account. This action cannot be
            undone.
          </p>
          {token && (
            <div style={otpStyles.container}>
              <p>Or use this verification code:</p>
              <div style={otpStyles.code}>{token}</div>
            </div>
          )}
        </>
      ),
      heading: "Delete Account",
      baseUrl: "https://acme.com",
      url,
    }),
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
    from: fromEmail,
    to: email,
    subject: `Verify your ${type}`,
    react: AcmeTemplate({
      action: `Verify ${type}`,
      content: (
        <>
          <p>Hello,</p>
          <p>Use the code below to verify your {type}.</p>
          <div style={otpStyles.container}>
            <div style={otpStyles.code}>{otp}</div>
          </div>
        </>
      ),
      heading: `Verify ${type}`,
      baseUrl: "https://acme.com",
    }),
  });
}
