import { memo } from 'react'
import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { EXPERIENCE, PROFILE, type Experience } from '@/core/constants/profile'
import { t } from '@/core/constants/translations'
import { ChevronLeft, ChevronRight, Globe, Shield, Search, Share, Plus, Layers } from 'lucide-react'

const SafariToolbar = memo(() => (
  <div
    className="flex items-center bg-gray-800/30 border-b border-white/10"
    style={{ gap: 'var(--space-3)', padding: 'var(--space-2) var(--space-4)' }}
  >
    <div className="flex items-center" style={{ gap: 'var(--space-2)' }}>
      <button className="rounded hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors" style={{ padding: 'var(--space-1)' }}>
        <Layers style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
      </button>
    </div>
    <div className="flex items-center" style={{ gap: 'var(--space-1)' }}>
      <button className="rounded hover:bg-white/10 text-white/40 transition-colors" style={{ padding: 'var(--space-1)' }}>
        <ChevronLeft style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
      </button>
      <button className="rounded hover:bg-white/10 text-white/40 transition-colors" style={{ padding: 'var(--space-1)' }}>
        <ChevronRight style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
      </button>
    </div>
    <div className="flex-1 flex items-center" style={{ gap: 'var(--space-2)', margin: '0 var(--space-2)' }}>
      <Shield style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} className="text-white/40" />
      <div
        className="flex-1 flex items-center bg-white/5 border border-white/10"
        style={{ gap: 'var(--space-2)', padding: 'var(--space-1) var(--space-3)', borderRadius: 'var(--radius-md)' }}
      >
        <Search style={{ width: 'var(--icon-xs)', height: 'var(--icon-xs)' }} className="text-white/40" />
        <span className="text-white/60" style={{ fontSize: 'var(--text-sm)' }}>{PROFILE.contact.github.replace('https://github.com/', '')}/experience</span>
      </div>
    </div>
    <div className="flex items-center" style={{ gap: 'var(--space-2)' }}>
      <button className="rounded hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors" style={{ padding: 'var(--space-1)' }}>
        <Share style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
      </button>
      <button className="rounded hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors" style={{ padding: 'var(--space-1)' }}>
        <Plus style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
      </button>
    </div>
  </div>
))
SafariToolbar.displayName = 'SafariToolbar'

interface TimelineItemProps {
  experience: Experience
  isFirst: boolean
  isLast: boolean
}

const TimelineItem = memo(({ experience, isFirst, isLast }: TimelineItemProps) => (
  <div className="relative flex" style={{ gap: 'var(--space-4)' }}>
    <div className="flex flex-col items-center">
      <div
        className="rounded-full border-2 z-10"
        style={{
          width: 'var(--icon-sm)',
          height: 'var(--icon-sm)',
          borderColor: experience.color,
          backgroundColor: experience.endDate === null ? experience.color : 'transparent'
        }}
      />
      {!isLast && (
        <div className="w-0.5 flex-1 bg-white/20" style={{ margin: 'var(--space-1) 0' }} />
      )}
    </div>
    <div
      className="flex-1 group"
      style={{ marginTop: '-2px', paddingBottom: 'var(--space-6)' }}
    >
      <div
        className="border transition-all duration-200 hover:scale-[1.01]"
        style={{
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-xl)',
          background: `linear-gradient(135deg, ${experience.color}10, transparent)`,
          borderColor: `${experience.color}30`,
        }}
      >
        <div className="flex items-start justify-between" style={{ marginBottom: 'var(--space-2)' }}>
          <div>
            <h3 className="font-semibold text-white" style={{ fontSize: 'var(--text-base)' }}>{experience.role}</h3>
            <p className="text-white/70 flex items-center" style={{ fontSize: 'var(--text-sm)', gap: 'var(--space-2)' }}>
              <Globe style={{ width: 'var(--icon-xs)', height: 'var(--icon-xs)' }} />
              {experience.company}
            </p>
          </div>
          <span
            className="font-medium rounded-full"
            style={{
              fontSize: 'var(--text-xs)',
              padding: 'var(--space-1) var(--space-2)',
              backgroundColor: `${experience.color}20`,
              color: experience.color,
            }}
          >
            {experience.endDate === null ? t.windows.experience.present : experience.period.split(' - ')[1]}
          </span>
        </div>
        <p className="text-white/50" style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-3)' }}>{experience.period}</p>
        <p className="text-white/60" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>{experience.description}</p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-3)' }}>
          {experience.achievements.slice(0, 3).map((achievement, idx) => (
            <li key={idx} className="text-white/50 flex items-start" style={{ fontSize: 'var(--text-xs)', gap: 'var(--space-2)' }}>
              <span style={{ color: experience.color }}>•</span>
              {achievement}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap" style={{ gap: 'var(--space-1)' }}>
          {experience.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="bg-white/10 text-white/70"
              style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
))
TimelineItem.displayName = 'TimelineItem'

const ExperienceSidebar = memo(() => (
  <div
    className="w-44 shrink-0 border-r border-white/10 overflow-y-auto"
    style={{ paddingRight: 'var(--space-4)', minHeight: 0 }}
  >
    <p
      className="text-white/40 uppercase tracking-wider font-medium"
      style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-4)' }}
    >
      {t.windows.experience.companies}
    </p>
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
      {EXPERIENCE.map((exp) => (
        <li key={exp.id}>
          <button
            className="w-full text-left text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center"
            style={{
              fontSize: 'var(--text-sm)',
              padding: 'var(--sidebar-item-padding-y) var(--sidebar-item-padding-x)',
              gap: 'var(--sidebar-item-gap)',
              borderRadius: 'var(--sidebar-item-radius)'
            }}
          >
            <div
              className="rounded-full"
              style={{ width: '10px', height: '10px', backgroundColor: exp.color }}
            />
            <span className="truncate">{exp.company}</span>
          </button>
        </li>
      ))}
    </ul>
  </div>
))
ExperienceSidebar.displayName = 'ExperienceSidebar'

const ExperienceTimeline = memo(() => (
  <div
    style={{
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      paddingLeft: 'var(--space-4)',
    }}
  >
    <div>
      {EXPERIENCE.map((exp, index) => (
        <TimelineItem
          key={exp.id}
          experience={exp}
          isFirst={index === 0}
          isLast={index === EXPERIENCE.length - 1}
        />
      ))}
    </div>
  </div>
))
ExperienceTimeline.displayName = 'ExperienceTimeline'

const ExperienceHeader = memo(() => (
  <div
    className="flex items-center border-b border-white/10 shrink-0"
    style={{ gap: 'var(--space-4)', paddingBottom: 'var(--window-gap)' }}
  >
    <div
      className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
      style={{ width: 'var(--icon-3xl)', height: 'var(--icon-3xl)' }}
    >
      <svg style={{ width: 'var(--icon-lg)', height: 'var(--icon-lg)' }} className="text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    </div>
    <div>
      <h2 className="font-semibold text-white" style={{ fontSize: 'var(--text-lg)' }}>{t.windows.experience.header}</h2>
      <p className="text-white/50" style={{ fontSize: 'var(--text-sm)' }}>{t.windows.experience.yearsInEnterprise}</p>
    </div>
  </div>
))
ExperienceHeader.displayName = 'ExperienceHeader'

const ExperienceContent = memo(() => (
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
    <SafariToolbar />
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: 'var(--window-gap)', padding: 'var(--window-padding)' }}>
      <ExperienceHeader />
      <div style={{ display: 'flex', flex: 1, gap: 'var(--window-gap)', minHeight: 0 }}>
        <ExperienceSidebar />
        <ExperienceTimeline />
      </div>
    </div>
  </div>
))
ExperienceContent.displayName = 'ExperienceContent'

export const ExperienceWindow = memo(() => (
  <WindowWrapper windowKey="safari" title={t.windows.experience.title} className="w-[800px] h-[600px]">
    <ExperienceContent />
  </WindowWrapper>
))
ExperienceWindow.displayName = 'ExperienceWindow'

export default ExperienceWindow
