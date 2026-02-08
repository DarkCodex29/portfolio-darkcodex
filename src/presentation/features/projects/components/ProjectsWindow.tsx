import { memo } from 'react'
import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { PROJECTS, STATS, type Project } from '@/core/constants/profile'
import { t } from '@/core/constants/translations'

interface ProjectCardProps {
  project: Project
}

const ProjectCard = memo(({ project }: ProjectCardProps) => (
  <div
    className="border transition-all duration-200 hover:scale-[1.01] cursor-pointer group"
    style={{
      padding: 'var(--card-padding)',
      borderRadius: 'var(--card-radius)',
      background: `linear-gradient(135deg, ${project.color}10, transparent)`,
      borderColor: `${project.color}30`,
    }}
  >
    <div className="flex items-start justify-between" style={{ marginBottom: 'var(--space-3)' }}>
      <div className="flex items-center" style={{ gap: 'var(--space-3)' }}>
        <div
          className="rounded-full"
          style={{ width: 'var(--icon-xs)', height: 'var(--icon-xs)', backgroundColor: project.color }}
        />
        <h3 className="font-semibold text-white group-hover:text-white/90" style={{ fontSize: 'var(--text-base)' }}>{project.name}</h3>
      </div>
      <span
        className="text-white/40 font-mono bg-white/5"
        style={{ fontSize: 'var(--text-xs)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-sm)' }}
      >
        {project.year}
      </span>
    </div>

    <p
      className="text-white/60 leading-relaxed"
      style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', paddingLeft: 'var(--space-6)' }}
    >
      {project.description}
    </p>

    <div className="flex flex-wrap" style={{ gap: 'var(--space-2)', marginBottom: 'var(--space-4)', paddingLeft: 'var(--space-6)' }}>
      {project.techStack.map((tech) => (
        <span
          key={tech}
          className="bg-white/10 text-white/70 font-medium"
          style={{
            fontSize: 'var(--text-xs)',
            padding: 'var(--badge-padding-y) var(--badge-padding-x)',
            borderRadius: 'var(--badge-radius)'
          }}
        >
          {tech}
        </span>
      ))}
    </div>

    <div className="flex flex-wrap" style={{ gap: 'var(--space-2)', paddingLeft: 'var(--space-6)' }}>
      {project.highlights.map((highlight) => (
        <span
          key={highlight}
          className="font-medium rounded-full"
          style={{
            fontSize: 'var(--text-xs)',
            padding: 'var(--badge-padding-y) var(--badge-padding-x)',
            backgroundColor: `${project.color}20`,
            color: project.color,
          }}
        >
          {highlight}
        </span>
      ))}
    </div>
  </div>
))
ProjectCard.displayName = 'ProjectCard'

const ProjectsHeader = memo(() => {
  const appsCount = STATS.find((s) => s.id === 'apps')?.value ?? '10+'

  return (
    <div
      className="flex items-center border-b border-white/10 shrink-0"
      style={{ gap: 'var(--space-4)', paddingBottom: 'var(--window-gap)' }}
    >
      <div
        className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
        style={{ width: 'var(--icon-3xl)', height: 'var(--icon-3xl)' }}
      >
        <svg style={{ width: 'var(--icon-lg)', height: 'var(--icon-lg)' }} className="text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </div>
      <div>
        <h2 className="font-semibold text-white" style={{ fontSize: 'var(--text-lg)' }}>{t.windows.projects.header}</h2>
        <p className="text-white/50" style={{ fontSize: 'var(--text-sm)' }}>{appsCount} {t.windows.projects.appsInProduction}</p>
      </div>
    </div>
  )
})
ProjectsHeader.displayName = 'ProjectsHeader'

const ProjectsSidebar = memo(() => {
  const uniqueSectors = [...new Set(PROJECTS.map(p => p.sector))]
  const sectorColors: Record<string, string> = {}
  PROJECTS.forEach(p => {
    if (!sectorColors[p.sector]) sectorColors[p.sector] = p.color
  })

  return (
    <div
      className="w-48 shrink-0 border-r border-white/10 overflow-y-auto"
      style={{ paddingRight: 'var(--window-gap)', minHeight: 0 }}
    >
      <p
        className="text-white/40 uppercase tracking-wider font-medium"
        style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-4)' }}
      >
        {t.windows.projects.sectors}
      </p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        {uniqueSectors.map((sector) => (
          <li key={sector}>
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
                style={{ width: '10px', height: '10px', backgroundColor: sectorColors[sector] }}
              />
              {t.sectors[sector as keyof typeof t.sectors] || sector}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
})
ProjectsSidebar.displayName = 'ProjectsSidebar'

const ProjectsGrid = memo(() => (
  <div
    style={{
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      paddingLeft: 'var(--space-4)',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--card-gap)' }}>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
    <p className="text-white/40 text-center" style={{ fontSize: 'var(--text-xs)', padding: 'var(--window-gap) 0' }}>
      {t.windows.projects.additionalNDA}
    </p>
  </div>
))
ProjectsGrid.displayName = 'ProjectsGrid'

const ProjectsContent = memo(() => (
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: 'var(--window-gap)' }}>
    <ProjectsHeader />
    <div style={{ display: 'flex', flex: 1, gap: 'var(--window-gap)', minHeight: 0 }}>
      <ProjectsSidebar />
      <ProjectsGrid />
    </div>
  </div>
))
ProjectsContent.displayName = 'ProjectsContent'

export const ProjectsWindow = memo(() => (
  <WindowWrapper windowKey="finder" title={t.windows.projects.title} className="w-[750px] h-[550px]">
    <ProjectsContent />
  </WindowWrapper>
))
ProjectsWindow.displayName = 'ProjectsWindow'

export default ProjectsWindow
