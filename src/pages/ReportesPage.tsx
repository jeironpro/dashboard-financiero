import { Card, CardContent } from '@/components/ui/card'
import type { FinanzasData } from '@/types/finanzas'

export function ReportesPage({ data }: { data: FinanzasData }) {
  return (
    <Card>
      <CardContent className="p-8">
        <p className="mono-label">05 · REPORTES</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          Reportes fiscales y contables
        </h2>
        <p className="mt-1 text-muted-foreground">
          Vista en construcción — ejercicio {data.company.fiscalYear}.
        </p>
      </CardContent>
    </Card>
  )
}
