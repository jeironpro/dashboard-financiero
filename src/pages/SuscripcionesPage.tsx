import { Card, CardContent } from '@/components/ui/card'
import type { FinanzasData } from '@/types/finanzas'

export function SuscripcionesPage({ data }: { data: FinanzasData }) {
  return (
    <Card>
      <CardContent className="p-8">
        <p className="mono-label">03 · SUSCRIPCIONES</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">Suscripciones</h2>
        <p className="mt-1 text-muted-foreground">
          Vista en construcción — {data.subscriptions.length} suscripciones en el MOCK.
        </p>
      </CardContent>
    </Card>
  )
}
