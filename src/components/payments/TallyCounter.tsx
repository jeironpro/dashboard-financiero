import { useEffect, useRef } from 'react'
import { drawLine } from '@/lib/anime'

interface TallyCounterProps {
    /** Trazos del grupo en curso (0–5). */
    strokes: number
}

const VERTICALS = [
    { x1: 15, x2: 15 },
    { x1: 35, x2: 35 },
    { x1: 55, x2: 55 },
    { x1: 75, x2: 75 },
]

/**
 * El «character moment»: una marca de tally que se dibuja trazo a trazo.
 * Cada cobro simulado agrega un trazo vertical; el 5.º completa el grupo con la diagonal.
 */
export function TallyCounter({ strokes }: TallyCounterProps) {
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const svg = svgRef.current
        if (!svg) return
        const fresh = svg.querySelectorAll<SVGLineElement>('line[data-fresh]')
        fresh.forEach((line) => {
            line.removeAttribute('data-fresh')
            drawLine(line, { duration: 240 })
        })
    }, [strokes])

    const verticals = VERTICALS.slice(0, Math.min(strokes, 4))
    const showDiagonal = strokes >= 5

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 110 58"
            aria-hidden="true"
            className="h-14 w-auto"
            fill="none"
        >
            <g stroke="var(--color-accent-deep)" strokeWidth={7} strokeLinecap="round">
                {verticals.map((v, index) => (
                    <line
                        key={`v-${index}`}
                        data-fresh={index === strokes - 1 && strokes <= 4 ? '' : undefined}
                        x1={v.x1}
                        y1="10"
                        x2={v.x2}
                        y2="50"
                    />
                ))}
                {showDiagonal && <line data-fresh x1="92" y1="48" x2="8" y2="14" />}
            </g>
        </svg>
    )
}
