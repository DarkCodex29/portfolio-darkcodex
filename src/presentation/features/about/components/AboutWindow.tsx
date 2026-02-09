import { memo } from 'react'
import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { Mail, Github, Linkedin, MapPin, FileText, User } from 'lucide-react'
import { PROFILE, SECTORS, CV_PATH, CV_FILENAME } from '@/core/constants/profile'
import { useLanguageStore } from '@/application/store/useLanguageStore'

const AboutContent = memo(() => {
  const { translations } = useLanguageStore()

  const stats = [
    { id: 'years', value: '6+', label: translations.stats.years },
    { id: 'apps', value: '10+', label: translations.stats.apps },
    { id: 'users', value: '10K+', label: translations.stats.users },
  ]

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = CV_PATH
    link.download = CV_FILENAME
    link.click()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--window-gap)' }}>
      {/* Profile Header */}
      <div className="flex items-start" style={{ gap: 'var(--space-4)' }}>
        <div
          className="rounded-full bg-gradient-to-br from-primary-500 to-accent-sky flex items-center justify-center"
          style={{ width: 'var(--icon-3xl)', height: 'var(--icon-3xl)' }}
        >
          <User style={{ width: 'var(--icon-xl)', height: 'var(--icon-xl)' }} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-white" style={{ fontSize: 'var(--text-xl)' }}>{PROFILE.name.full}</h2>
          <p className="text-primary-400 font-medium" style={{ fontSize: 'var(--text-base)' }}>{translations.windows.about.role}</p>
          <p className="text-gray-400 flex items-center" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)', gap: 'var(--space-1)' }}>
            <MapPin style={{ width: 'var(--icon-xs)', height: 'var(--icon-xs)' }} />
            {translations.windows.about.location}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3" style={{ gap: 'var(--space-3)' }}>
        {stats.map(({ id, label, value }) => (
          <div
            key={id}
            className="bg-white/5 text-center"
            style={{
              padding: 'var(--card-padding)',
              borderRadius: 'var(--card-radius)'
            }}
          >
            <div className="font-bold text-white" style={{ fontSize: 'var(--text-2xl)' }}>{value}</div>
            <div className="text-gray-400" style={{ fontSize: 'var(--text-xs)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="text-gray-300 leading-relaxed" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
        <p>
          {translations.windows.about.bioP1.split('Flutter')[0]}
          <span className="text-primary-400">Flutter</span>
          {translations.windows.about.bioP1.split('Flutter')[1].split('Kotlin')[0]}
          <span className="text-primary-400">Kotlin</span>
          {translations.windows.about.bioP1.split('Kotlin')[1]}
        </p>
        <p>
          {translations.windows.about.bioP2.split('.NET')[0]}
          <span className="text-blue-400">.NET, NestJS, Angular, React, Laravel</span>.
        </p>
        <p>
          {translations.windows.about.bioP3.split('Keola Networks')[0]}
          <span className="text-green-400">Keola Networks (fintech)</span>,{' '}
          <span className="text-green-400">Software Engineering LATAM</span>,{' '}
          <span className="text-green-400">Grupo EBIM</span>
          {translations.windows.about.bioP3.split('Grupo EBIM')[1]}
        </p>
      </div>

      {/* Sectors */}
      <div>
        <h3 className="font-semibold text-white" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
          {translations.windows.about.sectorsTitle}
        </h3>
        <div className="flex flex-wrap" style={{ gap: 'var(--space-2)' }}>
          {SECTORS.map((sector) => (
            <span
              key={sector}
              className="bg-primary-500/20 text-primary-300 font-medium"
              style={{
                fontSize: 'var(--text-xs)',
                padding: 'var(--badge-padding-y) var(--badge-padding-x)',
                borderRadius: 'var(--badge-radius)'
              }}
            >
              {translations.sectors[sector as keyof typeof translations.sectors] || sector}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap" style={{ gap: 'var(--space-3)', paddingTop: 'var(--space-2)' }}>
        <a
          href={`mailto:${PROFILE.contact.email}`}
          className="flex items-center bg-primary-500 hover:bg-primary-600 text-white transition-colors"
          style={{
            fontSize: 'var(--text-sm)',
            padding: 'var(--btn-padding-y) var(--btn-padding-x)',
            gap: 'var(--btn-gap)',
            borderRadius: 'var(--btn-radius)'
          }}
        >
          <Mail style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
          {translations.actions.email}
        </a>
        <a
          href={PROFILE.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
          style={{
            fontSize: 'var(--text-sm)',
            padding: 'var(--btn-padding-y) var(--btn-padding-x)',
            gap: 'var(--btn-gap)',
            borderRadius: 'var(--btn-radius)'
          }}
        >
          <Github style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
          GitHub
        </a>
        <a
          href={PROFILE.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          style={{
            fontSize: 'var(--text-sm)',
            padding: 'var(--btn-padding-y) var(--btn-padding-x)',
            gap: 'var(--btn-gap)',
            borderRadius: 'var(--btn-radius)'
          }}
        >
          <Linkedin style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
          LinkedIn
        </a>
        <button
          onClick={handleDownloadResume}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white transition-colors"
          style={{
            fontSize: 'var(--text-sm)',
            padding: 'var(--btn-padding-y) var(--btn-padding-x)',
            gap: 'var(--btn-gap)',
            borderRadius: 'var(--btn-radius)'
          }}
        >
          <FileText style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
          {translations.actions.resume}
        </button>
      </div>
    </div>
  )
})
AboutContent.displayName = 'AboutContent'

export const AboutWindow = memo(() => {
  const { translations } = useLanguageStore()

  return (
    <WindowWrapper windowKey="about" title={translations.windows.about.title} className="w-[580px]">
      <AboutContent />
    </WindowWrapper>
  )
})
AboutWindow.displayName = 'AboutWindow'

export default AboutWindow
