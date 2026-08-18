import { PlanCards } from '@/components/subscriptions/PlanCards'
import { SubscriptionsTable } from '@/components/subscriptions/SubscriptionsTable'
import { SectionHeading } from '@/components/dashboard/SectionHeading'
import { useReveal } from '@/hooks/useReveal'
import { formatMoney, formatNumber } from '@/lib/format'
import type { FinanzasData } from '@/types/finanzas'

export function SuscripcionesPage({ data }: { data: FinanzasData }) {
  const rootRef = useReveal<HTMLDivElement>()
  const { summary } = data

  return (
    <div ref={rootRef}>
      <SectionHeading
        eyebrow="03 · SUSCRIPCIONES"
        title="Ingreso recurrente por plan"
        lead={`MRR de ${formatMoney(summary.mrr)} con ${formatNumber(summary.activeSubscriptions)} suscripciones activas, ${formatNumber(summary.overdueSubscriptions)} atrasadas y ${formatNumber(summary.trialSubscriptions)} en prueba.`}
      />

      <PlanCards data={data} />

      <div className="mt-5">
        <SubscriptionsTable subscriptions={data.subscriptions} />
      </div>
    </div>
  )
}
