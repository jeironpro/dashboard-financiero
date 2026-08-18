import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { HandCoins } from 'lucide-react'
import { PaymentsTable } from '@/components/payments/PaymentsTable'
import { TallyCounter } from '@/components/payments/TallyCounter'
import { SectionHeading } from '@/components/dashboard/SectionHeading'
import { Button } from '@/components/ui/button'
import { useReveal } from '@/hooks/useReveal'
import { burstAt } from '@/lib/anime'
import { formatMoney, formatPercent } from '@/lib/format'
import type { FinanzasData } from '@/types/finanzas'

export function PagosPage({ data }: { data: FinanzasData }) {
  const rootRef = useReveal<HTMLDivElement>()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [strokes, setStrokes] = useState(0)
  const [groups, setGroups] = useState(0)
  const [message, setMessage] = useState('Sin cobros simulados todavía.')
  const [celebrating, setCelebrating] = useState(false)

  const { paymentSummary, summary } = data

  const handleCollect = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    burstAt(button, button.offsetWidth / 2, button.offsetHeight / 2)

    if (strokes < 4) {
      const next = strokes + 1
      setStrokes(next)
      setMessage(`Cobro simulado registrado — trazo ${next} de 5.`)
      return
    }

    // Completa el grupo: diagonal + celebración.
    setStrokes(5)
    const totalGroups = groups + 1
    setGroups(totalGroups)
    setCelebrating(true)
    setMessage(`¡Grupo completado! ${totalGroups * 5} cobros simulados en total.`)
    window.setTimeout(() => {
      setStrokes(0)
      setCelebrating(false)
    }, 1000)
  }

  const stats = [
    {
      label: 'Pendientes',
      value: formatMoney(paymentSummary.pending.amount),
      detail: `${paymentSummary.pending.count} facturas`,
      tone: 'text-warning',
      chip: 'bg-pear-soft',
    },
    {
      label: 'Exitosos',
      value: formatMoney(paymentSummary.paid.amount),
      detail: `${paymentSummary.paid.count} pagos`,
      tone: 'text-success',
      chip: 'bg-mint-soft',
    },
    {
      label: 'Fallidos',
      value: formatMoney(paymentSummary.failed.amount),
      detail: `${paymentSummary.failed.count} intentos`,
      tone: 'text-danger',
      chip: 'bg-coral-soft',
    },
    {
      label: 'Tasa de cobro',
      value: formatPercent(summary.collectionRate),
      detail: 'cobradas / intentos del mes',
      tone: 'text-ink',
      chip: 'bg-cyan-soft',
    },
  ]

  return (
    <div ref={rootRef}>
      <SectionHeading
        eyebrow="04 · PAGOS"
        title="Qué se cobró y qué falta"
        lead={`${paymentSummary.pending.count} facturas por ${formatMoney(paymentSummary.pending.amount)} esperan cobro este mes.`}
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
            <p className="mt-1 text-xs text-faint">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div
        data-reveal
        className="mt-4 flex flex-col gap-5 rounded-[var(--radius-xl)] border border-pear-deep/30 bg-pear-soft/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
      >
        <div className="flex items-center gap-4">
          <TallyCounter strokes={strokes} />
          <div>
            <p className="font-display text-base font-semibold tracking-tight text-ink">
              Cobrar facturas pendientes
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Simula el cobro de {paymentSummary.pending.count} facturas por{' '}
              {formatMoney(paymentSummary.pending.amount)}. Cada clic dibuja un trazo.
            </p>
            <p className="mt-1 text-xs font-medium text-pear-deep" aria-live="polite">
              {message} {groups > 0 && `· ${groups * 5} cobros simulados`}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="num text-sm font-semibold text-ink">{strokes}/5</span>
          <Button
            ref={buttonRef}
            size="lg"
            onClick={handleCollect}
            className={celebrating ? 'bg-pear-deep' : ''}
          >
            <HandCoins className="size-4" aria-hidden="true" />
            Cobrar pendiente
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <PaymentsTable payments={data.payments} />
      </div>
    </div>
  )
}
