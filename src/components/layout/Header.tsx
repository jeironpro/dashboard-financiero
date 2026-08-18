import { useState } from 'react'
import { Menu, RefreshCw } from 'lucide-react'
import { VIEW_TITLES, type View } from './nav'
import { UserMenu } from './UserMenu'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { formatMonthKey } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { FinanceData } from '@/types/finance'

interface HeaderProps {
  view: View
  data: FinanceData
  onMenuClick: () => void
  onRefresh: () => void
  onProfile: () => void
}

export function Header({ view, data, onMenuClick, onRefresh, onProfile }: HeaderProps) {
  const [refreshing, setRefreshing] = useState(false)
  const currentMonth = formatMonthKey(data.monthlyRevenue[data.monthlyRevenue.length - 1].month)

  const handleRefresh = () => {
    setRefreshing(true)
    onRefresh()
    window.setTimeout(() => setRefreshing(false), 600)
  }

  return (
    <header className="app-chrome sticky top-0 z-[var(--z-sticky-nav)] flex h-14 items-center gap-2 border-b border-rule bg-paper/85 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Abrir menú de navegación"
      >
        <Menu className="size-5" aria-hidden="true" />
      </Button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-base font-semibold tracking-tight text-ink">
          {VIEW_TITLES[view]}
        </h1>
      </div>

      <span className="mono-label hidden items-center gap-1.5 rounded-full border border-rule bg-card px-3 py-1 sm:inline-flex">
        <span className="live-dot" aria-hidden="true" />
        {currentMonth}
      </span>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleRefresh} aria-label="Actualizar datos">
            <RefreshCw
              className={cn('size-4', refreshing && 'animate-[spin_600ms_linear_infinite]')}
              aria-hidden="true"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Actualizar datos</TooltipContent>
      </Tooltip>

      <UserMenu user={data.currentUser} onProfile={onProfile} />
    </header>
  )
}
