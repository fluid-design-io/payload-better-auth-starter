import Link from 'next/link'

import { Main } from '@/components/layout/main'
import RichText from '@/components/payload/rich-text'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Muted } from '@/components/ui/typography'

import { getCachedGlobal } from '@/lib/payload/get-globals'

import type { GlobalTerm } from '@/payload-types'

export default async function TermsOfUsePage() {
  const termsOfUse = (await getCachedGlobal('global-terms', 1)()) as GlobalTerm

  if (!termsOfUse.content) {
    return (
      <Main>
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          <Alert variant="destructive">
            <AlertTitle>No terms of use found</AlertTitle>
            <AlertDescription>
              <Muted>
                Please create a terms of use in the{' '}
                <Link href="/admin/globals/global-terms" className="underline">
                  admin panel
                </Link>
                .
              </Muted>
            </AlertDescription>
          </Alert>
        </div>
      </Main>
    )
  }
  return (
    <Main>
      <RichText data={termsOfUse.content} />
    </Main>
  )
}
