import { Landmark } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import { PAYMENT_METHOD_LABEL, PAYMENT_STATUS } from '@/lib/status'
import { formatMoney, timeAgo } from '@/lib/format'
import type { FinanceData } from '@/types/finance'

interface RecentPaymentsProps {
    data: FinanceData
}

export function RecentPayments({ data }: RecentPaymentsProps) {
    const now = data.updatedAt
    const payments = data.payments.slice(0, 6)

    return (
        <div
            data-reveal
            className="rounded-[var(--radius-xl)] border border-rule bg-card p-4 shadow-[var(--shadow-whisper)] sm:p-5"
        >
            <div className="flex items-center justify-between gap-2">
                <p className="font-display text-base font-semibold tracking-tight text-ink">
                    Pagos recientes
                </p>
                <span className="text-xs text-faint">últimos movimientos</span>
            </div>

            <ul className="mt-3 divide-y divide-rule">
                {payments.map((payment) => {
                    const meta = PAYMENT_STATUS[payment.status]
                    return (
                        <li key={payment.id} className="flex items-center gap-3 py-2.5">
                            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-cyan-soft text-cyan-deep">
                                <Landmark className="size-4" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium text-ink">
                                    {payment.client}
                                </span>
                                <span className="block truncate text-xs text-faint">
                                    {PAYMENT_METHOD_LABEL[payment.method]} ·{' '}
                                    {timeAgo(Date.parse(payment.paidAt), now)}
                                </span>
                            </span>
                            <span className="num hidden text-sm font-semibold text-ink sm:block">
                                {formatMoney(payment.amount)}
                            </span>
                            <StatusBadge
                                meta={meta}
                                className="shrink-0"
                                pulse={payment.status === 'failed'}
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
