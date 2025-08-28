'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import canUseDOM from '@/lib/payload/can-use-dom'

const ScrollProgress = () => {
  const [progressPercentage, setProgressPercentage] = useState(0)
  const pathname = usePathname()

  const handleScroll = () => {
    if (typeof document === 'undefined') return null
    const article = document.querySelector('article')
    if (!article) return null

    const { top, height } = article.getBoundingClientRect()
    const viewportHeight = document.documentElement.clientHeight
    const scrollDistance = -top + 64 // 64 is the header height
    const progressPercentage = (scrollDistance / (height - (viewportHeight / 3) * 2)) * 100 // Divided by thrid viewport height
    setProgressPercentage(progressPercentage)
  }

  useEffect(() => {
    if (!canUseDOM) return
    const isPress = pathname.includes('/blog/')
    if (!isPress) return
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  const isActive = progressPercentage <= 100

  return (
    <div className="sticky top-[calc(4rem+0px)] z-20 flex h-[2px] w-full justify-start">
      <div
        className="absolute bottom-0 right-0 top-0 h-full w-screen bg-primary transition-opacity duration-700 will-change-transform"
        style={{
          display: isActive ? 'absolute' : 'relative',
          transform: `translate3d(${isActive ? `${progressPercentage - 100}%` : '0'},0,0)`,
          opacity: isActive ? 1 : 0,
        }}
      />
    </div>
  )
}

export default ScrollProgress
