import { Card, CardContent } from '@/components/ui/card'
import type { FinanzasData } from '@/types/finanzas'

export function FacturacionPage({ data }: { data: FinanzasData }) {
  return (
    <Card>
      <CardContent className="p-8">
        <p className="mono-label">02 · FACTURACIÓN</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">Facturación</h2>
        <p className="mt-1 text-muted-foreground">
          Vista en construcción — {data.invoices.length} facturas en el MOCK.
        </p>
      </CardContent>
    </Card>
  )
}
