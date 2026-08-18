import { Card, CardContent } from '@/components/ui/card'
import type { FinanzasData } from '@/types/finanzas'

export function PagosPage({ data }: { data: FinanzasData }) {
  return (
    <Card>
      <CardContent className="p-8">
        <p className="mono-label">04 · PAGOS</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">Estado de pagos</h2>
        <p className="mt-1 text-muted-foreground">
          Vista en construcción — {data.payments.length} pagos en el MOCK.
        </p>
      </CardContent>
    </Card>
  )
}
