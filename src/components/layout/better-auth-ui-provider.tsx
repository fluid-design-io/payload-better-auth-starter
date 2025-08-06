"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { authClient } from "@/lib/auth/client";
import { AccountDialog } from "../dashboard/account-dialog";

export function BetterAuthUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={router.refresh}
      viewPaths={{
        SETTINGS: `#account/Account`,
      }}
      credentials={{
        forgotPassword: true,
      }}
      //! use `basePath` to chagne it from `/` rootview
      settingsURL={`${pathname}#account/Account`}
      passkey
      emailOTP
      basePath='/'
      signUp={{
        fields: ["name"],
      }}
      Link={Link}
      deleteUser={{
        verification: true,
      }}
    >
      {children}
      <Suspense fallback={null}>
        <AccountDialog />
      </Suspense>
    </AuthUIProvider>
  );
}
