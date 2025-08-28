import Link from 'next/link'

import { Main } from '@/components/layout/main'
import RichText from '@/components/payload/rich-text'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Muted } from '@/components/ui/typography'

import { getCachedGlobal } from '@/lib/payload/get-globals'

import type { GlobalPrivacy } from '@/payload-types'

export default async function TermsOfUsePage() {
  const privacy = (await getCachedGlobal('global-privacy', 1)()) as GlobalPrivacy

  if (!privacy.content) {
    return (
      <Main>
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          <Alert variant="destructive">
            <AlertTitle>No privacy policy found</AlertTitle>
            <AlertDescription>
              <Muted>
                Please create a privacy policy in the{' '}
                <Link href="/admin/globals/global-privacy" className="underline">
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
    <Main className="py-16">
      <RichText data={privacy.content} />
    </Main>
  )
}
