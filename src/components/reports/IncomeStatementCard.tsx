import { formatMoneyFull, formatMonthRange } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { IncomeStatement } from '@/types/finance'

interface IncomeStatementCardProps {
  statement: IncomeStatement
}

function Row({
  label,
  value,
  strong = false,
  tone,
}: {
  label: string
  value: string
  strong?: boolean
  tone?: string
}) {
  return (
    <div
      className={cn(
        'flex items-baseline justify-between gap-3 py-2',
        strong && 'border-t border-rule pt-2.5',
      )}
    >
      <span className={cn('text-sm', strong ? 'font-semibold text-ink' : 'text-muted-foreground')}>
        {label}
      </span>
      <span className={cn('num text-sm', strong ? 'font-semibold' : 'text-ink', tone)}>{value}</span>
    </div>
  )
}

export function IncomeStatementCard({ statement }: IncomeStatementCardProps) {
  return (
    <div
      data-reveal
      className="rounded-[var(--radius-xl)] border border-rule bg-card p-5 shadow-[var(--shadow-whisper)]"
    >
      <p className="font-display text-base font-semibold tracking-tight text-ink">
        Estado de resultados
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {formatMonthRange(statement.period.split('–')[0], statement.period.split('–')[1])}
      </p>

      <div className="mt-3">
        <Row label="Ingresos por servicios" value={formatMoneyFull(statement.income)} />
        <Row label="Gastos de operación" value={`(${formatMoneyFull(statement.expenses)})`} />
        <Row
          label="Utilidad bruta"
          value={formatMoneyFull(statement.grossProfit)}
          strong
          tone="text-success"
        />
        <Row label="ISR (30 %)" value={`(${formatMoneyFull(statement.incomeTax)})`} />
        <Row
          label="Utilidad neta"
          value={formatMoneyFull(statement.netIncome)}
          strong
          tone="text-success"
        />
      </div>
    </div>
  )
}
