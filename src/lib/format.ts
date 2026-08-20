// Formateadores de valores para el dashboard financiero (es-MX, MXN).

const CURRENCY = 'MXN'

/** Moneda sin decimales: adecuada para KPIs y tablas de resumen. */
export function formatMoney(value: number): string {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: CURRENCY,
        maximumFractionDigits: 0,
    }).format(value)
}

/** Moneda con 2 decimales: reportes fiscales/contables. */
export function formatMoneyFull(value: number): string {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: CURRENCY,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat('es-MX', { useGrouping: true, maximumFractionDigits: 0 }).format(
        value,
    )
}

export function formatPercent(value: number, fractionDigits = 1): string {
    return new Intl.NumberFormat('es-MX', {
        style: 'percent',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    }).format(value)
}

/** Porcentaje con signo explícito («+7.5%», «-2.1%»): variaciones en KPIs. */
export function formatSignedPercent(value: number, fractionDigits = 1): string {
    return new Intl.NumberFormat('es-MX', {
        style: 'percent',
        signDisplay: 'always',
        maximumFractionDigits: fractionDigits,
    }).format(value)
}

/** Fecha corta: «18 ago 2026». */
export function formatDate(iso: string): string {
    return new Intl.DateTimeFormat('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(Date.parse(iso))
}

export function formatDateTime(iso: string): string {
    return new Intl.DateTimeFormat('es-MX', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    }).format(Date.parse(iso))
}

/** Clave de mes «2026-08» → «Ago 2026». */
export function formatMonthKey(monthKey: string): string {
    const [year, month] = monthKey.split('-').map(Number)
    const label = new Intl.DateTimeFormat('es-MX', { month: 'short' }).format(
        new Date(year, month - 1, 1),
    )
    return `${label.charAt(0).toUpperCase()}${label.slice(1)} ${year}`
}

/** Intervalo legible entre dos claves de mes, p. ej. «Ene 2026 – Ago 2026». */
export function formatMonthRange(fromKey: string, toKey: string): string {
    return `${formatMonthKey(fromKey)} – ${formatMonthKey(toKey)}`
}

export function timeAgo(epoch: number, now: number): string {
    const diff = Math.max(0, now - epoch)
    const s = Math.floor(diff / 1000)
    if (s < 5) return 'ahora'
    if (s < 60) return `hace ${s} s`
    const m = Math.floor(s / 60)
    if (m < 60) return `hace ${m} min`
    const h = Math.floor(m / 60)
    if (h < 24) return `hace ${h} h`
    const d = Math.floor(h / 24)
    return `hace ${d} d`
}
