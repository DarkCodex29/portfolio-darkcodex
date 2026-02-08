import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CAROUSEL_TECH_STACK, type TechItem } from '@/core/constants/techStack'

const CAROUSEL_CONFIG = {
  duration: 30,
} as const

interface TechBadgeProps {
  tech: TechItem
}

const TechBadge = memo(({ tech }: TechBadgeProps) => {
  const { Icon, name, years } = tech

  return (
    <div
      className="flex items-center bg-surface-elevated/60 backdrop-blur-sm rounded-full border border-surface-border hover:border-primary-500/40 hover:bg-surface-elevated transition-all duration-200 cursor-default shrink-0"
      style={{
        padding: 'var(--badge-padding-y) var(--badge-padding-x)',
        gap: 'var(--space-2)'
      }}
    >
      <Icon className="w-5 h-5" />
      <span className="text-text-secondary font-medium whitespace-nowrap" style={{ fontSize: 'var(--text-sm)' }}>{name}</span>
      {years && (
        <span
          className="text-text-muted bg-surface-overlay/50 rounded-full"
          style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-2)' }}
        >
          {years}y
        </span>
      )}
    </div>
  )
})
TechBadge.displayName = 'TechBadge'

interface CarouselRowProps {
  items: TechItem[]
  direction: 'left' | 'right'
  speed?: number
}

const CarouselRow = memo(({ items, direction, speed = 1 }: CarouselRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return

    const inner = innerRef.current
    const totalWidth = inner.scrollWidth / 2

    const xStart = direction === 'left' ? 0 : -totalWidth
    const xEnd = direction === 'left' ? -totalWidth : 0

    gsap.set(inner, { x: xStart })

    const animation = gsap.to(inner, {
      x: xEnd,
      duration: CAROUSEL_CONFIG.duration / speed,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      animation.kill()
    }
  }, [direction, speed])

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      <div ref={innerRef} className="flex" style={{ gap: 'var(--space-4)' }}>
        {items.map((tech, index) => (
          <TechBadge key={`${tech.id}-1-${index}`} tech={tech} />
        ))}
        {items.map((tech, index) => (
          <TechBadge key={`${tech.id}-2-${index}`} tech={tech} />
        ))}
      </div>
    </div>
  )
})
CarouselRow.displayName = 'CarouselRow'

export const TechCarousel = memo(() => {
  const firstHalf = CAROUSEL_TECH_STACK.slice(0, Math.ceil(CAROUSEL_TECH_STACK.length / 2))
  const secondHalf = CAROUSEL_TECH_STACK.slice(Math.ceil(CAROUSEL_TECH_STACK.length / 2))

  return (
    <div
      className="w-full max-w-lg overflow-hidden"
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
    >
      <CarouselRow items={firstHalf} direction="left" speed={1} />
      <CarouselRow items={secondHalf} direction="right" speed={0.8} />
    </div>
  )
})
TechCarousel.displayName = 'TechCarousel'

export default TechCarousel
