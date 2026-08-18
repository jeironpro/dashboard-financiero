import { useMemo } from 'react'
import { StatusBadge } from '@/components/dashboard/StatusBadge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PLAN_META, SUBSCRIPTION_STATUS } from '@/lib/status'
import { formatDate, formatMoney, formatNumber } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Subscription, SubscriptionStatus } from '@/types/finance'

const STATUS_ORDER: Record<SubscriptionStatus, number> = {
  active: 0,
  overdue: 1,
  trial: 2,
  canceled: 3,
}

interface SubscriptionsTableProps {
  subscriptions: Subscription[]
}

export function SubscriptionsTable({ subscriptions }: SubscriptionsTableProps) {
  const rows = useMemo(
    () =>
      [...subscriptions].sort(
        (a, b) =>
          STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
          b.monthlyAmount - a.monthlyAmount ||
          a.client.localeCompare(b.client, 'es'),
      ),
    [subscriptions],
  )

  return (
    <div
      data-reveal
      className="rounded-[var(--radius-xl)] border border-rule bg-card shadow-[var(--shadow-whisper)]"
    >
      <div className="p-4 sm:p-5">
        <p className="font-display text-base font-semibold tracking-tight text-ink">
          Todas las suscripciones
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {subscriptions.length} cuentas · ordenadas por estado y monto
        </p>
      </div>

      <Table>
        <TableCaption className="px-4 text-left text-xs text-faint">
          Suscripciones del MOCK: cliente, plan, estado, asientos, monto mensual y próxima facturación.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="hidden sm:table-cell">Asientos</TableHead>
            <TableHead className="hidden lg:table-cell">Próxima facturación</TableHead>
            <TableHead className="text-right">Mensual</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((sub) => {
            const meta = SUBSCRIPTION_STATUS[sub.status]
            const plan = PLAN_META[sub.plan]
            return (
              <TableRow key={sub.id}>
                <TableCell className="font-medium text-ink">{sub.client}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2 py-0.5 text-xs font-semibold',
                      plan.chip,
                    )}
                  >
                    {plan.name}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge meta={meta} pulse={sub.status === 'overdue'} />
                </TableCell>
                <TableCell className="num hidden text-muted-foreground sm:table-cell">
                  {formatNumber(sub.seats)}
                </TableCell>
                <TableCell className="hidden whitespace-nowrap text-muted-foreground lg:table-cell">
                  {formatDate(sub.nextBillingAt)}
                </TableCell>
                <TableCell className="num whitespace-nowrap text-right font-semibold text-ink">
                  {formatMoney(sub.monthlyAmount)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
