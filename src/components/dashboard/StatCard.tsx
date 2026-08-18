import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  /** Clase de color del valor (Tailwind), p. ej. `text-success`. */
  tone?: string
  /** Línea secundaria opcional bajo el valor. */
  detail?: string
}

/** Tarjeta compacta de métrica: etiqueta + valor (mono) + detalle opcional. */
export function StatCard({ label, value, tone = 'text-ink', detail }: StatCardProps) {
  return (
    <div
      data-reveal
      className="rounded-[var(--radius-xl)] border border-rule bg-card p-4 shadow-[var(--shadow-whisper)]"
    >
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className={cn('num mt-2 text-xl font-semibold leading-none tracking-tight sm:text-2xl', tone)}>
        {value}
      </p>
      {detail && <p className="mt-1 text-xs text-faint">{detail}</p>}
    </div>
  )
}
