import { StatusBadge } from '@/components/dashboard/StatusBadge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PAYMENT_METHOD_LABEL, PAYMENT_STATUS } from '@/lib/status'
import { formatDateTime, formatMoney } from '@/lib/format'
import type { Payment } from '@/types/finanzas'

interface PaymentsTableProps {
  payments: Payment[]
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const rows = [...payments].sort((a, b) => Date.parse(b.paidAt) - Date.parse(a.paidAt))

  return (
    <div
      data-reveal
      className="rounded-[var(--radius-xl)] border border-rule bg-card shadow-[var(--shadow-whisper)]"
    >
      <div className="p-4 sm:p-5">
        <p className="font-display text-base font-semibold tracking-tight text-ink">
          Movimientos de pago
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Intentos de cobro del mes en curso · ordenados por fecha
        </p>
      </div>

      <Table>
        <TableCaption className="px-4 text-left text-xs text-faint">
          Pagos del MOCK: cliente, método, estado, monto y fecha.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="hidden sm:table-cell">Fecha</TableHead>
            <TableHead className="text-right">Monto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((payment) => {
            const meta = PAYMENT_STATUS[payment.status]
            return (
              <TableRow key={payment.id}>
                <TableCell className="font-medium text-ink">{payment.client}</TableCell>
                <TableCell className="text-muted-foreground">
                  {PAYMENT_METHOD_LABEL[payment.method]}
                </TableCell>
                <TableCell>
                  <StatusBadge meta={meta} pulse={payment.status === 'failed'} />
                </TableCell>
                <TableCell className="hidden whitespace-nowrap text-muted-foreground sm:table-cell">
                  {formatDateTime(payment.paidAt)}
                </TableCell>
                <TableCell className="num whitespace-nowrap text-right font-semibold text-ink">
                  {formatMoney(payment.amount)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
