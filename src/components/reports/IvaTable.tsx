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
import type { IvaMonth } from '@/types/finanzas'

interface IvaTableProps {
  months: IvaMonth[]
}

export function IvaTable({ months }: IvaTableProps) {
  const totals = months.reduce(
    (acc, m) => ({
      trasladado: acc.trasladado + m.ivaTrasladado,
      acreditable: acc.acreditable + m.ivaAcreditable,
      porPagar: acc.porPagar + m.ivaPorPagar,
    }),
    { trasladado: 0, acreditable: 0, porPagar: 0 },
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
                {formatMoneyFull(m.ivaTrasladado)}
              </TableCell>
              <TableCell className="num text-right text-muted-foreground">
                {formatMoneyFull(m.ivaAcreditable)}
              </TableCell>
              <TableCell className="num text-right font-semibold text-warning">
                {formatMoneyFull(m.ivaPorPagar)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tfoot>
          <TableRow className="border-t-2 border-rule-strong">
            <TableCell className="font-semibold text-ink">Total ejercicio</TableCell>
            <TableCell className="num text-right font-semibold text-ink">
              {formatMoneyFull(totals.trasladado)}
            </TableCell>
            <TableCell className="num text-right font-semibold text-ink">
              {formatMoneyFull(totals.acreditable)}
            </TableCell>
            <TableCell className="num text-right font-bold text-warning">
              {formatMoneyFull(totals.porPagar)}
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  )
}
