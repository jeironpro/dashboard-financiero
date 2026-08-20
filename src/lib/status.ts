import type { InvoiceStatus, PaymentMethod, PlanId, SubscriptionStatus } from '@/types/finance'

export interface StatusMeta {
    label: string
    /** Clase de color de texto (Tailwind). */
    text: string
    /** Clase de color del punto indicador (Tailwind). */
    dot: string
    /** Clase de fondo suave para chips (Tailwind). */
    soft: string
}

export const INVOICE_STATUS: Record<InvoiceStatus, StatusMeta> = {
    paid: {
        label: 'Pagada',
        text: 'text-success',
        dot: 'bg-success',
        soft: 'bg-success-soft',
    },
    pending: {
        label: 'Pendiente',
        text: 'text-warning',
        dot: 'bg-warning',
        soft: 'bg-warning-soft',
    },
    failed: {
        label: 'Fallida',
        text: 'text-danger',
        dot: 'bg-danger',
        soft: 'bg-danger-soft',
    },
}

export const PAYMENT_STATUS: Record<'paid' | 'failed', StatusMeta> = {
    paid: {
        label: 'Exitoso',
        text: 'text-success',
        dot: 'bg-success',
        soft: 'bg-success-soft',
    },
    failed: {
        label: 'Fallido',
        text: 'text-danger',
        dot: 'bg-danger',
        soft: 'bg-danger-soft',
    },
}

export const SUBSCRIPTION_STATUS: Record<SubscriptionStatus, StatusMeta> = {
    active: {
        label: 'Activa',
        text: 'text-success',
        dot: 'bg-success',
        soft: 'bg-success-soft',
    },
    overdue: {
        label: 'Atrasada',
        text: 'text-warning',
        dot: 'bg-warning',
        soft: 'bg-warning-soft',
    },
    trial: {
        label: 'Prueba',
        text: 'text-cyan-deep',
        dot: 'bg-cyan',
        soft: 'bg-cyan-soft',
    },
    canceled: {
        label: 'Cancelada',
        text: 'text-ink-2',
        dot: 'bg-ink-3',
        soft: 'bg-paper-3',
    },
}

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
    SPEI: 'SPEI',
    TDC: 'Tarjeta crédito',
    TDD: 'Tarjeta débito',
    transferencia: 'Transferencia',
    paypal: 'PayPal',
}

export const PLAN_META: Record<PlanId, { name: string; tint: string; chip: string }> = {
    starter: {
        name: 'Starter',
        tint: 'text-cyan-deep',
        chip: 'bg-cyan-soft text-cyan-deep',
    },
    growth: {
        name: 'Growth',
        tint: 'text-ink',
        chip: 'bg-pear-soft text-ink',
    },
    scale: {
        name: 'Scale',
        tint: 'text-lavender-deep',
        chip: 'bg-lavender-soft text-lavender-deep',
    },
}
