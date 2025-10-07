import { NuqsAdapter } from 'nuqs/adapters/next/app'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <NuqsAdapter>{children}</NuqsAdapter>
}
