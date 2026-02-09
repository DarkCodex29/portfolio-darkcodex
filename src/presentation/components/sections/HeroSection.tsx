import { memo } from 'react'
import { PROFILE, type StatItem } from '@/core/constants/profile'
import { TechCarousel } from '@/presentation/components/ui/TechCarousel'
import { useLanguageStore } from '@/application/store/useLanguageStore'

const AvailableBadge = memo(() => {
  const { translations } = useLanguageStore()

  if (PROFILE.availability.status !== 'available') return null

  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      <span
        className="inline-block font-medium text-primary-300 bg-primary-500/20 rounded-full border border-primary-500/30"
        style={{ fontSize: 'var(--text-xs)', padding: 'var(--badge-padding-y) var(--badge-padding-x)' }}
      >
        {translations.hero.availableForHire}
      </span>
    </div>
  )
})
AvailableBadge.displayName = 'AvailableBadge'

const HeroTitle = memo(() => (
  <>
    <h1 className="font-bold text-text-primary tracking-tight" style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-1)' }}>
      {PROFILE.name.first}
    </h1>
    <h1 className="font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent tracking-tight" style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>
      {PROFILE.name.last}
    </h1>
  </>
))
HeroTitle.displayName = 'HeroTitle'

const HeroSubtitle = memo(() => (
  <>
    <p className="text-text-primary font-medium" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)' }}>
      {PROFILE.title.primary}
    </p>
    <p className="text-primary-300/80" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-5)' }}>
      {PROFILE.title.secondary}
    </p>
  </>
))
HeroSubtitle.displayName = 'HeroSubtitle'

const HeroDescription = memo(() => (
  <p className="text-text-muted leading-relaxed max-w-md mx-auto" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-8)', padding: '0 var(--space-4)' }}>
    {PROFILE.bio.short}
  </p>
))
HeroDescription.displayName = 'HeroDescription'

const StatCard = memo(({ value, label }: Pick<StatItem, 'value' | 'label'>) => (
  <div className="text-center" style={{ padding: 'var(--space-3) var(--space-4)' }}>
    <p className="font-bold text-text-primary" style={{ fontSize: 'var(--text-2xl)' }}>{value}</p>
    <p className="text-text-muted uppercase tracking-wider" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }}>{label}</p>
  </div>
))
StatCard.displayName = 'StatCard'

const StatsSection = memo(() => {
  const { translations } = useLanguageStore()

  const stats = [
    { id: 'years', value: '6+', label: translations.stats.years },
    { id: 'apps', value: '10+', label: translations.stats.apps },
    { id: 'users', value: '10K+', label: translations.stats.users },
  ]

  return (
    <div className="flex justify-center" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-8)', padding: '0 var(--space-4)' }}>
      {stats.map((stat) => (
        <StatCard key={stat.id} value={stat.value} label={stat.label} />
      ))}
    </div>
  )
})
StatsSection.displayName = 'StatsSection'

export const HeroSection = memo(() => (
  <section className="max-w-xl text-center" style={{ padding: 'var(--space-6) var(--space-4)' }} aria-label="Hero section">
    <AvailableBadge />
    <HeroTitle />
    <HeroSubtitle />
    <HeroDescription />
    <StatsSection />
    <div style={{ padding: '0 var(--space-2)' }}>
      <TechCarousel />
    </div>
  </section>
))
HeroSection.displayName = 'HeroSection'

export default HeroSection
