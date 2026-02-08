import { memo } from 'react'
import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { Mail, Github, Linkedin, MapPin, FileText, User } from 'lucide-react'
import { PROFILE, STATS, SECTORS, CV_PATH, CV_FILENAME } from '@/core/constants/profile'
import { t } from '@/core/constants/translations'

const AboutContent = memo(() => {
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
          className="rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
          style={{ width: 'var(--icon-3xl)', height: 'var(--icon-3xl)' }}
        >
          <User style={{ width: 'var(--icon-xl)', height: 'var(--icon-xl)' }} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-white" style={{ fontSize: 'var(--text-xl)' }}>{PROFILE.name.full}</h2>
          <p className="text-purple-400 font-medium" style={{ fontSize: 'var(--text-base)' }}>{t.windows.about.role}</p>
          <p className="text-gray-400 flex items-center" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)', gap: 'var(--space-1)' }}>
            <MapPin style={{ width: 'var(--icon-xs)', height: 'var(--icon-xs)' }} />
            {t.windows.about.location}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3" style={{ gap: 'var(--space-3)' }}>
        {STATS.map(({ id, label, value }) => (
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

      {/* Sectors */}
      <div>
        <h3 className="font-semibold text-white" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
          {t.windows.about.sectorsTitle}
        </h3>
        <div className="flex flex-wrap" style={{ gap: 'var(--space-2)' }}>
          {SECTORS.map((sector) => (
            <span
              key={sector}
              className="bg-purple-500/20 text-purple-300 font-medium"
              style={{
                fontSize: 'var(--text-xs)',
                padding: 'var(--badge-padding-y) var(--badge-padding-x)',
                borderRadius: 'var(--badge-radius)'
              }}
            >
              {t.sectors[sector as keyof typeof t.sectors] || sector}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap" style={{ gap: 'var(--space-3)', paddingTop: 'var(--space-2)' }}>
        <a
          href={`mailto:${PROFILE.contact.email}`}
          className="flex items-center bg-purple-500 hover:bg-purple-600 text-white transition-colors"
          style={{
            fontSize: 'var(--text-sm)',
            padding: 'var(--btn-padding-y) var(--btn-padding-x)',
            gap: 'var(--btn-gap)',
            borderRadius: 'var(--btn-radius)'
          }}
        >
          <Mail style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
          {t.actions.email}
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
