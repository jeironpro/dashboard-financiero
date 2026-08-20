# Dashboard Financiero «Suma»

Frontend de dashboard financiero para portafolio personal: **ingresos, facturación, suscripciones, estado de pagos y reportes fiscales/contables**.

## ✨ Qué incluye

- **Resumen**: KPIs animados (MRR, ingresos del mes, facturas, suscripciones activas, tasa de cobro), chart de ingresos/gastos (12 meses), donut de estado de pagos, MRR por plan y pagos recientes.
- **Facturación**: tabla de facturas con filtros por estado (todas / pendientes / exitosas / fallidas).
- **Suscripciones**: tarjetas de planes (Starter / Growth / Scale) con MRR por plan y tabla de suscripciones.
- **Pagos**: desglose pendientes / exitosos / fallidos y CTA «Cobrar pendiente» que dibuja la marca de tally (character moment de Hum) con anime.js.
- **Reportes**: IVA mensual (16 %), estado de resultados (ISR 30 %) y balance general con la ecuación contable verificada, exportables a impresión.

## 🛠 Stack

| Capa      | Tecnología                                                                                          |
| --------- | --------------------------------------------------------------------------------------------------- |
| Framework | React 19 + TypeScript + Vite                                                                        |
| Paquete   | yarn 4 (`nodeLinker: node-modules`)                                                                 |
| UI        | shadcn/ui (Radix) sobre Tailwind CSS v4                                                             |
| Diseño    | Skill **Hallmark** · Tema **Hum** · Macroestructura **Stat-Led**                                    |
| Animación | animejs v4 (contadores, reveals, trazos SVG, barras, star-burst) — respeta `prefers-reduced-motion` |
| Datos     | `src/data/mock-data.json` (MOCK realista en MXN, internamente consistente)                          |
| Testing   | vitest + testing-library                                                                            |

## 🚀 Arranque

```bash
yarn install
yarn dev
```

## ✅ Scripts

```bash
yarn dev        # servidor de desarrollo
yarn build      # typecheck + build de producción
yarn preview    # previsualiza el build
yarn lint       # ESLint
yarn typecheck  # tsc -b
yarn test       # vitest run
yarn format     # Prettier
```

## 🧱 Estructura

```
src/
├── components/
│   ├── brand/          # marca BrandMark (character moment)
│   ├── dashboard/      # KPIs, charts, donut, badges
│   ├── invoices/       # tabla de facturación
│   ├── layout/         # sidebar, header, footer, nav
│   ├── payments/       # tally counter y movimientos
│   ├── profile/        # avatar
│   ├── reports/        # IVA, estado de resultados, balance
│   ├── subscriptions/  # planes y tabla de suscripciones
│   └── ui/             # componentes shadcn/ui
├── data/               # cargador tipado del MOCK + KPIs derivados
├── hooks/              # useAnimatedNumber, useReveal, useDashboardData
├── lib/                # anime.ts, format.ts (es-MX), status.ts, utils.ts
├── pages/              # Resumen · Facturación · Suscripciones · Pagos · Reportes
└── types/              # tipos del dominio financiero
```

## 📐 Plan de implementación

El desarrollo se ejecutó por tareas en ramas y PRs individuales hacia `main` según la skill **dicresoft/TASK.md** — ver [`docs/PLAN_TAREAS.md`](docs/PLAN_TAREAS.md).

## 📜 Licencia

MIT — ver [LICENSE](LICENSE).
