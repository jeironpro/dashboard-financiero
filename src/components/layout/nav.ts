import { CreditCard, FileText, LayoutDashboard, ReceiptText, Repeat, type LucideIcon } from 'lucide-react'

export type View = 'resumen' | 'facturacion' | 'suscripciones' | 'pagos' | 'reportes'

export interface NavSection {
  id: View
  label: string
  description: string
  icon: LucideIcon
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'resumen',
    label: 'Resumen',
    description: 'KPIs y estado financiero',
    icon: LayoutDashboard,
  },
  {
    id: 'facturacion',
    label: 'Facturación',
    description: 'Facturas emitidas y cobros',
    icon: FileText,
  },
  {
    id: 'suscripciones',
    label: 'Suscripciones',
    description: 'Planes y MRR',
    icon: Repeat,
  },
  {
    id: 'pagos',
    label: 'Pagos',
    description: 'Estado de pagos y métodos',
    icon: CreditCard,
  },
  {
    id: 'reportes',
    label: 'Reportes',
    description: 'Fiscales y contables',
    icon: ReceiptText,
  },
]

export const VIEW_TITLES: Record<View, string> = {
  resumen: 'Resumen financiero',
  facturacion: 'Facturación',
  suscripciones: 'Suscripciones',
  pagos: 'Estado de pagos',
  reportes: 'Reportes fiscales y contables',
}
