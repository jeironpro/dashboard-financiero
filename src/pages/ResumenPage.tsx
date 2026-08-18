import { Card, CardContent } from '@/components/ui/card'
import type { FinanzasData } from '@/types/finanzas'

export function ResumenPage({ data }: { data: FinanzasData }) {
  return (
    <Card>
      <CardContent className="p-8">
        <p className="mono-label">01 · RESUMEN</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          Resumen financiero
        </h2>
        <p className="mt-1 text-muted-foreground">
          Vista en construcción — MRR de {data.summary.mrr.toLocaleString('es-MX')} MXN.
        </p>
      </CardContent>
    </Card>
  )
}
