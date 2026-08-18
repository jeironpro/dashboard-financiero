interface SectionHeadingProps {
  eyebrow: string
  title: string
  lead?: string
}

export function SectionHeading({ eyebrow, title, lead }: SectionHeadingProps) {
  return (
    <div data-reveal className="mb-6">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-3xl">
        {title}
      </h2>
      {lead && <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{lead}</p>}
    </div>
  )
}
