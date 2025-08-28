'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export const useHash = () => {
  const router = useRouter()
  const path = usePathname()
  const search = useSearchParams()

  const [hash, setHash] = React.useState(typeof window !== 'undefined' ? window.location.hash : '')

  React.useEffect(() => {
    const onHashChanged = () => setHash(window.location.hash)
    const { pushState, replaceState } = window.history
    window.history.pushState = (...args) => {
      pushState.apply(window.history, args)
      setTimeout(() => setHash(window.location.hash))
    }
    window.history.replaceState = (...args) => {
      replaceState.apply(window.history, args)
      setTimeout(() => setHash(window.location.hash))
    }
    window.addEventListener('hashchange', onHashChanged)
    return () => {
      window.removeEventListener('hashchange', onHashChanged)
    }
  }, [])

  const removeHash = () => {
    let newPath = path ?? ''
    if (search) newPath += `?${search.toString()}`
    router.replace(newPath, { scroll: false })
  }

  return { hash, removeHash }
}
