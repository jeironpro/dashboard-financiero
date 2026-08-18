import { useEffect, useRef } from 'react'
import { drawLine } from '@/lib/anime'
import { cn } from '@/lib/utils'

interface TallyMarkProps {
  className?: string
  /** Color del trazo; por defecto el borde pear (marca de la casa). */
  strokeClassName?: string
}

/**
 * El «character moment» de Hum: la marca de tally (4 trazos + diagonal).
 * Se dibuja sola al montar usando el trazo SVG de anime.js.
 */
export function TallyMark({ className, strokeClassName = 'stroke-pear-deep' }: TallyMarkProps) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const lines = Array.from(svg.querySelectorAll<SVGLineElement>('line'))
    lines.forEach((line, index) => {
      drawLine(line, { duration: 380 + index * 90 })
    })
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn('size-8', className)}
      fill="none"
    >
      <g
        strokeWidth={5}
        strokeLinecap="round"
        className={strokeClassName}
      >
        <line x1="10" y1="8" x2="10" y2="40" />
        <line x1="19" y1="8" x2="19" y2="40" />
        <line x1="28" y1="8" x2="28" y2="40" />
        <line x1="37" y1="8" x2="37" y2="40" />
        <line x1="42" y1="36" x2="5" y2="14" />
      </g>
    </svg>
  )
}
