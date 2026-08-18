// Envoltura de anime.js v4: centraliza las animaciones y respeta prefers-reduced-motion.
// Primitivas (≤ 4): contador numérico · reveal escalonado · trazo SVG · crecimiento de barras.

import { animate, stagger } from 'animejs'

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Anima un contador numérico de `from` a `to` invocando `onUpdate` por frame. */
export function animateNumber(
  to: number,
  onUpdate: (value: number) => void,
  opts: { from?: number; duration?: number } = {},
): void {
  if (prefersReducedMotion()) {
    onUpdate(to)
    return
  }
  const state = { value: opts.from ?? 0 }
  animate(state, {
    value: to,
    duration: opts.duration ?? 700,
    ease: 'outExpo',
    onUpdate: () => onUpdate(Math.round(state.value)),
  })
}

/** Reveal escalonado de los descendientes `[data-reveal]` del contenedor dado. */
export function reveal(
  root: HTMLElement,
  opts: { staggerMs?: number; duration?: number; translateY?: number } = {},
): void {
  // Idempotente: evita re-ejecutar la animación si ya se reveló (p. ej. StrictMode en dev).
  const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
    (el) => !el.hasAttribute('data-revealed'),
  )
  if (targets.length === 0) return
  targets.forEach((el) => el.setAttribute('data-revealed', 'true'))

  if (prefersReducedMotion()) {
    targets.forEach((el) => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return
  }

  animate(targets, {
    opacity: [0, 1],
    y: [opts.translateY ?? 10, 0],
    duration: opts.duration ?? 420,
    delay: stagger(opts.staggerMs ?? 55, { start: 0 }),
    ease: 'outExpo',
  })
}

/** Dibuja el trazo de un elemento SVG (línea, círculo, path) como parte del reveal. */
export function drawLine(el: SVGGeometryElement, opts: { duration?: number } = {}): void {
  const length = el.getTotalLength()
  el.style.strokeDasharray = `${length}`
  el.style.strokeDashoffset = `${length}`
  if (prefersReducedMotion()) {
    el.style.strokeDashoffset = '0'
    el.style.strokeDasharray = 'none'
    return
  }
  animate(el, {
    strokeDashoffset: [length, 0],
    duration: opts.duration ?? 700,
    ease: 'outExpo',
    onComplete: () => {
      el.style.strokeDasharray = 'none'
    },
  })
}

/** Crecimiento vertical de las barras `[data-bar]` (charts), desde 0 hasta su altura. */
export function growBars(
  root: HTMLElement,
  opts: { staggerMs?: number; duration?: number } = {},
): void {
  const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-bar]')).filter(
    (el) => !el.hasAttribute('data-revealed'),
  )
  if (targets.length === 0) return
  targets.forEach((el) => {
    el.setAttribute('data-revealed', 'true')
    el.style.transformOrigin = '50% 100%'
  })

  if (prefersReducedMotion()) {
    targets.forEach((el) => {
      el.style.transform = 'none'
      el.style.opacity = '1'
    })
    return
  }

  animate(targets, {
    scaleY: [0, 1],
    opacity: [0, 1],
    duration: opts.duration ?? 560,
    delay: stagger(opts.staggerMs ?? 35, { start: 0 }),
    ease: 'outExpo',
  })
}

/** Pulso único y sutil de los puntos `[data-pulse]` (indicadores de estado). */
export function pulseIndicators(root: HTMLElement): void {
  const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-pulse]'))
  if (targets.length === 0 || prefersReducedMotion()) return
  animate(targets, {
    opacity: [1, 0.45, 1, 0.7, 1],
    duration: 1500,
    delay: stagger(110, { start: 0 }),
    ease: 'inOutSine',
  })
}

/** Donut de estado: dibuja los segmentos `[data-segment]` desde su offset acumulado. */
export function drawDonut(
  root: HTMLElement,
  opts: { duration?: number } = {},
): void {
  const segments = Array.from(root.querySelectorAll<SVGCircleElement>('[data-segment]'))
  if (segments.length === 0) return
  for (const circle of segments) {
    const offset = Number(circle.dataset.offset ?? 0)
    const length = Number(circle.dataset.length ?? 0)
    circle.style.strokeDashoffset = `${offset + length}`
    if (prefersReducedMotion()) {
      circle.style.strokeDashoffset = `${offset}`
      continue
    }
    animate(circle, {
      strokeDashoffset: [offset + length, offset],
      duration: opts.duration ?? 800,
      ease: 'outExpo',
    })
  }
}

/** Star-burst coral en el punto (x, y): microcelebración de una acción completada. */
export function burstAt(parent: HTMLElement, x: number, y: number): void {
  if (prefersReducedMotion()) return
  const el = document.createElement('span')
  el.className = 'star-burst'
  el.style.left = `${x - 12}px`
  el.style.top = `${y - 12}px`
  parent.appendChild(el)
  window.setTimeout(() => el.remove(), 450)
}
