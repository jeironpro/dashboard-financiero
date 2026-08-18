import { useCallback, useState } from 'react'
import { loadMockData } from '@/data'
import type { FinanzasData } from '@/types/finanzas'

/** Carga el MOCK (fechas re-ancladas al mes actual) y permite refrescarlo. */
export function useDashboardData(): { data: FinanzasData; refresh: () => void } {
  const [data, setData] = useState<FinanzasData>(() => loadMockData())

  const refresh = useCallback(() => {
    setData(loadMockData())
  }, [])

  return { data, refresh }
}
