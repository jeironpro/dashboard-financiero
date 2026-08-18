import { useEffect, useRef } from 'react'
import { reveal } from '@/lib/anime'

/**
 * Reveal escalonado único de los descendientes `[data-reveal]` al montar.
 * El estado inicial oculto lo aplica CSS (`.js [data-reveal]`), no JS, para evitar flash.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) reveal(ref.current)
  }, [])

  return ref
}
