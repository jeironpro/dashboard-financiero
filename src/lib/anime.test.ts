import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { animateNumber, drawLine, growBars, reveal } from '@/lib/anime'

function setReducedMotion(reduce: boolean): void {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches: reduce,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    })
}

beforeEach(() => {
    document.body.innerHTML = ''
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('animateNumber con reduced-motion', () => {
    it('entrega el valor final de forma síncrona, sin animar', () => {
        setReducedMotion(true)
        const onUpdate = vi.fn()
        animateNumber(372753, onUpdate)
        expect(onUpdate).toHaveBeenCalledExactlyOnceWith(372753)
    })
})

describe('reveal con reduced-motion', () => {
    it('muestra los elementos [data-reveal] sin animación', () => {
        setReducedMotion(true)
        document.body.innerHTML =
            '<div id="root"><div data-reveal>a</div><div data-reveal>b</div></div>'
        const root = document.getElementById('root')!
        reveal(root)
        for (const el of root.querySelectorAll('[data-reveal]')) {
            expect((el as HTMLElement).style.opacity).toBe('1')
            expect((el as HTMLElement).style.transform).toBe('none')
        }
    })

    it('es idempotente: no re-anima elementos ya revelados', () => {
        setReducedMotion(true)
        document.body.innerHTML = '<div id="root"><div data-reveal>a</div></div>'
        const root = document.getElementById('root')!
        reveal(root)
        reveal(root)
        expect(root.querySelectorAll('[data-revealed]').length).toBe(1)
    })
})

describe('growBars con reduced-motion', () => {
    it('deja las barras [data-bar] visibles y sin transform', () => {
        setReducedMotion(true)
        document.body.innerHTML = '<div id="root"><div data-bar></div></div>'
        const root = document.getElementById('root')!
        growBars(root)
        const bar = root.querySelector<HTMLElement>('[data-bar]')!
        expect(bar.style.transform).toBe('none')
        expect(bar.style.opacity).toBe('1')
    })
})

describe('drawLine con reduced-motion', () => {
    it('completa el trazo de inmediato', () => {
        setReducedMotion(true)
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        el.setAttribute('x1', '0')
        el.setAttribute('y1', '0')
        el.setAttribute('x2', '10')
        el.setAttribute('y2', '10')
        // jsdom no implementa getTotalLength: se stubbea para el test.
        el.getTotalLength = () => 14.14
        document.body.appendChild(el)
        drawLine(el)
        expect(el.style.strokeDashoffset).toBe('0')
        expect(el.style.strokeDasharray).toBe('none')
    })
})
