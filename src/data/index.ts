// Cargador tipado del MOCK: re-ancla las fechas al mes actual y deriva KPIs y
// reportes desde los datos transaccionales (facturas, suscripciones, pagos) —
// la fuente de verdad. Los agregados nunca se inventan: se suman.

import mockData from './mock-data.json'
import type {
    BalanceSheet,
    Company,
    FinanceData,
    IncomeStatement,
    Invoice,
    MonthlyPoint,
    Payment,
    PaymentSummary,
    Plan,
    Subscription,
    Summary,
    UserProfile,
    VatMonth,
} from '@/types/finance'

/** IVA trasladado por ventas (México, tasa estándar). */
export const VAT_RATE = 0.16
/** ISR corporativo sobre la utilidad del ejercicio. */
export const INCOME_TAX_RATE = 0.3

type RawInvoice = Omit<Invoice, 'issuedAt' | 'dueAt'> & { issuedAt: string; dueAt: string }
type RawPayment = Omit<Payment, 'paidAt'> & { paidAt: string }
type RawSubscription = Omit<Subscription, 'startedAt' | 'nextBillingAt'> & {
    startedAt: string
    nextBillingAt: string
}
type RawUser = Omit<UserProfile, 'lastLogin'> & { lastLogin: string }

interface RawMock {
    generatedAt: string
    company: Company
    currentUser: RawUser
    monthlyRevenue: MonthlyPoint[]
    plans: Plan[]
    subscriptions: RawSubscription[]
    invoices: RawInvoice[]
    payments: RawPayment[]
    balanceSheet: BalanceSheet
}

const raw = mockData as unknown as RawMock

function monthKeyOf(iso: string): string {
    return iso.slice(0, 7)
}

/** Desplaza una clave «YYYY-MM» N meses (positivo hacia adelante). */
function shiftMonthKey(key: string, months: number): string {
    const [year, month] = key.split('-').map(Number)
    const total = year * 12 + (month - 1) + months
    const newYear = Math.floor(total / 12)
    const newMonth = (total % 12) + 1
    return `${newYear}-${String(newMonth).padStart(2, '0')}`
}

/** Desplaza una fecha ISO N meses preservando día y hora. */
function shiftIso(iso: string, months: number): string {
    const d = new Date(iso)
    d.setUTCMonth(d.getUTCMonth() + months)
    return d.toISOString()
}

function monthDiff(fromIso: string, now: number): number {
    const from = new Date(fromIso)
    const to = new Date(now)
    return (
        (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth())
    )
}

/** Desglose de estados de pago del mes indicado, sumado desde las facturas. */
export function computePaymentSummary(invoices: Invoice[], monthKey: string): PaymentSummary {
    const empty = (): { count: number; amount: number } => ({ count: 0, amount: 0 })
    const summary: PaymentSummary = { paid: empty(), pending: empty(), failed: empty() }
    for (const inv of invoices) {
        if (monthKeyOf(inv.issuedAt) !== monthKey) continue
        summary[inv.status].count += 1
        summary[inv.status].amount += inv.amount
    }
    return summary
}

/** Resumen de KPIs: MRR, facturación del mes, tasa de cobro, cuentas por cobrar, YTD. */
export function computeSummary(
    subscriptions: Subscription[],
    invoices: Invoice[],
    paymentSummary: PaymentSummary,
    monthlyRevenue: MonthlyPoint[],
): Summary {
    let mrr = 0
    let activeSubscriptions = 0
    let overdueSubscriptions = 0
    let trialSubscriptions = 0
    let canceledSubscriptions = 0
    for (const sub of subscriptions) {
        if (sub.status === 'active' || sub.status === 'overdue') mrr += sub.monthlyAmount
        if (sub.status === 'active') activeSubscriptions += 1
        else if (sub.status === 'overdue') overdueSubscriptions += 1
        else if (sub.status === 'trial') trialSubscriptions += 1
        else canceledSubscriptions += 1
    }

    let accountsReceivable = 0
    for (const inv of invoices) {
        if (inv.status === 'pending') accountsReceivable += inv.amount
    }

    const attempts = paymentSummary.paid.count + paymentSummary.failed.count
    const collectionRate = attempts > 0 ? paymentSummary.paid.count / attempts : 0
    const monthInvoicedCount =
        paymentSummary.paid.count + paymentSummary.pending.count + paymentSummary.failed.count
    const monthInvoiced =
        paymentSummary.paid.amount + paymentSummary.pending.amount + paymentSummary.failed.amount
    const ytdIncome = monthlyRevenue.reduce((acc, p) => acc + p.income, 0)
    const ytdExpenses = monthlyRevenue.reduce((acc, p) => acc + p.expenses, 0)

    return {
        mrr,
        activeSubscriptions,
        overdueSubscriptions,
        trialSubscriptions,
        canceledSubscriptions,
        monthInvoiced,
        monthInvoicedCount,
        monthCollected: paymentSummary.paid.amount,
        monthCollectedCount: paymentSummary.paid.count,
        collectionRate,
        accountsReceivable,
        totalInvoices: invoices.length,
        ytdIncome,
        ytdExpenses,
        ytdProfit: ytdIncome - ytdExpenses,
    }
}

/** Estado de resultados YTD, derivado del chart mensual de ingresos/gastos. */
export function computeIncomeStatement(monthlyRevenue: MonthlyPoint[]): IncomeStatement {
    const income = monthlyRevenue.reduce((acc, p) => acc + p.income, 0)
    const expenses = monthlyRevenue.reduce((acc, p) => acc + p.expenses, 0)
    const grossProfit = income - expenses
    const incomeTax = Math.round(grossProfit * INCOME_TAX_RATE)
    return {
        period: `${monthlyRevenue[0].month}–${monthlyRevenue[monthlyRevenue.length - 1].month}`,
        income,
        expenses,
        grossProfit,
        incomeTax,
        netIncome: grossProfit - incomeTax,
    }
}

/** Declaración mensual de IVA (16 % sobre facturado y gastado). */
export function computeVatMonth(point: MonthlyPoint): VatMonth {
    const vatCharged = Math.round(point.income * VAT_RATE)
    const vatCreditable = Math.round(point.expenses * VAT_RATE)
    return { month: point.month, vatCharged, vatCreditable, vatPayable: vatCharged - vatCreditable }
}

/** Totales del balance general; la ecuación contable la verifica el test. */
export function balanceTotals(balance: BalanceSheet): {
    assets: number
    liabilities: number
    equity: number
} {
    const assets =
        balance.assets.cash + balance.assets.accountsReceivable + balance.assets.equipment
    const liabilities = balance.liabilities.suppliers + balance.liabilities.taxesPayable
    const equity =
        balance.equity.capitalStock + balance.equity.retainedEarnings + balance.equity.netIncome
    return { assets, liabilities, equity }
}

export function loadMockData(now: number = Date.now()): FinanceData {
    const months = monthDiff(raw.generatedAt, now)

    const monthlyRevenue: MonthlyPoint[] = raw.monthlyRevenue.map((p) => ({
        ...p,
        month: shiftMonthKey(p.month, months),
    }))

    const invoices: Invoice[] = raw.invoices.map((inv) => ({
        ...inv,
        issuedAt: shiftIso(inv.issuedAt, months),
        dueAt: shiftIso(inv.dueAt, months),
    }))

    const subscriptions: Subscription[] = raw.subscriptions.map((sub) => ({
        ...sub,
        startedAt: shiftIso(sub.startedAt, months),
        nextBillingAt: shiftIso(sub.nextBillingAt, months),
    }))

    const payments: Payment[] = raw.payments.map((p) => ({
        ...p,
        paidAt: shiftIso(p.paidAt, months),
    }))

    const currentMonth = monthlyRevenue[monthlyRevenue.length - 1].month
    const paymentSummary = computePaymentSummary(invoices, currentMonth)

    // El mes en curso del chart de ingresos es exactamente lo facturado del mes
    // (una sola fuente de verdad: las facturas del JSON).
    monthlyRevenue[monthlyRevenue.length - 1] = {
        ...monthlyRevenue[monthlyRevenue.length - 1],
        income:
            paymentSummary.paid.amount +
            paymentSummary.pending.amount +
            paymentSummary.failed.amount,
    }

    // Reportes y YTD usan solo los meses del ejercicio fiscal; el chart conserva
    // los 12 meses como ventana móvil.
    const fiscalYear = String(raw.company.fiscalYear)
    const fiscalMonths = monthlyRevenue.filter((p) => p.month.startsWith(fiscalYear))

    const summary = computeSummary(subscriptions, invoices, paymentSummary, fiscalMonths)
    const incomeStatement = computeIncomeStatement(fiscalMonths)
    const vatMonthly = monthlyRevenue.map(computeVatMonth)
    const balanceSheet: BalanceSheet = {
        ...raw.balanceSheet,
        equity: { ...raw.balanceSheet.equity, netIncome: incomeStatement.netIncome },
    }

    return {
        generatedAt: raw.generatedAt,
        updatedAt: now,
        company: raw.company,
        currentUser: { ...raw.currentUser, lastLogin: shiftIso(raw.currentUser.lastLogin, months) },
        summary,
        monthlyRevenue,
        plans: raw.plans,
        subscriptions,
        invoices,
        payments,
        paymentSummary,
        vatMonthly,
        incomeStatement,
        balanceSheet,
    }
}
