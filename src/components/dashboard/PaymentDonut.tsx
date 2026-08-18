import { useEffect, useRef } from 'react'
import { drawDonut } from '@/lib/anime'
import { formatMoney, formatNumber } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { PaymentSummary } from '@/types/finanzas'

interface PaymentDonutProps {
  summary: PaymentSummary
  className?: string
}

const RADIUS = 44
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Donut de pendientes/exitosos/fallidos del mes en curso. */
export function PaymentDonut({ summary, className }: PaymentDonutProps) {
  const ref = useRef<HTMLDivElement>(null)

  const total = summary.paid.amount + summary.pending.amount + summary.failed.amount
  const segments = [
    {
      key: 'paid' as const,
      label: 'Exitosos',
      amount: summary.paid.amount,
      count: summary.paid.count,
      stroke: 'var(--color-success)',
      text: 'text-success',
    },
    {
      key: 'pending' as const,
      label: 'Pendientes',
      amount: summary.pending.amount,
      count: summary.pending.count,
      stroke: 'var(--color-warning)',
      text: 'text-warning',
    },
    {
      key: 'failed' as const,
      label: 'Fallidos',
      amount: summary.failed.amount,
      count: summary.failed.count,
      stroke: 'var(--color-danger)',
      text: 'text-danger',
    },
  ]

  // Offset acumulado por segmento (sentido horario desde las 12).
  let acc = 0
  const withOffsets = segments.map((segment) => {
    const fraction = total > 0 ? segment.amount / total : 0
    const length = fraction * CIRCUMFERENCE
    const offset = -acc // los dashoffset negativos giran en sentido horario
    acc += length
    return { ...segment, length, offset }
  })

  useEffect(() => {
    if (ref.current) drawDonut(ref.current)
  }, [])

  return (
    <div
      ref={ref}
      data-reveal
      className={cn(
        'rounded-[var(--radius-xl)] border border-rule bg-card p-4 shadow-[var(--shadow-whisper)] sm:p-5',
        className,
      )}
    >
      <p className="font-display text-base font-semibold tracking-tight text-ink">
        Estado de pagos · mes en curso
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {formatNumber(total > 0 ? withOffsets[0].count + withOffsets[1].count + withOffsets[2].count : 0)}{' '}
        movimientos · {formatMoney(total)}
      </p>

      <div className="mt-3 flex items-center gap-5">
        <div
          className="relative size-32 shrink-0"
          role="img"
          aria-label={`Pagos exitosos ${summary.paid.count}, pendientes ${summary.pending.count}, fallidos ${summary.failed.count}`}
        >
          <svg viewBox="0 0 120 120" className="size-full -rotate-90">
            {withOffsets.map((segment) => (
              <circle
                key={segment.key}
                data-segment
                data-length={segment.length}
                data-offset={segment.offset}
                cx="60"
                cy="60"
                r={RADIUS}
                fill="none"
                stroke={segment.stroke}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${Math.max(segment.length, 0.5)} ${CIRCUMFERENCE}`}
                className="transition-opacity hover:opacity-80"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="num text-xl font-semibold text-ink">{formatMoney(total)}</span>
            <span className="text-[10px] uppercase tracking-wider text-faint">total</span>
          </div>
        </div>

        <ul className="min-w-0 flex-1 space-y-2.5">
          {withOffsets.map((segment) => (
            <li key={segment.key} className="flex items-center gap-2 text-sm">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: segment.stroke }}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-ink">{segment.label}</span>
                <span className="block text-xs text-faint">
                  {segment.count} · {formatMoney(segment.amount)}
                </span>
              </span>
              <span className={cn('num text-xs font-semibold', segment.text)}>
                {total > 0 ? Math.round((segment.amount / total) * 100) : 0} %
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
