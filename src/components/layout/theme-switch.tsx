'use client'

import type { LucideIcon } from 'lucide-react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { useTheme } from 'next-themes'

export function ThemeSelector() {
  const { setTheme, theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const modes = [
    {
      icon: Sun,
      name: 'light',
    },
    {
      icon: Monitor,
      name: 'system',
    },
    {
      icon: Moon,
      name: 'dark',
    },
  ]
  useEffect(() => setIsMounted(true), [])
  return (
    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
      {modes.map(({ name, icon }) => (
        <ModeButton
          key={name}
          onClick={() => setTheme(name)}
          icon={icon}
          name={name}
          isActive={isMounted && theme === name}
        />
      ))}
    </div>
  )
}

const ModeButton = ({
  onClick,
  icon: Icon,
  isActive,
  name,
}: {
  onClick: () => void
  icon: LucideIcon
  isActive: boolean
  name: string
}) => (
  <button
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-background',
      isActive && 'bg-background text-foreground shadow',
      !isActive && 'hover:text-foreground'
    )}
    onClick={onClick}
    type="button"
  >
    <div className="sr-only">Toggle {name} mode</div>
    <Icon className="size-4" />
  </button>
)
