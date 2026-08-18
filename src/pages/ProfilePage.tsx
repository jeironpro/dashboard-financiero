import {
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarClock,
  Globe,
  Landmark,
  Mail,
  MapPin,
} from 'lucide-react'
import { SectionHeading } from '@/components/dashboard/SectionHeading'
import { Avatar } from '@/components/profile/Avatar'
import { useReveal } from '@/hooks/useReveal'
import { formatDateTime } from '@/lib/format'
import type { FinanzasData } from '@/types/finanzas'

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-pear-soft text-pear-deep">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-faint">{label}</p>
        <p className="truncate text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  )
}

export function ProfilePage({ data }: { data: FinanzasData }) {
  const rootRef = useReveal<HTMLDivElement>()
  const { currentUser, company } = data

  return (
    <div ref={rootRef}>
      <SectionHeading
        eyebrow="PERFIL"
        title="Tu cuenta"
        lead={`Gestiona tu información personal y los datos de ${company.name}.`}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div
          data-reveal
          className="rounded-[var(--radius-xl)] border border-rule bg-card p-5 shadow-[var(--shadow-whisper)]"
        >
          <div className="flex items-center gap-3 border-b border-rule pb-4">
            <Avatar name={currentUser.name} className="size-14 text-lg" />
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight text-ink">
                {currentUser.name}
                <BadgeCheck className="size-4 text-cyan" aria-hidden="true" />
              </p>
              <p className="truncate text-sm text-muted-foreground">{currentUser.role}</p>
            </div>
          </div>

          <div className="mt-2">
            <DetailRow icon={Mail} label="Correo" value={currentUser.email} />
            <DetailRow icon={Briefcase} label="Departamento" value={currentUser.department} />
            <DetailRow icon={MapPin} label="Ubicación" value={currentUser.location} />
            <DetailRow
              icon={CalendarClock}
              label="Última sesión"
              value={formatDateTime(currentUser.lastLogin)}
            />
          </div>
        </div>

        <div
          data-reveal
          className="rounded-[var(--radius-xl)] border border-rule bg-card p-5 shadow-[var(--shadow-whisper)]"
        >
          <p className="font-display text-base font-semibold tracking-tight text-ink">Tu empresa</p>
          <div className="mt-2">
            <DetailRow icon={Building2} label="Razón social" value={company.name} />
            <DetailRow icon={Landmark} label="RFC" value={company.taxId} />
            <DetailRow icon={MapPin} label="Dirección" value={`${company.address}, ${company.city}`} />
            <DetailRow icon={Globe} label="Sitio" value={company.website} />
            <DetailRow icon={CalendarClock} label="Ejercicio fiscal" value={String(company.fiscalYear)} />
          </div>
        </div>
      </div>

      <div
        data-reveal
        className="mt-4 rounded-[var(--radius-xl)] border border-rule bg-card p-5 shadow-[var(--shadow-whisper)]"
      >
        <p className="font-display text-base font-semibold tracking-tight text-ink">Preferencias</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Valores por defecto del espacio de trabajo.
        </p>
        <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {[
            { label: 'Idioma', value: 'Español (México)' },
            { label: 'Moneda', value: `${company.currency} (peso mexicano)` },
            { label: 'Huso horario', value: 'América / Ciudad de México' },
            { label: 'Notificaciones', value: 'Resumen diario por correo' },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline justify-between gap-3 border-b border-rule py-2">
              <dt className="text-sm text-muted-foreground">{item.label}</dt>
              <dd className="text-sm font-medium text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
