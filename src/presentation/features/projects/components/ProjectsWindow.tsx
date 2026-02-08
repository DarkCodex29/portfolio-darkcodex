import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'API SUNAT/RENIEC',
    description: 'API Enterprise para consultas gubernamentales. 17.8M+ registros procesados.',
    tech: ['NestJS 11', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
    link: 'https://api-reniec-sunat.darkcodex.dev/',
    github: null,
    highlight: true,
  },
  {
    id: 2,
    name: 'EXEOS Wallet',
    description: 'Wallet Ethereum multiplataforma con +32K LOC. BIP39/BIP44, ERC-20.',
    tech: ['Flutter 3.32', 'web3dart', 'Drift ORM', 'BLoC', 'Clean Architecture'],
    link: null,
    github: null,
    highlight: true,
  },
  {
    id: 3,
    name: 'InClub Mobile',
    description: 'App fintech multiplataforma con 2,456 tests automatizados y 99.5% crash-free.',
    tech: ['Flutter', 'Cubit/BLoC', 'GoRouter', 'Shorebird', 'Sentry'],
    link: 'https://play.google.com/store/apps/details?id=com.inclub.app.dev',
    github: null,
    highlight: true,
  },
  {
    id: 4,
    name: 'Pharma Track',
    description: 'Sistema de trazabilidad farmacéutica con 1K+ descargas en Play Store.',
    tech: ['Flutter', 'Kotlin', 'Swift', 'Firebase', 'Hive'],
    link: 'https://play.google.com/store/apps/details?id=pe.inretail.recojo.fp',
    github: null,
    highlight: false,
  },
  {
    id: 5,
    name: 'Sistema Chinalco (SGEM)',
    description: 'Sistema integral de gestión minera con 99.9% uptime.',
    tech: ['Flutter', 'GetX', 'GoRouter', 'REST APIs', 'PostgreSQL'],
    link: null,
    github: null,
    highlight: false,
  },
  {
    id: 6,
    name: 'Web Estimaciones IA',
    description: 'Sistema de estimaciones de proyectos con Claude AI y GPT.',
    tech: ['Next.js 15', 'React 19', 'Supabase', 'Anthropic SDK', 'OpenAI SDK'],
    link: null,
    github: null,
    highlight: false,
  },
]

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <div
      className={`p-4 rounded-lg border transition-colors ${
        project.highlight
          ? 'bg-purple-500/10 border-purple-500/30 hover:border-purple-500/50'
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white">{project.name}</h3>
        <div className="flex gap-2">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-3">{project.description}</p>

      <div className="flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 bg-white/10 text-gray-300 rounded text-xs"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

const ProjectsContent = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/10">
        <span className="text-2xl">📁</span>
        <div>
          <h2 className="text-lg font-semibold text-white">Projects</h2>
          <p className="text-gray-400 text-sm">10+ apps en producción</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-gray-500 text-xs text-center pt-2">
        + 8 proyectos adicionales bajo NDA
      </p>
    </div>
  )
}

export const ProjectsWindow = () => {
  return (
    <WindowWrapper windowKey="finder" title="Projects — Finder" className="w-[600px] max-h-[80vh]">
      <ProjectsContent />
    </WindowWrapper>
  )
}

export default ProjectsWindow
