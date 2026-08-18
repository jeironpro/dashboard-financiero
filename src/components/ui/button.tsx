/* eslint-disable react-refresh/only-export-components -- shadcn exporta las variantes del botón */
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Sistema de botón Hum: píldora, borde de color sólido + sombra al piso.
 * El press es el feedback: hover levanta 2px (el borde crece), active presiona 3px.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[transform,box-shadow,background-color] duration-[var(--dur-micro)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Acción primaria = push (pear): borde de color + sombra, se presiona hacia abajo.
        default:
          'bg-primary text-primary-foreground shadow-[0_4px_0_0_var(--color-accent-deep),var(--shadow-btn-cast)] hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-[0_6px_0_0_var(--color-accent-deep),var(--shadow-btn-cast)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-accent-deep)]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-[0_4px_0_0_var(--color-accent-3-deep),var(--shadow-btn-cast)] hover:-translate-y-0.5 hover:bg-destructive/90 hover:shadow-[0_6px_0_0_var(--color-accent-3-deep)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-accent-3-deep)]',
        outline: 'border border-input bg-card hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-cyan underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
