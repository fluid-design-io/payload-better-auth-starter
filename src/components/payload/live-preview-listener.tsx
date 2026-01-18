'use client'

import { useRouter } from 'next/navigation'
import type React from 'react'

import { getServerSideURL } from '@/lib/payload'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  return <PayloadLivePreview refresh={router.refresh} serverURL={getServerSideURL()} />
}
