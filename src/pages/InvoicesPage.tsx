import { InvoicesTable } from '@/components/invoices/InvoicesTable'
import { SectionHeading } from '@/components/dashboard/SectionHeading'
import { StatCard } from '@/components/dashboard/StatCard'
import { useReveal } from '@/hooks/useReveal'
import { formatMoney, formatMonthKey, formatNumber } from '@/lib/format'
import type { FinanceData } from '@/types/finance'

export function InvoicesPage({ data }: { data: FinanceData }) {
  const rootRef = useReveal<HTMLDivElement>()
  const { summary, paymentSummary, monthlyRevenue } = data
  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1].month

  const stats = [
    {
      label: 'Facturado en el mes',
      value: formatMoney(summary.monthInvoiced),
      tone: 'text-ink',
    },
    {
      label: 'Cobrado',
      value: formatMoney(paymentSummary.paid.amount),
      tone: 'text-success',
    },
    {
      label: 'Pendiente de cobro',
      value: formatMoney(paymentSummary.pending.amount),
      tone: 'text-warning',
    },
    {
      label: 'Fallido',
      value: formatMoney(paymentSummary.failed.amount),
      tone: 'text-danger',
    },
  ]

  return (
    <div ref={rootRef}>
      <SectionHeading
        eyebrow="02 · FACTURACIÓN"
        title="Lo que emitiste este mes"
        lead={`${formatNumber(summary.monthInvoicedCount)} facturas por ${formatMoney(summary.monthInvoiced)} en ${formatMonthKey(currentMonth)}.`}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} tone={stat.tone} />
        ))}
      </div>

      <div className="mt-4">
        <InvoicesTable invoices={data.invoices} />
      </div>
    </div>
  )
}
