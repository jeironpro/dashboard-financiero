/** Estados de factura y de pago. Siempre con icono + texto, nunca solo color. */
export type InvoiceStatus = 'paid' | 'pending' | 'failed'

export type PaymentMethod = 'SPEI' | 'TDC' | 'TDD' | 'transferencia' | 'paypal'

export type SubscriptionStatus = 'active' | 'overdue' | 'trial' | 'canceled'

export type PlanId = 'starter' | 'growth' | 'scale'

export interface Company {
    name: string
    taxId: string
    address: string
    city: string
    currency: string
    fiscalYear: number
    website: string
}

export interface UserProfile {
    id: string
    name: string
    email: string
    role: string
    department: string
    location: string
    lastLogin: string
}

export interface Plan {
    id: PlanId
    name: string
    monthlyAmount: number
    tagline: string
    features: string[]
}

export interface Invoice {
    id: string
    folio: string
    client: string
    concept: string
    issuedAt: string
    dueAt: string
    amount: number
    status: InvoiceStatus
    paymentMethod: PaymentMethod | null
}

export interface Subscription {
    id: string
    client: string
    plan: PlanId
    status: SubscriptionStatus
    seats: number
    monthlyAmount: number
    startedAt: string
    nextBillingAt: string
}

export interface Payment {
    id: string
    invoiceId: string
    client: string
    amount: number
    status: 'paid' | 'failed'
    method: PaymentMethod
    paidAt: string
}

export interface MonthlyPoint {
    month: string
    income: number
    expenses: number
}

export interface VatMonth {
    month: string
    vatCharged: number
    vatCreditable: number
    vatPayable: number
}

export interface IncomeStatement {
    period: string
    income: number
    expenses: number
    grossProfit: number
    incomeTax: number
    netIncome: number
}

export interface BalanceSheet {
    asOf: string
    assets: {
        cash: number
        accountsReceivable: number
        equipment: number
    }
    liabilities: {
        suppliers: number
        taxesPayable: number
    }
    equity: {
        capitalStock: number
        retainedEarnings: number
        /** Resultado del ejercicio: se deriva del estado de resultados. */
        netIncome: number
    }
}

export interface StatusAggregate {
    count: number
    amount: number
}

export interface PaymentSummary {
    paid: StatusAggregate
    pending: StatusAggregate
    failed: StatusAggregate
}

export interface Summary {
    /** Ingreso mensual recurrente: suma de suscripciones activas + atrasadas. */
    mrr: number
    activeSubscriptions: number
    overdueSubscriptions: number
    trialSubscriptions: number
    canceledSubscriptions: number
    /** Facturado del mes en curso (suma de facturas emitidas del mes). */
    monthInvoiced: number
    monthInvoicedCount: number
    /** Cobrado del mes en curso (facturas pagadas del mes). */
    monthCollected: number
    monthCollectedCount: number
    /** Tasa de cobro: pagadas / (pagadas + fallidas) del mes en curso. */
    collectionRate: number
    /** Cuentas por cobrar: facturas pendientes sin importar el mes. */
    accountsReceivable: number
    totalInvoices: number
    ytdIncome: number
    ytdExpenses: number
    ytdProfit: number
}

export interface FinanceData {
    generatedAt: string
    updatedAt: number
    company: Company
    currentUser: UserProfile
    summary: Summary
    monthlyRevenue: MonthlyPoint[]
    plans: Plan[]
    subscriptions: Subscription[]
    invoices: Invoice[]
    payments: Payment[]
    paymentSummary: PaymentSummary
    vatMonthly: VatMonth[]
    incomeStatement: IncomeStatement
    balanceSheet: BalanceSheet
}
