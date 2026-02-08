import { memo } from 'react'
import { PROFILE, STATS, type StatItem } from '@/core/constants/profile'
import { TechCarousel } from '@/presentation/components/ui/TechCarousel'

const AvailableBadge = memo(() => {
  if (PROFILE.availability.status !== 'available') return null

  return (
    <div className="mb-4">
      <span className="inline-block px-4 py-1.5 text-xs font-medium text-primary-300 bg-primary-500/20 rounded-full border border-primary-500/30">
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
    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent mb-4 tracking-tight">
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
    <p className="text-sm text-primary-300/80 mb-5">
      {PROFILE.title.secondary}
    </p>
  </>
))
HeroSubtitle.displayName = 'HeroSubtitle'

const HeroDescription = memo(() => (
  <p className="text-text-muted mb-8 leading-relaxed text-sm max-w-md mx-auto px-4">
    {PROFILE.bio.short}
  </p>
))
HeroDescription.displayName = 'HeroDescription'

const StatCard = memo(({ value, label }: Pick<StatItem, 'value' | 'label'>) => (
  <div className="text-center px-4 py-3">
    <p className="text-2xl font-bold text-text-primary">{value}</p>
    <p className="text-xs text-text-muted uppercase tracking-wider mt-1">{label}</p>
  </div>
))
StatCard.displayName = 'StatCard'

const StatsSection = memo(() => (
  <div className="flex justify-center gap-4 mb-8 px-4">
    {STATS.map((stat) => (
      <StatCard key={stat.id} value={stat.value} label={stat.label} />
    ))}
  </div>
))
StatsSection.displayName = 'StatsSection'

export const HeroSection = memo(() => (
  <section className="max-w-xl text-center py-6 px-4" aria-label="Hero section">
    <AvailableBadge />
    <HeroTitle />
    <HeroSubtitle />
    <HeroDescription />
    <StatsSection />
    <div className="px-2">
      <TechCarousel />
    </div>
  </section>
))
HeroSection.displayName = 'HeroSection'

export default HeroSection
