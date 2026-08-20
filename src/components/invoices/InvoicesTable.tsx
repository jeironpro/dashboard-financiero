import { useMemo, useState } from 'react'
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { INVOICE_STATUS, PAYMENT_METHOD_LABEL } from '@/lib/status'
import { formatDate, formatMoney } from '@/lib/format'
import type { Invoice, InvoiceStatus } from '@/types/finance'

interface InvoicesTableProps {
    invoices: Invoice[]
}

type Filter = 'all' | InvoiceStatus

const FILTERS: Array<{ id: Filter; label: string }> = [
    { id: 'all', label: 'Todas' },
    { id: 'pending', label: 'Pendientes' },
    { id: 'paid', label: 'Exitosas' },
    { id: 'failed', label: 'Fallidas' },
]

export function InvoicesTable({ invoices }: InvoicesTableProps) {
    const [filter, setFilter] = useState<Filter>('all')

    const rows = useMemo(() => {
        const sorted = [...invoices].sort((a, b) => Date.parse(b.issuedAt) - Date.parse(a.issuedAt))
        return filter === 'all' ? sorted : sorted.filter((inv) => inv.status === filter)
    }, [invoices, filter])

    const countFor = (id: Filter) =>
        id === 'all' ? invoices.length : invoices.filter((inv) => inv.status === id).length

    return (
        <div
            data-reveal
            className="rounded-[var(--radius-xl)] border border-rule bg-card shadow-[var(--shadow-whisper)]"
        >
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
                <div>
                    <p className="font-display text-base font-semibold tracking-tight text-ink">
                        Facturas emitidas
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {invoices.length} facturas en el MOCK · ordenadas por fecha
                    </p>
                </div>
                <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
                    <TabsList className="flex-wrap">
                        {FILTERS.map((item) => (
                            <TabsTrigger key={item.id} value={item.id}>
                                {item.label}
                                <span className="num text-xs text-faint">{countFor(item.id)}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            <Table>
                <TableCaption className="px-4 text-left text-xs text-faint">
                    Facturación del MOCK: folio, cliente, concepto, fecha, estado y monto.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Folio</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Concepto</TableHead>
                        <TableHead className="hidden md:table-cell">Emitida</TableHead>
                        <TableHead className="hidden lg:table-cell">Vence</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((inv) => {
                        const meta = INVOICE_STATUS[inv.status]
                        return (
                            <TableRow key={inv.id}>
                                <TableCell className="num text-xs font-medium text-faint">
                                    {inv.folio}
                                </TableCell>
                                <TableCell className="font-medium text-ink">{inv.client}</TableCell>
                                <TableCell className="max-w-56 truncate text-muted-foreground">
                                    {inv.concept}
                                    {inv.paymentMethod && (
                                        <span className="block text-xs text-faint">
                                            {PAYMENT_METHOD_LABEL[inv.paymentMethod]}
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="hidden whitespace-nowrap text-muted-foreground md:table-cell">
                                    {formatDate(inv.issuedAt)}
                                </TableCell>
                                <TableCell className="hidden whitespace-nowrap text-muted-foreground lg:table-cell">
                                    {formatDate(inv.dueAt)}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge meta={meta} pulse={inv.status === 'failed'} />
                                </TableCell>
                                <TableCell className="num whitespace-nowrap text-right font-semibold text-ink">
                                    {formatMoney(inv.amount)}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            {rows.length === 0 && (
                <p className="px-5 pb-6 pt-2 text-sm text-muted-foreground">
                    No hay facturas con este estado.
                </p>
            )}
        </div>
    )
}
