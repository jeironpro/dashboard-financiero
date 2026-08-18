import { cn } from '@/lib/utils'
import type { StatusMeta } from '@/lib/status'

interface StatusBadgeProps {
  meta: StatusMeta
  className?: string
  /** Marca el punto para el pulso de indicadores (anime.js). */
  pulse?: boolean
}

export function StatusBadge({ meta, className, pulse = false }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium',
        meta.soft,
        meta.text,
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', meta.dot)} data-pulse={pulse || undefined} />
      {meta.label}
    </span>
  )
}
