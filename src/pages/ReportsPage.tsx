import { Printer } from 'lucide-react'
import { BalanceSheetCard } from '@/components/reports/BalanceSheetCard'
import { IncomeStatementCard } from '@/components/reports/IncomeStatementCard'
import { VatTable } from '@/components/reports/VatTable'
import { SectionHeading } from '@/components/dashboard/SectionHeading'
import { Button } from '@/components/ui/button'
import { useReveal } from '@/hooks/useReveal'
import { formatMonthKey, formatMonthRange } from '@/lib/format'
import type { FinanceData } from '@/types/finance'

export function ReportsPage({ data }: { data: FinanceData }) {
  const rootRef = useReveal<HTMLDivElement>()
  const { company, vatMonthly, incomeStatement, balanceSheet, monthlyRevenue } = data

  const fiscalYear = String(company.fiscalYear)
  const vatMonths = vatMonthly.filter((m) => m.month.startsWith(fiscalYear))
  const lastMonth = monthlyRevenue[monthlyRevenue.length - 1].month
  const firstFiscal = `${fiscalYear}-01`
  const range =
    firstFiscal <= lastMonth ? formatMonthRange(firstFiscal, lastMonth) : formatMonthKey(lastMonth)

  return (
    <div ref={rootRef}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="05 · REPORTES"
          title="Reportes fiscales y contables"
          lead={`${company.name} · RFC ${company.taxId} · Ejercicio ${fiscalYear} (${range}).`}
        />
        <Button
          data-reveal
          variant="outline"
          className="no-print mb-6"
          onClick={() => window.print()}
        >
          <Printer className="size-4" aria-hidden="true" />
          Exportar / imprimir
        </Button>
      </div>

      <VatTable months={vatMonths} />

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <IncomeStatementCard statement={incomeStatement} />
        <BalanceSheetCard balance={balanceSheet} />
      </div>
    </div>
  )
}
