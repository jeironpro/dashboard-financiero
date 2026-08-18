import { useCallback, useState } from 'react'
import { loadMockData } from '@/data'
import type { FinanceData } from '@/types/finance'

/** Carga el MOCK (fechas re-ancladas al mes actual) y permite refrescarlo. */
export function useDashboardData(): { data: FinanceData; refresh: () => void } {
  const [data, setData] = useState<FinanceData>(() => loadMockData())

  const refresh = useCallback(() => {
    setData(loadMockData())
  }, [])

  return { data, refresh }
}
