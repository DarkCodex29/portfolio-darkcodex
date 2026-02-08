import {
  Flutter,
  React as ReactIcon,
  CSharp,
  AWS,
  Docker,
} from 'developer-icons'

const techStack = [
  { name: 'Flutter', Icon: Flutter },
  { name: 'React', Icon: ReactIcon },
  { name: '.NET', Icon: CSharp },
  { name: 'AWS', Icon: AWS },
  { name: 'Docker', Icon: Docker },
]

interface HeroSectionProps {
  onExplore?: () => void
}

export const HeroSection = ({ onExplore }: HeroSectionProps) => {
  return (
    <div className="max-w-md">
      <h1 className="text-5xl lg:text-6xl font-bold text-white mb-1 tracking-tight">
        Gianpierre
      </h1>
      <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight">
        Collazos Mio
      </h1>

      <p className="text-xl lg:text-2xl text-white/90 mb-6">
        Senior Mobile Engineer
      </p>

      <p className="text-white/60 mb-8 leading-relaxed text-sm lg:text-base">
        Ingeniero de Software con +5 años desarrollando aplicaciones
        móviles y web de alto rendimiento. Especializado en:
      </p>

      <div className="flex flex-wrap gap-2">
        {techStack.map(({ name, Icon }) => (
          <div
            key={name}
            onClick={name === 'Flutter' ? onExplore : undefined}
            className={`flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white font-medium transition-all border border-white/20 hover:border-purple-500/50 hover:bg-white/15 ${
              name === 'Flutter' ? 'cursor-pointer' : ''
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeroSection
