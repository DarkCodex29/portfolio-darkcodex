import { memo } from 'react'
import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { Mail, Github, Linkedin, MapPin, FileText, User } from 'lucide-react'
import { PROFILE } from '@/core/constants/profile'
import { t } from '@/core/constants/translations'

const stats = [
  { label: t.stats.yearsExperience, value: '6+' },
  { label: t.stats.appsInProduction, value: '10+' },
  { label: t.stats.activeUsers, value: '10K+' },
  { label: t.stats.githubRepos, value: '50+' },
]

const sectors = ['Fintech', 'Salud', 'Minería', 'Retail', 'Agroindustrial', 'Farmacéutico', 'Textil', 'Químico']

const AboutContent = memo(() => {
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/CV_Gianpierre_Collazos.pdf'
    link.download = 'CV_Gianpierre_Collazos.pdf'
    link.click()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--window-gap)' }}>
      <div className="flex items-start" style={{ gap: 'var(--spacing-lg)' }}>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{PROFILE.name.full}</h2>
          <p className="text-purple-400 font-medium">{t.windows.about.role}</p>
          <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {t.windows.about.location}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4" style={{ gap: 'var(--spacing-md)' }}>
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white/5 text-center"
            style={{
              padding: 'var(--card-padding)',
              borderRadius: 'var(--card-border-radius)'
            }}
          >
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      <div className="text-gray-300 text-sm leading-relaxed" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <p>
          {t.windows.about.bioP1.split('Flutter')[0]}
          <span className="text-purple-400">Flutter</span>
          {t.windows.about.bioP1.split('Flutter')[1].split('Kotlin')[0]}
          <span className="text-purple-400">Kotlin</span>
          {t.windows.about.bioP1.split('Kotlin')[1]}
        </p>
        <p>
          {t.windows.about.bioP2.split('.NET')[0]}
          <span className="text-blue-400">.NET, NestJS, Angular, React, Laravel</span>.
        </p>
        <p>
          {t.windows.about.bioP3.split('Keola Networks')[0]}
          <span className="text-green-400">Keola Networks (fintech)</span>,{' '}
          <span className="text-green-400">Software Engineering LATAM</span>,{' '}
          <span className="text-green-400">Grupo EBIM</span>
          {t.windows.about.bioP3.split('Grupo EBIM')[1]}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white" style={{ marginBottom: 'var(--spacing-sm)' }}>
          {t.windows.about.sectorsTitle}
        </h3>
        <div className="flex flex-wrap" style={{ gap: 'var(--spacing-sm)' }}>
          {sectors.map((sector) => (
            <span
              key={sector}
              className="bg-purple-500/20 text-purple-300 text-xs font-medium"
              style={{
                padding: 'var(--badge-padding-y) var(--badge-padding-x)',
                borderRadius: 'var(--badge-border-radius)'
              }}
            >
              {sector}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap" style={{ gap: 'var(--spacing-md)', paddingTop: 'var(--spacing-sm)' }}>
        <a
          href={`mailto:${PROFILE.contact.email}`}
          className="flex items-center bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-sm transition-colors"
          style={{ padding: 'var(--spacing-sm) var(--spacing-lg)', gap: 'var(--spacing-sm)' }}
        >
          <Mail className="w-4 h-4" />
          {t.actions.email}
        </a>
        <a
          href={PROFILE.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors"
          style={{ padding: 'var(--spacing-sm) var(--spacing-lg)', gap: 'var(--spacing-sm)' }}
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
        <a
          href={PROFILE.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors"
          style={{ padding: 'var(--spacing-sm) var(--spacing-lg)', gap: 'var(--spacing-sm)' }}
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
        <button
          onClick={handleDownloadResume}
          className="flex items-center bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm transition-colors"
          style={{ padding: 'var(--spacing-sm) var(--spacing-lg)', gap: 'var(--spacing-sm)' }}
        >
          <FileText className="w-4 h-4" />
          {t.actions.resume}
        </button>
      </div>
    </div>
  )
})
AboutContent.displayName = 'AboutContent'

export const AboutWindow = memo(() => (
  <WindowWrapper windowKey="about" title={t.windows.about.title} className="w-[580px]">
    <AboutContent />
  </WindowWrapper>
))
AboutWindow.displayName = 'AboutWindow'

export default AboutWindow
