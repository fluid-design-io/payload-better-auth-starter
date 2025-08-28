import { cn } from '@/lib/utils'

function Highlightborder({ position = 'top' }: { position?: 'top' | 'bottom' }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'user-select-none center pointer-events-none absolute left-1/2 h-px w-[300px] max-w-[300px] -translate-x-1/2',
        { 'bottom-[-1px]': position === 'bottom' },
        { 'top-[-1px]': position === 'top' },
        '[--border-highlight:color-mix(in_oklch,var(--color-border)_50%,black_8%)] dark:[--border-highlight:color-mix(in_oklch,var(--color-border)_50%,white_30%)]',
        '[--border-highlight-opacity:1] dark:[--border-highlight-opacity:0.57]',
        '[--border-start:255_255_255] dark:[--border-start:0_0_0]'
      )}
      style={{
        background:
          'linear-gradient(90deg, transparent 0%, var(--border-highlight) 50%, transparent 100%)',
      }}
    />
  )
}

export default Highlightborder
