import { balanceTotals } from '@/data'
import { formatDate, formatMoneyFull } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { BalanceSheet } from '@/types/finance'

interface BalanceSheetCardProps {
  balance: BalanceSheet
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mt-4 first:mt-0">{title}</p>
      <div className="mt-1">{children}</div>
    </div>
  )
}

function Item({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="num text-ink">{formatMoneyFull(value)}</span>
    </div>
  )
}

export function BalanceSheetCard({ balance }: BalanceSheetCardProps) {
  const totals = balanceTotals(balance)
  const balances = totals.assets === totals.liabilities + totals.equity

  return (
    <div
      data-reveal
      className="rounded-[var(--radius-xl)] border border-rule bg-card p-5 shadow-[var(--shadow-whisper)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-base font-semibold tracking-tight text-ink">
            Balance general
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Al {formatDate(balance.asOf)}
          </p>
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
            balances ? 'bg-mint-soft text-success' : 'bg-coral-soft text-danger',
          )}
        >
          {balances ? 'Cuadra' : 'No cuadra'}
        </span>
      </div>

      <Group title="Activos">
        <Item label="Caja y bancos" value={balance.assets.cash} />
        <Item label="Cuentas por cobrar" value={balance.assets.accountsReceivable} />
        <Item label="Equipo de cómputo" value={balance.assets.equipment} />
        <div className="flex items-baseline justify-between gap-3 border-t border-rule pt-1.5 text-sm">
          <span className="font-semibold text-ink">Total activos</span>
          <span className="num font-semibold text-ink">{formatMoneyFull(totals.assets)}</span>
        </div>
      </Group>

      <Group title="Pasivos">
        <Item label="Proveedores" value={balance.liabilities.suppliers} />
        <Item label="Impuestos por pagar" value={balance.liabilities.taxesPayable} />
        <div className="flex items-baseline justify-between gap-3 border-t border-rule pt-1.5 text-sm">
          <span className="font-semibold text-ink">Total pasivos</span>
          <span className="num font-semibold text-ink">{formatMoneyFull(totals.liabilities)}</span>
        </div>
      </Group>

      <Group title="Capital contable">
        <Item label="Capital social" value={balance.equity.capitalStock} />
        <Item label="Utilidades retenidas" value={balance.equity.retainedEarnings} />
        <Item label="Resultado del ejercicio" value={balance.equity.netIncome} />
        <div className="flex items-baseline justify-between gap-3 border-t border-rule pt-1.5 text-sm">
          <span className="font-semibold text-ink">Total capital</span>
          <span className="num font-semibold text-ink">{formatMoneyFull(totals.equity)}</span>
        </div>
      </Group>

      <div className="mt-4 flex items-baseline justify-between gap-3 rounded-xl bg-paper-2 px-3 py-2.5">
        <span className="text-sm font-semibold text-ink">Activos = Pasivos + Capital</span>
        <span className="num text-sm font-semibold text-success">
          {formatMoneyFull(totals.assets)} = {formatMoneyFull(totals.liabilities + totals.equity)}
        </span>
      </div>
    </div>
  )
}
