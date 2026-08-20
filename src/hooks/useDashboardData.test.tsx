import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useDashboardData } from '@/hooks/useDashboardData'

describe('useDashboardData', () => {
    it('carga el MOCK con los KPIs derivados', () => {
        const { result } = renderHook(() => useDashboardData())
        expect(result.current.data.summary.mrr).toBe(372753)
        expect(result.current.data.summary.monthInvoiced).toBe(407775)
        expect(result.current.data.plans).toHaveLength(3)
    })

    it('refresca los datos', () => {
        const { result } = renderHook(() => useDashboardData())
        const before = result.current.data.updatedAt
        act(() => {
            result.current.refresh()
        })
        expect(result.current.data.updatedAt).toBeGreaterThanOrEqual(before)
    })
})
