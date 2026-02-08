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
      borderRadius: 'var(--card-border-radius)',
      background: `linear-gradient(135deg, ${project.color}10, transparent)`,
      borderColor: `${project.color}30`,
    }}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div
          className="w-3.5 h-3.5 rounded-full"
          style={{ backgroundColor: project.color }}
        />
        <h3 className="font-semibold text-white group-hover:text-white/90">{project.name}</h3>
      </div>
      <span className="text-xs text-white/40 font-mono px-2 py-1 bg-white/5 rounded">{project.year}</span>
    </div>

    <p className="text-white/60 text-sm leading-relaxed pl-6" style={{ marginBottom: 'var(--spacing-lg)' }}>
      {project.description}
    </p>

    <div className="flex flex-wrap pl-6" style={{ gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
      {project.techStack.map((tech) => (
        <span
          key={tech}
          className="bg-white/10 text-white/70 text-xs font-medium"
          style={{
            padding: 'var(--badge-padding-y) var(--badge-padding-x)',
            borderRadius: 'var(--badge-border-radius)'
          }}
        >
          {tech}
        </span>
      ))}
    </div>

    <div className="flex flex-wrap pl-6" style={{ gap: 'var(--spacing-sm)' }}>
      {project.highlights.map((highlight) => (
        <span
          key={highlight}
          className="text-xs font-medium rounded-full"
          style={{
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
      style={{ gap: 'var(--spacing-lg)', paddingBottom: 'var(--window-gap)' }}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white">{t.windows.projects.header}</h2>
        <p className="text-white/50 text-sm">{appsCount} {t.windows.projects.appsInProduction}</p>
      </div>
    </div>
  )
})
ProjectsHeader.displayName = 'ProjectsHeader'

const ProjectsSidebar = memo(() => (
  <div
    className="w-48 shrink-0 border-r border-white/10"
    style={{ paddingRight: 'var(--window-gap)' }}
  >
    <p
      className="text-xs text-white/40 uppercase tracking-wider font-medium"
      style={{ marginBottom: 'var(--spacing-lg)' }}
    >
      {t.windows.projects.sectors}
    </p>
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
      {PROJECTS.map((project) => (
        <li key={project.id}>
          <button
            className="w-full text-left rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors flex items-center"
            style={{ padding: 'var(--spacing-sm) var(--spacing-md)', gap: 'var(--spacing-md)' }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            {t.sectors[project.sector as keyof typeof t.sectors] || project.sector}
          </button>
        </li>
      ))}
    </ul>
  </div>
))
ProjectsSidebar.displayName = 'ProjectsSidebar'

const ProjectsGrid = memo(() => (
  <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ paddingLeft: 'var(--spacing-lg)' }}>
    <div className="grid" style={{ gap: 'var(--card-gap)' }}>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
    <p className="text-white/40 text-xs text-center" style={{ padding: 'var(--window-gap) 0' }}>
      {t.windows.projects.additionalNDA}
    </p>
  </div>
))
ProjectsGrid.displayName = 'ProjectsGrid'

const ProjectsContent = memo(() => (
  <div className="h-full flex flex-col" style={{ gap: 'var(--window-gap)' }}>
    <ProjectsHeader />
    <div className="flex flex-1 min-h-0" style={{ gap: 'var(--window-gap)' }}>
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
