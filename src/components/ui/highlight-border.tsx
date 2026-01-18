import { cn } from '@/lib/utils'

export default function Highlightborder({ position = 'top' }: { position?: 'top' | 'bottom' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'user-select-none center pointer-events-none absolute left-1/2 h-px w-[300px] max-w-[300px] -translate-x-1/2 -translate-y-1/2',
        { 'bottom-[-1px]': position === 'bottom' },
        { 'top-[-1px]': position === 'top' },
        '[--border-highlight:255_255_255] dark:[--border-highlight:143_143_143]',
        '[--border-highlight-opacity:1] dark:[--border-highlight-opacity:0.57]',
        '[--border-start:255_255_255] dark:[--border-start:0_0_0]'
      )}
      style={{
        background:
          'linear-gradient(90deg, rgb(var(--border-start)/0) 0%, rgb(var(--border-highlight)/var(--border-highlight-opacity)) 50%, rgb(var(--border-start)/0) 100%)',
      }}
    />
  )
}
