import { PLAN_META } from '@/lib/status'
import { formatMoney } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { FinanceData, PlanId } from '@/types/finance'

interface SubscriptionsSummaryProps {
  data: FinanceData
}

/** MRR por plan con barra de participación (multi-acento: un tinte por plan). */
export function SubscriptionsSummary({ data }: SubscriptionsSummaryProps) {
  const { plans, subscriptions, summary } = data
  const mrr = summary.mrr

  const byPlan = plans.map((plan) => {
    const subs = subscriptions.filter(
      (sub) => sub.plan === plan.id && (sub.status === 'active' || sub.status === 'overdue'),
    )
    return {
      plan,
      count: subs.length,
      mrr: subs.reduce((acc, sub) => acc + sub.monthlyAmount, 0),
    }
  })

  const barTone: Record<PlanId, string> = {
    starter: 'bg-cyan',
    growth: 'bg-pear',
    scale: 'bg-lavender',
  }

  return (
    <div
      data-reveal
      className="rounded-[var(--radius-xl)] border border-rule bg-card p-4 shadow-[var(--shadow-whisper)] sm:p-5"
    >
      <p className="font-display text-base font-semibold tracking-tight text-ink">MRR por plan</p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Ingreso mensual recurrente {formatMoney(mrr)}
      </p>

      <ul className="mt-4 space-y-4">
        {byPlan.map(({ plan, count, mrr: planMrr }) => {
          const meta = PLAN_META[plan.id]
          const pct = mrr > 0 ? (planMrr / mrr) * 100 : 0
          return (
            <li key={plan.id}>
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className={cn('font-semibold', meta.tint)}>{plan.name}</span>
                <span className="num text-xs text-faint">
                  {count} · {Math.round(pct)} %
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-3">
                  <div
                    className={cn('h-full rounded-full', barTone[plan.id])}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="num w-20 shrink-0 text-right text-xs font-medium text-ink">
                  {formatMoney(planMrr)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
