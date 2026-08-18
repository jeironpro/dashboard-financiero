import { useEffect, useRef } from 'react'
import { growBars } from '@/lib/anime'
import { formatMoney, formatMonthKey, formatNumber } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { MonthlyPoint } from '@/types/finance'

interface RevenueChartProps {
  data: MonthlyPoint[]
  className?: string
}

/** Chart de barras agrupadas (facturado pear / gastos cyan) de los últimos 12 meses. */
export function RevenueChart({ data, className }: RevenueChartProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) growBars(ref.current)
  }, [])

  const max = Math.max(...data.map((p) => Math.max(p.income, p.expenses)))
  const ytdIncome = data.reduce((acc, p) => acc + p.income, 0)
  const ytdExpenses = data.reduce((acc, p) => acc + p.expenses, 0)

  return (
    <div
      ref={ref}
      data-reveal
      className={cn(
        'rounded-[var(--radius-xl)] border border-rule bg-card p-4 shadow-[var(--shadow-whisper)] sm:p-5',
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-display text-base font-semibold tracking-tight text-ink">
            Ingresos vs. gastos
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Facturado (12 meses) {formatMoney(ytdIncome)} · Gastos (12 meses){' '}
            {formatMoney(ytdExpenses)}
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground" aria-hidden="true">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-pear" /> Facturado
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-cyan" /> Gastos
          </span>
        </div>
      </div>

      <div
        className="mt-4 flex h-44 gap-1 sm:h-52 sm:gap-1.5"
        role="img"
        aria-label="Gráfica de barras de facturado y gastos por mes, últimos 12 meses"
      >
        {data.map((point, index) => {
          const hIncome = Math.max(2, (point.income / max) * 100)
          const hExpenses = Math.max(2, (point.expenses / max) * 100)
          const isCurrent = index === data.length - 1
          return (
            <div key={point.month} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end justify-center gap-0.5 sm:gap-1">
                <div
                  data-bar
                  title={`${formatMonthKey(point.month)} · Facturado ${formatMoney(point.income)}`}
                  className={cn('w-1.5 rounded-full bg-pear sm:w-2.5', isCurrent && 'ring-1 ring-pear-deep')}
                  style={{ height: `${hIncome}%` }}
                />
                <div
                  data-bar
                  title={`${formatMonthKey(point.month)} · Gastos ${formatMoney(point.expenses)}`}
                  className="w-1.5 rounded-full bg-cyan/80 sm:w-2.5"
                  style={{ height: `${hExpenses}%` }}
                />
              </div>
              <span
                className={cn(
                  'text-[10px] leading-none text-faint',
                  index % 2 === 1 && 'hidden sm:block',
                  isCurrent && 'font-semibold text-pear-deep',
                )}
              >
                {formatMonthKey(point.month).split(' ')[0]}
              </span>
            </div>
          )
        })}
      </div>

      {/* Fallback accesible: tabla de los mismos datos */}
      <table className="sr-only">
        <caption>Facturado y gastos mensuales (últimos 12 meses)</caption>
        <thead>
          <tr>
            <th scope="col">Mes</th>
            <th scope="col">Facturado (MXN)</th>
            <th scope="col">Gastos (MXN)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point) => (
            <tr key={point.month}>
              <th scope="row">{formatMonthKey(point.month)}</th>
              <td>{formatNumber(point.income)}</td>
              <td>{formatNumber(point.expenses)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
