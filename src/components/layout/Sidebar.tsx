import { TallyMark } from '@/components/brand/TallyMark'
import { Avatar } from '@/components/profile/Avatar'
import { NAV_SECTIONS, type View } from './nav'
import { cn } from '@/lib/utils'
import type { FinanzasData } from '@/types/finanzas'

interface SidebarContentProps {
  active: View
  data: FinanzasData
  onNavigate: (view: View) => void
  onNavigateMobile?: () => void
}

/** Contenido compartido entre la barra lateral fija (escritorio) y el Sheet (móvil). */
export function SidebarContent({ active, data, onNavigate, onNavigateMobile }: SidebarContentProps) {
  const { company, currentUser } = data

  return (
    <div className="flex h-full flex-col">
      <a
        href="#inicio"
        onClick={(event) => {
          event.preventDefault()
          onNavigate('resumen')
          onNavigateMobile?.()
        }}
        aria-label={`${company.name} — ir al resumen`}
        className="flex items-center gap-2.5 px-4 pb-5 pt-5"
      >
        <TallyMark className="size-8 shrink-0" />
        <span className="leading-tight">
          <span className="block font-display text-base font-semibold tracking-tight text-ink">
            Tally
          </span>
          <span className="block text-xs text-muted-foreground">finanzas al día</span>
        </span>
      </a>

      <nav className="flex-1 space-y-1 px-3" aria-label="Secciones del dashboard">
        {NAV_SECTIONS.map((section) => {
          const Icon = section.icon
          const isActive = active === section.id
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                onNavigate(section.id)
                onNavigateMobile?.()
              }}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-[var(--dur-short)] ease-[var(--ease-out)]',
                isActive
                  ? 'bg-pear-soft text-ink'
                  : 'text-ink-2 hover:bg-paper-2 hover:text-ink',
              )}
            >
              <Icon
                aria-hidden="true"
                className={cn(
                  'size-[18px] shrink-0 transition-colors',
                  isActive ? 'text-pear-deep' : 'text-ink-3 group-hover:text-ink-2',
                )}
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{section.label}</span>
                <span
                  className={cn(
                    'block truncate text-xs',
                    isActive ? 'text-ink-2' : 'text-ink-3',
                  )}
                >
                  {section.description}
                </span>
              </span>
            </a>
          )
        })}
      </nav>

      <div className="m-3 mt-4 flex items-center gap-2.5 rounded-xl border border-rule bg-card p-3">
        <Avatar name={currentUser.name} className="size-8 text-xs" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{currentUser.name}</p>
          <p className="truncate text-xs text-muted-foreground">{currentUser.role}</p>
        </div>
      </div>
    </div>
  )
}

/** Rail flotante (escritorio): tarjeta redondeada con sombra, despegada de los bordes. */
export function Sidebar(props: SidebarContentProps) {
  return (
    <aside
      aria-label="Navegación principal"
      className="app-chrome fixed inset-y-4 left-4 z-[var(--z-sticky)] hidden w-[var(--sidebar-width)] rounded-[var(--radius-xl)] border border-rule bg-card shadow-card lg:block"
    >
      <SidebarContent {...props} />
    </aside>
  )
}
