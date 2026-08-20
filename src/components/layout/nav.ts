import {
    CreditCard,
    FileText,
    LayoutDashboard,
    ReceiptText,
    Repeat,
    type LucideIcon,
} from 'lucide-react'

export type View = 'overview' | 'invoices' | 'subscriptions' | 'payments' | 'reports' | 'profile'

export interface NavSection {
    id: View
    label: string
    description: string
    icon: LucideIcon
}

export const NAV_SECTIONS: NavSection[] = [
    {
        id: 'overview',
        label: 'Resumen',
        description: 'KPIs y estado financiero',
        icon: LayoutDashboard,
    },
    {
        id: 'invoices',
        label: 'Facturación',
        description: 'Facturas emitidas y cobros',
        icon: FileText,
    },
    {
        id: 'subscriptions',
        label: 'Suscripciones',
        description: 'Planes y MRR',
        icon: Repeat,
    },
    {
        id: 'payments',
        label: 'Pagos',
        description: 'Estado de pagos y métodos',
        icon: CreditCard,
    },
    {
        id: 'reports',
        label: 'Reportes',
        description: 'Fiscales y contables',
        icon: ReceiptText,
    },
]

export const VIEW_TITLES: Record<View, string> = {
    overview: 'Resumen financiero',
    invoices: 'Facturación',
    subscriptions: 'Suscripciones',
    payments: 'Estado de pagos',
    reports: 'Reportes fiscales y contables',
    profile: 'Mi perfil',
}
