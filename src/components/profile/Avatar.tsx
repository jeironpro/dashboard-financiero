import { cn } from '@/lib/utils'

interface AvatarProps {
  name: string
  className?: string
}

/** Iniciales del nombre en un círculo de color de la marca. */
export function Avatar({ name, className }: AvatarProps) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-pear-soft text-sm font-semibold text-ink',
        className,
      )}
    >
      {initials}
    </span>
  )
}
