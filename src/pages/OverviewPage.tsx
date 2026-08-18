import { useEffect } from 'react'
import { Banknote, FileText, Percent, Users, Wallet } from 'lucide-react'
import { KpiCard } from '@/components/dashboard/KpiCard'
import { PaymentDonut } from '@/components/dashboard/PaymentDonut'
import { RecentPayments } from '@/components/dashboard/RecentPayments'
import { RevenueChart } from '@/components/dashboard/RevenueChart'
import { SectionHeading } from '@/components/dashboard/SectionHeading'
import { SubscriptionsSummary } from '@/components/dashboard/SubscriptionsSummary'
import { useReveal } from '@/hooks/useReveal'
import { pulseIndicators } from '@/lib/anime'
import { formatMoney, formatMonthKey, formatNumber, formatPercent } from '@/lib/format'
import type { FinanceData } from '@/types/finance'

export function OverviewPage({ data }: { data: FinanceData }) {
  const { summary, monthlyRevenue, invoices } = data
  const rootRef = useReveal<HTMLDivElement>()
  const last = monthlyRevenue[monthlyRevenue.length - 1]
  const prev = monthlyRevenue[monthlyRevenue.length - 2]

  useEffect(() => {
    if (rootRef.current) pulseIndicators(rootRef.current)
  }, [rootRef])

  const incomeDelta = prev.income > 0 ? (last.income - prev.income) / prev.income : 0
  const prevCount = invoices.filter((inv) => inv.issuedAt.slice(0, 7) === prev.month).length
  const countDelta = prevCount > 0 ? (summary.monthInvoicedCount - prevCount) / prevCount : 0

  return (
    <div ref={rootRef}>
      <SectionHeading
        eyebrow="01 · RESUMEN"
        title="El mes en una mirada"
        lead={`Cobraste ${formatMoney(summary.monthCollected)} de ${formatMoney(summary.monthInvoiced)} facturado en ${formatMonthKey(last.month)} — tasa de cobro de ${formatPercent(summary.collectionRate)}.`}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
        <KpiCard
          label="MRR"
          value={summary.mrr}
          format={formatMoney}
          icon={Wallet}
          accent="pear"
          sublabel={`${summary.activeSubscriptions} suscripciones activas`}
        />
        <KpiCard
          label="Ingresos del mes"
          value={summary.monthInvoiced}
          format={formatMoney}
          icon={Banknote}
          accent="mint"
          sublabel={`${summary.monthInvoicedCount} facturas emitidas`}
          delta={incomeDelta}
        />
        <KpiCard
          label="Facturas del mes"
          value={summary.monthInvoicedCount}
          format={formatNumber}
          icon={FileText}
          accent="cyan"
          sublabel="emitidas"
          delta={countDelta}
        />
        <KpiCard
          label="Suscripciones activas"
          value={summary.activeSubscriptions}
          format={formatNumber}
          icon={Users}
          accent="lavender"
          sublabel={`${summary.trialSubscriptions} en prueba · ${summary.overdueSubscriptions} atrasadas`}
        />
        <KpiCard
          label="Tasa de cobro"
          value={summary.collectionRate * 100}
          format={(n) => formatPercent(n / 100)}
          icon={Percent}
          accent="coral"
          sublabel="cobradas / intentos del mes"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <RevenueChart data={monthlyRevenue} className="lg:col-span-2" />
        <PaymentDonut summary={data.paymentSummary} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <SubscriptionsSummary data={data} />
        <div className="lg:col-span-2">
          <RecentPayments data={data} />
        </div>
      </div>
    </div>
  )
}
