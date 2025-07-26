import "../globals.css";

import { currentUser } from "@/lib/auth/context/get-context-props";
import { RedirectToSignIn } from "@daveyplate/better-auth-ui";

import { getServerSideURL } from "@/lib/payload";
import { mergeOpenGraph } from "@/lib/payload/merge-open-graph";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  title: {
    template: "%s | Acme Dashboard",
    default: "Dashboard",
  },
  description: "Acme Dashboard",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    return <RedirectToSignIn />;
  }
  return children;
}
