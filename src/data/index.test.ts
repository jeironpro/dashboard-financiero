import { describe, expect, it } from 'vitest'
import {
  VAT_RATE,
  balanceTotals,
  computeVatMonth,
  loadMockData,
} from '@/data'

// Fecha fija: el MOCK está generado para agosto 2026. Fijar «ahora» hace el test determinista.
const NOW = Date.parse('2026-08-18T12:00:00Z')

describe('loadMockData', () => {
  const data = loadMockData(NOW)

  it('re-ancla el mes en curso y la facturación de agosto es coherente', () => {
    const last = data.monthlyRevenue[data.monthlyRevenue.length - 1]
    expect(last.month).toBe('2026-08')
    // El chart de ingresos del mes en curso = suma exacta de las facturas del mes.
    expect(last.income).toBe(data.summary.monthInvoiced)
    expect(last.income).toBe(407775)
  })

  it('desglosa el estado de pagos del mes desde las facturas', () => {
    expect(data.paymentSummary.paid).toEqual({ count: 14, amount: 311794 })
    expect(data.paymentSummary.pending).toEqual({ count: 6, amount: 93486 })
    expect(data.paymentSummary.failed).toEqual({ count: 1, amount: 2495 })
    expect(data.summary.monthCollected).toBe(311794)
    expect(data.summary.monthInvoicedCount).toBe(21)
  })

  it('calcula la tasa de cobro del mes', () => {
    // 14 pagadas de 15 intentos (1 fallida)
    expect(data.summary.collectionRate).toBeCloseTo(14 / 15, 5)
  })

  it('deriva el MRR de las suscripciones activas + atrasadas', () => {
    expect(data.summary.mrr).toBe(372753)
    expect(data.summary.activeSubscriptions).toBe(21)
    expect(data.summary.overdueSubscriptions).toBe(3)
    expect(data.summary.trialSubscriptions).toBe(2)
    expect(data.summary.canceledSubscriptions).toBe(2)
  })

  it('cuentas por cobrar = suma de facturas pendientes de todos los meses', () => {
    expect(data.summary.accountsReceivable).toBe(96480)
    expect(data.summary.accountsReceivable).toBe(data.balanceSheet.assets.accountsReceivable)
  })

  it('totales YTD del estado de resultados (ejercicio fiscal Ene–Ago)', () => {
    expect(data.summary.ytdIncome).toBe(2578075)
    expect(data.summary.ytdExpenses).toBe(1579300)
    expect(data.incomeStatement.income).toBe(data.summary.ytdIncome)
    expect(data.incomeStatement.expenses).toBe(data.summary.ytdExpenses)
    expect(data.incomeStatement.grossProfit).toBe(998775)
    expect(data.incomeStatement.incomeTax).toBe(299633)
    expect(data.incomeStatement.netIncome).toBe(699142)
    expect(data.incomeStatement.period).toBe('2026-01–2026-08')
  })

  it('el balance general cuadra: activos = pasivos + capital', () => {
    const totals = balanceTotals(data.balanceSheet)
    expect(totals.assets).toBe(2270980)
    expect(totals.liabilities).toBe(303920)
    expect(totals.equity).toBe(1967060)
    expect(totals.assets).toBe(totals.liabilities + totals.equity)
  })

  it('el IVA mensual es 16 % del facturado y del gastado', () => {
    const last = data.vatMonthly[data.vatMonthly.length - 1]
    expect(last.vatCharged).toBe(Math.round(407775 * VAT_RATE))
    expect(last.vatCreditable).toBe(Math.round(221600 * VAT_RATE))
    expect(last.vatPayable).toBe(last.vatCharged - last.vatCreditable)
  })

  it('desplaza las fechas si «ahora» no es el mes de generación', () => {
    const shifted = loadMockData(Date.parse('2026-09-18T12:00:00Z'))
    const last = shifted.monthlyRevenue[shifted.monthlyRevenue.length - 1]
    expect(last.month).toBe('2026-09')
    // Las cantidades no cambian, solo las etiquetas de mes.
    expect(shifted.summary.monthInvoiced).toBe(407775)
    expect(shifted.invoices.some((inv) => inv.issuedAt.startsWith('2026-09'))).toBe(true)
    expect(shifted.paymentSummary.paid.amount).toBe(311794)
  })
})

describe('computeVatMonth', () => {
  it('calcula IVA trasladado, acreditable y a pagar', () => {
    const result = computeVatMonth({ month: '2026-08', income: 100000, expenses: 60000 })
    expect(result.vatCharged).toBe(16000)
    expect(result.vatCreditable).toBe(9600)
    expect(result.vatPayable).toBe(6400)
  })
})
