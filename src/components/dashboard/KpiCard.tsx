import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'
import { formatSignedPercent } from '@/lib/format'
import { cn } from '@/lib/utils'

export type Accent = 'pear' | 'cyan' | 'coral' | 'mint' | 'lavender'

const ACCENT_STYLES: Record<Accent, { chip: string; hover: string }> = {
    pear: { chip: 'bg-pear-soft text-pear-deep', hover: 'hover:bg-pear-soft/80' },
    cyan: { chip: 'bg-cyan-soft text-cyan-deep', hover: 'hover:bg-cyan-soft/80' },
    coral: { chip: 'bg-coral-soft text-coral-deep', hover: 'hover:bg-coral-soft/80' },
    mint: { chip: 'bg-mint-soft text-mint-deep', hover: 'hover:bg-mint-soft/80' },
    lavender: { chip: 'bg-lavender-soft text-lavender-deep', hover: 'hover:bg-lavender-soft/80' },
}

interface KpiCardProps {
    label: string
    value: number
    /** Formatea el valor animado (p. ej. moneda, número o porcentaje). */
    format: (value: number) => string
    icon: LucideIcon
    accent: Accent
    sublabel?: string
    /** Variación vs. el período anterior, como fracción (0.12 = +12 %). */
    delta?: number
}

export function KpiCard({
    label,
    value,
    format,
    icon: Icon,
    accent,
    sublabel,
    delta,
}: KpiCardProps) {
    const display = useAnimatedNumber(value, 900)
    const chip = ACCENT_STYLES[accent]

    return (
        <div
            data-reveal
            className={cn(
                'rounded-[var(--radius-xl)] border border-rule bg-card p-4 shadow-[var(--shadow-whisper)] transition-[background-color,box-shadow,transform] duration-[var(--dur-short)] ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:shadow-card sm:p-5',
                chip.hover,
            )}
        >
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <span
                    className={cn(
                        'inline-flex size-8 shrink-0 items-center justify-center rounded-full',
                        chip.chip,
                    )}
                >
                    <Icon className="size-4" aria-hidden="true" />
                </span>
            </div>
            <p className="num mt-3 text-[1.6rem] font-semibold leading-none tracking-tight text-ink sm:text-3xl">
                {format(display)}
            </p>
            <div className="mt-2 flex min-h-4 items-center gap-1.5">
                {delta !== undefined && delta !== 0 && (
                    <span
                        className={cn(
                            'inline-flex items-center gap-0.5 text-xs font-semibold',
                            delta > 0 ? 'text-success' : 'text-danger',
                        )}
                    >
                        {delta > 0 ? (
                            <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        ) : (
                            <ArrowDownRight className="size-3.5" aria-hidden="true" />
                        )}
                        {formatSignedPercent(delta)}
                    </span>
                )}
                {sublabel && <span className="truncate text-xs text-faint">{sublabel}</span>}
            </div>
        </div>
    )
}
