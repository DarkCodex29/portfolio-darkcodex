import { memo } from 'react'
import { PROFILE, STATS, type StatItem } from '@/core/constants/profile'
import { HERO_TECH_STACK, type TechItem } from '@/core/constants/techStack'
import { UI_TEXT, ICONS } from '@/core/constants/ui'

interface HeroSectionProps {
  onExplore?: () => void
}

const AvailableBadge = memo(() => {
  if (PROFILE.availability.status !== 'available') return null

  return (
    <div className="mb-2">
      <span className="inline-block px-3 py-1 text-xs font-medium text-primary-300 bg-primary-500/20 rounded-full border border-primary-500/30">
        {PROFILE.availability.label}
      </span>
    </div>
  )
})
AvailableBadge.displayName = 'AvailableBadge'

const HeroTitle = memo(() => (
  <>
    <h1 className="text-4xl lg:text-5xl font-bold text-text-primary mb-1 tracking-tight">
      {PROFILE.name.first}
    </h1>
    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent mb-3 tracking-tight">
      {PROFILE.name.last}
    </h1>
  </>
))
HeroTitle.displayName = 'HeroTitle'

const HeroSubtitle = memo(() => (
  <>
    <p className="text-lg lg:text-xl text-text-primary font-medium mb-1">
      {PROFILE.title.primary}
    </p>
    <p className="text-sm text-primary-300/80 mb-4">
      {PROFILE.title.secondary}
    </p>
  </>
))
HeroSubtitle.displayName = 'HeroSubtitle'

const HeroDescription = memo(() => (
  <p className="text-text-muted mb-6 leading-relaxed text-sm max-w-md mx-auto">
    {PROFILE.bio.short}
  </p>
))
HeroDescription.displayName = 'HeroDescription'

const StatCard = memo(({ value, label }: Pick<StatItem, 'value' | 'label'>) => (
  <div className="text-center">
    <p className="text-2xl font-bold text-text-primary">{value}</p>
    <p className="text-xs text-text-muted uppercase tracking-wider">{label}</p>
  </div>
))
StatCard.displayName = 'StatCard'

const StatsSection = memo(() => (
  <div className="flex justify-center gap-6 mb-6">
    {STATS.map((stat) => (
      <StatCard key={stat.id} value={stat.value} label={stat.label} />
    ))}
  </div>
))
StatsSection.displayName = 'StatsSection'

const TechBadge = memo(({ name, Icon }: Pick<TechItem, 'name' | 'Icon'>) => (
  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated/50 backdrop-blur-sm rounded-full text-xs text-text-secondary border border-surface-border hover:border-primary-500/40 hover:bg-surface-elevated transition-all duration-200">
    <Icon className="w-4 h-4" />
    <span>{name}</span>
  </div>
))
TechBadge.displayName = 'TechBadge'

const TechStackSection = memo(() => (
  <div className="flex flex-wrap justify-center gap-2 mb-6">
    {HERO_TECH_STACK.map((tech) => (
      <TechBadge key={tech.id} name={tech.name} Icon={tech.Icon} />
    ))}
  </div>
))
TechStackSection.displayName = 'TechStackSection'

const ArrowIcon = memo(() => (
  <svg
    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
    fill="none"
    viewBox={ICONS.arrow.viewBox}
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICONS.arrow.path} />
  </svg>
))
ArrowIcon.displayName = 'ArrowIcon'

interface ExploreButtonProps {
  onClick?: () => void
}

const ExploreButton = memo(({ onClick }: ExploreButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full text-white text-sm font-medium hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 active:scale-95"
  >
    <span className="flex items-center gap-2">
      {UI_TEXT.hero.cta}
      <ArrowIcon />
    </span>
  </button>
))
ExploreButton.displayName = 'ExploreButton'

export const HeroSection = memo(({ onExplore }: HeroSectionProps) => (
  <section className="max-w-lg text-center" aria-label="Hero section">
    <AvailableBadge />
    <HeroTitle />
    <HeroSubtitle />
    <HeroDescription />
    <StatsSection />
    <TechStackSection />
    <ExploreButton onClick={onExplore} />
  </section>
))
HeroSection.displayName = 'HeroSection'

export default HeroSection
