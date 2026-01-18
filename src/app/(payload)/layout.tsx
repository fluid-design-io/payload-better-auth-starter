/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type React from 'react'

import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import { importMap } from './admin/importMap.js'
import './custom.scss'
import { Suspense } from 'react'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <Suspense>
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  </Suspense>
)

export default Layout
