import { InvoicesTable } from '@/components/invoices/InvoicesTable'
import { SectionHeading } from '@/components/dashboard/SectionHeading'
import { useReveal } from '@/hooks/useReveal'
import { formatMoney, formatMonthKey, formatNumber } from '@/lib/format'
import type { FinanzasData } from '@/types/finanzas'

export function FacturacionPage({ data }: { data: FinanzasData }) {
  const rootRef = useReveal<HTMLDivElement>()
  const { summary, paymentSummary, monthlyRevenue } = data
  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1].month

  const stats = [
    {
      label: 'Facturado en el mes',
      value: formatMoney(summary.monthInvoiced),
      tone: 'text-ink',
      chip: 'bg-pear-soft',
    },
    {
      label: 'Cobrado',
      value: formatMoney(paymentSummary.paid.amount),
      tone: 'text-success',
      chip: 'bg-mint-soft',
    },
    {
      label: 'Pendiente de cobro',
      value: formatMoney(paymentSummary.pending.amount),
      tone: 'text-warning',
      chip: 'bg-pear-soft',
    },
    {
      label: 'Fallido',
      value: formatMoney(paymentSummary.failed.amount),
      tone: 'text-danger',
      chip: 'bg-coral-soft',
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
          <div
            key={stat.label}
            data-reveal
            className="rounded-[var(--radius-xl)] border border-rule bg-card p-4 shadow-[var(--shadow-whisper)]"
          >
            <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
            <p className={`num mt-2 text-xl font-semibold leading-none tracking-tight sm:text-2xl ${stat.tone}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <InvoicesTable invoices={data.invoices} />
      </div>
    </div>
  )
}
