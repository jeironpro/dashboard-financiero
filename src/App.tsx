import { useState } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Sidebar, SidebarContent } from '@/components/layout/Sidebar'
import type { View } from '@/components/layout/nav'
import { FacturacionPage } from '@/pages/FacturacionPage'
import { PagosPage } from '@/pages/PagosPage'
import { ReportesPage } from '@/pages/ReportesPage'
import { ResumenPage } from '@/pages/ResumenPage'
import { SuscripcionesPage } from '@/pages/SuscripcionesPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useDashboardData } from '@/hooks/useDashboardData'

export default function App() {
  const { data, refresh } = useDashboardData()
  const [view, setView] = useState<View>('resumen')
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigate = (next: View) => {
    setView(next)
    window.scrollTo({ top: 0 })
  }

  return (
    <TooltipProvider delayDuration={800}>
      <div className="min-h-dvh">
        <Sidebar active={view} data={data} onNavigate={navigate} onProfile={() => navigate('profile')} />

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetTitle className="sr-only">Navegación</SheetTitle>
            <SheetDescription className="sr-only">Menú principal del dashboard</SheetDescription>
            <SidebarContent
              active={view}
              data={data}
              onNavigate={navigate}
              onNavigateMobile={() => setMobileOpen(false)}
              onProfile={() => navigate('profile')}
            />
          </SheetContent>
        </Sheet>

        <div className="lg:pl-[calc(var(--sidebar-width)+var(--space-lg))]">
          <Header
            view={view}
            data={data}
            onMenuClick={() => setMobileOpen(true)}
            onRefresh={refresh}
            onProfile={() => navigate('profile')}
          />

          <main className="print-main px-4 pb-4 pt-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[var(--page-max)]">
              {view === 'resumen' && <ResumenPage data={data} />}
              {view === 'facturacion' && <FacturacionPage data={data} />}
              {view === 'suscripciones' && <SuscripcionesPage data={data} />}
              {view === 'pagos' && <PagosPage data={data} />}
              {view === 'reportes' && <ReportesPage data={data} />}
              {view === 'profile' && <ProfilePage data={data} />}
            </div>
          </main>

          <Footer data={data} />
        </div>
      </div>
    </TooltipProvider>
  )
}
