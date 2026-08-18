# Plan de implementación — Dashboard Financiero «Tally»

Plan por tarea basado en la skill **dicresoft/TASK.md** (flujo de trabajo por ticket, ramas individuales y PRs hacia `main`).

## Modo de trabajo

- **Sin Jira** → commits y títulos de PR usan `<prefijo>/<categoría>: <mensaje>`.
- Rama base: `main`. Cada tarea se implementa en su rama `feature/<categoría>`.
- El `<mensaje>` va en minúsculas, modo imperativo y sin punto final.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | React 19 + TypeScript + Vite 7 |
| Paquete | yarn 4 (packageManager `yarn@4.18.0`) |
| UI | shadcn/ui (estilo new-york, base zinc) sobre Tailwind CSS v4 + Radix |
| Diseño | Skill **hallmark** · Tema **Hum (variante Tally)** · Macroestructura **Stat-Led** |
| Animación | animejs v4 (primitivas: contador · reveal · trazo SVG · pulso · star-burst) |
| Datos | `src/data/mock-data.json` (MOCK realista, MXN) |
| Testing | vitest + testing-library |

## Tareas

| # | Rama | Tarea | Entregable | Criterio de aceptación |
|---|---|---|---|---|
| 1 | `chore/setup` | Scaffolding del proyecto | Proyecto Vite + React + TS + yarn + Tailwind v4; alias `@/`; ESLint; scripts `dev/build/lint/typecheck/test` | `yarn build` y `yarn typecheck` pasan; alias `@/` resuelve en `vite.config.ts` y `tsconfig` |
| 2 | `feature/design-tokens` | Sistema de diseño Hallmark (Hum/Tally) | `tokens.css` (papel crema, multi-acento pear/cyan/coral, mint/lavanda) + `src/index.css` (mapeo a variables shadcn) + fuentes Plus Jakarta Sans / JetBrains Mono | Sin hex sueltos: todo color/fuente vía token; contraste AA; stamp Hallmark al inicio de `tokens.css` |
| 3 | `feature/mock-data` | Datos MOCK realistas | `src/data/mock-data.json` + `src/types/finanzas.ts` + `src/data/index.ts` (deriva KPIs) + `src/lib/format.ts` (es-MX, MXN) + `src/lib/status.ts` | Sumas internamente consistentes (MRR = Σ suscripciones activas; ingresos = Σ pagos exitosos; IVA 16 %); tipos sin `any` |
| 4 | `feature/ui-base` | Componentes shadcn/ui | `button`, `card`, `table`, `tabs`, `sheet`, `tooltip`, `dropdown-menu` + `cn()` | Componentes consumen tokens; estados hover/focus/active/disabled completos |
| 5 | `feature/animations` | Capa de animación animejs | `src/lib/anime.ts` + hooks `useAnimatedNumber`, `useReveal`, `useDashboardData` | Respeta `prefers-reduced-motion`; animaciones idempotentes (StrictMode); solo transform/opacity |
| 6 | `feature/layout` | Shell responsive | `Sidebar` (rail flotante escritorio), `Header` sticky, `Footer`, navegación por vistas, `Sheet` móvil | Sin scroll horizontal; navegación usable a 320 px; nav/footer con arquetipos Hallmark (N3 variante / Ft2) |
| 7 | `feature/overview` | Resumen | KPIs animados (MRR, ingresos mes, facturas emitidas, suscripciones activas, tasa de cobro) + chart ingresos/gastos (SVG) + donut de estados de pago + pagos recientes | Contadores tick-up con animejs; chart con fallback accesible (`<table>` + resumen de texto); layout responsive |
| 8 | `feature/invoices` | Facturación | Tabla de facturas con filtro por estado (tabs) + badges de estado | Filtros funcionan; badges con icono+texto (no solo color); tabla accesible (`<caption>`, `th scope`) |
| 9 | `feature/subscriptions` | Suscripciones | Tarjetas de planes + tabla de suscripciones con estado y próxima facturación | MRR por plan derivado del JSON; estados diferenciados |
| 10 | `feature/payments` | Pagos | Desglose pendientes/exitosos/fallidos + tabla de pagos + CTA «Cobrar pendientes» | CTA dibuja trazo tally + star-burst (animejs); estados coherentes con facturas |
| 11 | `feature/reports` | Reportes fiscales/contables | IVA mensual (16 %), estado de resultados, balance general + botón exportar/imprimir | Cifras derivadas del mismo JSON; `window.print()` imprime el reporte |
| 12 | `test/coverage` | Pruebas y verificación final | Tests de utilidades (format, status, datos) y hooks con lógica; `yarn build`, `yarn lint`, `yarn typecheck`, `yarn test` | Tests verdes; build sin errores; lint sin warnings; responsive verificado a 320/375/414/768 px |

## Orden de ejecución

```
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12
```

Cada tarea sigue el ciclo de TASK.md: crear rama desde `main` → implementar → correr tests → commit → PR contra `main` → squash and merge y eliminar rama.

## Decisiones de diseño (skill hallmark)

- **Macroestructura**: Stat-Led — el dashboard habla con números grandes redondeados.
- **Tema**: Hum (variante **Tally** del ejemplo de referencia) — papel crema, acento primario pear, secundario cyan, pop coral, mint para éxito; Plus Jakarta Sans (display/cuerpo) + JetBrains Mono (labels/tabulares). Sin serif, sin blanco puro, sin negro puro, sin esquinas cuadradas.
- **Diferenciación vs. proyecto previo** (Vigía: Workbench · Cobalt): cambia estilo de display (rounded-sans vs. grotesk/mono) y matiz de acento (multi pear/cyan/coral vs. cobalto único). Nav: N3 variante rail flotante redondeado (vs. rail plano). Footer: Ft2 inline con cierre fiscal.
- **Enriquecimiento**: Tier B — SVG a mano del *character moment* (marca de tally que se dibuja con animejs y reacciona al cobrar).
- **Motion (animejs)**: contadores tick-up · reveal escalonado · trazo de líneas/donut/barras · pulso de estados · star-burst coral en éxito. Todo respeta `prefers-reduced-motion`.
