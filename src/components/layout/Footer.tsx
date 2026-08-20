import { formatMonthKey } from '@/lib/format'
import type { FinanceData } from '@/types/finance'

interface FooterProps {
    data: FinanceData
}

export function Footer({ data }: FooterProps) {
    const currentMonth = formatMonthKey(data.monthlyRevenue[data.monthlyRevenue.length - 1].month)

    return (
        <footer className="app-chrome mt-14 border-t border-rule px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display font-medium text-foreground">
                    Suma · Cierre fiscal {currentMonth}
                </p>
                <p className="text-xs text-faint">
                    Datos de demostración (MOCK) · {data.company.currency} ·{' '}
                    {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    )
}
