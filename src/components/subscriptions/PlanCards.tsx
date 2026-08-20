import { Check } from 'lucide-react'
import { PLAN_META } from '@/lib/status'
import { formatMoney } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { FinanceData, PlanId } from '@/types/finance'

interface PlanCardsProps {
    data: FinanceData
}

const CARD_ACCENT: Record<PlanId, string> = {
    starter: 'hover:bg-cyan-soft/70',
    growth: 'hover:bg-pear-soft/70',
    scale: 'hover:bg-lavender-soft/70',
}

export function PlanCards({ data }: PlanCardsProps) {
    const { plans, subscriptions, summary } = data

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => {
                const subs = subscriptions.filter(
                    (sub) =>
                        sub.plan === plan.id &&
                        (sub.status === 'active' || sub.status === 'overdue'),
                )
                const planMrr = subs.reduce((acc, sub) => acc + sub.monthlyAmount, 0)
                const pct = summary.mrr > 0 ? Math.round((planMrr / summary.mrr) * 100) : 0
                const meta = PLAN_META[plan.id]

                return (
                    <div
                        key={plan.id}
                        data-reveal
                        className={cn(
                            'flex flex-col rounded-[var(--radius-xl)] border border-rule bg-card p-5 shadow-[var(--shadow-whisper)] transition-[background-color,box-shadow,transform] duration-[var(--dur-short)] ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:shadow-card',
                            CARD_ACCENT[plan.id],
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <h3
                                className={cn(
                                    'font-display text-lg font-semibold tracking-tight',
                                    meta.tint,
                                )}
                            >
                                {plan.name}
                            </h3>
                            <span className="num text-xs text-faint">{pct} % del MRR</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{plan.tagline}</p>
                        <p className="num mt-3 text-2xl font-semibold text-ink">
                            {formatMoney(plan.monthlyAmount)}
                            <span className="text-sm font-normal text-faint"> /mes</span>
                        </p>

                        <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2">
                                    <Check
                                        className="mt-0.5 size-3.5 shrink-0 text-success"
                                        aria-hidden="true"
                                    />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 border-t border-rule pt-3 text-xs text-faint">
                            <span className="num font-semibold text-ink">{subs.length}</span>{' '}
                            suscripciones ·{' '}
                            <span className="num font-semibold text-ink">
                                {formatMoney(planMrr)}
                            </span>{' '}
                            MRR
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
