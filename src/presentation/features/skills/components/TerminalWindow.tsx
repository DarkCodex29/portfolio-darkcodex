import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { Check } from 'lucide-react'

const techStack = [
  {
    category: 'Mobile',
    items: ['Flutter (6y)', 'Kotlin (7y)', 'Swift (5y)', 'React Native (3y)'],
  },
  {
    category: 'Frontend',
    items: ['React (4y)', 'Angular (4y)', 'Next.js (2y)', 'TypeScript (6y)'],
  },
  {
    category: 'Backend',
    items: ['NestJS (3y)', '.NET/C# (4y)', 'Node.js (5y)', 'Java/Spring (6y)'],
  },
  {
    category: 'Database',
    items: ['PostgreSQL (5y)', 'Firebase (6y)', 'Redis (3y)', 'SQL Server (4y)'],
  },
  {
    category: 'DevOps',
    items: ['Docker (4y)', 'AWS (3y)', 'CI/CD (5y)', 'GitHub Actions'],
  },
  {
    category: 'AI & Tools',
    items: ['Claude AI', 'OpenAI SDK', 'Prisma ORM', 'Clean Architecture'],
  },
]

const TerminalContent = () => {
  return (
    <div className="font-mono text-sm">
      <div className="text-green-400 mb-4">
        <span className="text-purple-400">gian@darkcodex</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$ </span>
        <span className="text-gray-300">show tech-stack --all</span>
      </div>

      <div className="space-y-3">
        {techStack.map(({ category, items }) => (
          <div key={category} className="flex items-start gap-3">
            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-yellow-400 font-semibold">{category}:</span>
              <span className="text-gray-300 ml-2">
                {items.join(' | ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="text-green-400 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>6 categories loaded successfully</span>
        </div>
        <div className="text-gray-500 text-xs mt-1">
          Render time: 3ms | +6 years experience
        </div>
      </div>

      <div className="mt-4 text-green-400">
        <span className="text-purple-400">gian@darkcodex</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$ </span>
        <span className="animate-pulse">▊</span>
      </div>
    </div>
  )
}

export const TerminalWindow = () => {
  return (
    <WindowWrapper windowKey="terminal" title="Skills — Terminal" className="w-[600px]">
      <TerminalContent />
    </WindowWrapper>
  )
}

export default TerminalWindow
