import { useEffect, useRef, useState } from 'react'
import { animateNumber } from '@/lib/anime'

/**
 * Devuelve un valor que cuenta animadamente hasta `value` (anime.js).
 * En el primer montaje cuenta desde 0; en actualizaciones posteriores parte del valor mostrado.
 */
export function useAnimatedNumber(value: number, duration = 700): number {
  const [display, setDisplay] = useState(value)
  const current = useRef(value)
  const mounted = useRef(false)

  useEffect(() => {
    const onUpdate = (v: number) => {
      current.current = v
      setDisplay(v)
    }
    if (!mounted.current) {
      mounted.current = true
      animateNumber(value, onUpdate, { from: 0, duration })
    } else {
      animateNumber(value, onUpdate, { from: current.current, duration })
    }
  }, [value, duration])

  return display
}
