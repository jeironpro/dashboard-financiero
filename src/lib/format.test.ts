import { describe, expect, it } from 'vitest'
import {
    formatDate,
    formatMoney,
    formatMoneyFull,
    formatMonthKey,
    formatNumber,
    formatPercent,
    timeAgo,
} from '@/lib/format'

describe('formatMoney', () => {
    it('formatea MXN sin decimales y con agrupación', () => {
        expect(formatMoney(311794)).toBe('$311,794')
        expect(formatMoney(0)).toBe('$0')
    })
})

describe('formatMoneyFull', () => {
    it('formatea MXN con dos decimales (reportes)', () => {
        expect(formatMoneyFull(311794)).toBe('$311,794.00')
    })
})

describe('formatNumber', () => {
    it('agrupa con separadores de miles', () => {
        expect(formatNumber(3401975)).toBe('3,401,975')
    })
})

describe('formatPercent', () => {
    it('formatea fracciones a porcentaje es-MX', () => {
        expect(formatPercent(14 / 15)).toBe('93.3%')
    })
})

describe('formatDate / formatMonthKey', () => {
    it('formatea fechas y claves de mes', () => {
        expect(formatDate('2026-08-18T10:00:00Z')).toBe('18 ago 2026')
        expect(formatMonthKey('2026-08')).toBe('Ago 2026')
    })
})

describe('timeAgo', () => {
    const now = Date.parse('2026-08-18T12:00:00Z')
    it('expresa antigüedad en español', () => {
        expect(timeAgo(now - 3000, now)).toBe('ahora')
        expect(timeAgo(now - 30_000, now)).toBe('hace 30 s')
        expect(timeAgo(now - 3_600_000, now)).toBe('hace 1 h')
        expect(timeAgo(now - 90_000_000, now)).toBe('hace 1 d')
    })
})
