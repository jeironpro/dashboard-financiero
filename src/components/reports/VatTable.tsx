import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatMonthKey, formatMoneyFull } from '@/lib/format'
import type { VatMonth } from '@/types/finance'

interface VatTableProps {
  months: VatMonth[]
}

export function VatTable({ months }: VatTableProps) {
  const totals = months.reduce(
    (acc, m) => ({
      charged: acc.charged + m.vatCharged,
      creditable: acc.creditable + m.vatCreditable,
      payable: acc.payable + m.vatPayable,
    }),
    { charged: 0, creditable: 0, payable: 0 },
  )

  return (
    <div
      data-reveal
      className="rounded-[var(--radius-xl)] border border-rule bg-card shadow-[var(--shadow-whisper)]"
    >
      <div className="p-4 sm:p-5">
        <p className="font-display text-base font-semibold tracking-tight text-ink">
          IVA mensual · 16 %
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Trasladado sobre facturado, acreditable sobre gastos, a pagar = diferencia.
        </p>
      </div>

      <Table>
        <TableCaption className="px-4 text-left text-xs text-faint">
          Declaración mensual de IVA del ejercicio.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Mes</TableHead>
            <TableHead className="text-right">IVA trasladado</TableHead>
            <TableHead className="text-right">IVA acreditable</TableHead>
            <TableHead className="text-right">IVA a pagar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {months.map((m) => (
            <TableRow key={m.month}>
              <TableCell className="font-medium text-ink">{formatMonthKey(m.month)}</TableCell>
              <TableCell className="num text-right text-muted-foreground">
                {formatMoneyFull(m.vatCharged)}
              </TableCell>
              <TableCell className="num text-right text-muted-foreground">
                {formatMoneyFull(m.vatCreditable)}
              </TableCell>
              <TableCell className="num text-right font-semibold text-warning">
                {formatMoneyFull(m.vatPayable)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          <TableRow className="border-t-2 border-rule-strong">
            <TableCell className="font-semibold text-ink">Total ejercicio</TableCell>
            <TableCell className="num text-right font-semibold text-ink">
              {formatMoneyFull(totals.charged)}
            </TableCell>
            <TableCell className="num text-right font-semibold text-ink">
              {formatMoneyFull(totals.creditable)}
            </TableCell>
            <TableCell className="num text-right font-bold text-warning">
              {formatMoneyFull(totals.payable)}
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  )
}
