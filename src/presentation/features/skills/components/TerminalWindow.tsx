import { memo } from 'react'
import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { Check } from 'lucide-react'
import { t } from '@/core/constants/translations'

const techStack = [
  { category: 'Mobile', items: ['Flutter (6y)', 'Kotlin (7y)', 'Swift (5y)', 'React Native (3y)'] },
  { category: 'Frontend', items: ['React (4y)', 'Angular (4y)', 'Next.js (2y)', 'TypeScript (6y)'] },
  { category: 'Backend', items: ['NestJS (3y)', '.NET/C# (4y)', 'Node.js (5y)', 'Java/Spring (6y)'] },
  { category: 'Database', items: ['PostgreSQL (5y)', 'Firebase (6y)', 'Redis (3y)', 'SQL Server (4y)'] },
  { category: 'DevOps', items: ['Docker (4y)', 'AWS (3y)', 'CI/CD (5y)', 'GitHub Actions'] },
  { category: 'AI & Tools', items: ['Claude AI', 'OpenAI SDK', 'Prisma ORM', 'Clean Architecture'] },
]

const TerminalContent = memo(() => (
  <div className="font-mono text-sm">
    <div className="text-green-400" style={{ marginBottom: 'var(--spacing-lg)' }}>
      <span className="text-purple-400">gian@darkcodex</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">~</span>
      <span className="text-white">$ </span>
      <span className="text-gray-300">{t.windows.terminal.command}</span>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      {techStack.map(({ category, items }) => (
        <div key={category} className="flex items-start" style={{ gap: 'var(--spacing-md)' }}>
          <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-yellow-400 font-semibold">{category}:</span>
            <span className="text-gray-300 ml-2">{items.join(' | ')}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="border-t border-white/10" style={{ marginTop: 'var(--window-gap)', paddingTop: 'var(--spacing-lg)' }}>
      <div className="text-green-400 flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
        <Check className="w-4 h-4" />
        <span>6 {t.windows.terminal.categoriesLoaded}</span>
      </div>
      <div className="text-gray-500 text-xs" style={{ marginTop: 'var(--spacing-xs)' }}>
        {t.windows.terminal.renderTime}
      </div>
    </div>

    <div className="text-green-400" style={{ marginTop: 'var(--spacing-lg)' }}>
      <span className="text-purple-400">gian@darkcodex</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">~</span>
      <span className="text-white">$ </span>
      <span className="animate-pulse">▊</span>
    </div>
  </div>
))
TerminalContent.displayName = 'TerminalContent'

export const TerminalWindow = memo(() => (
  <WindowWrapper windowKey="terminal" title={t.windows.terminal.title} className="w-[600px]">
    <TerminalContent />
  </WindowWrapper>
))
TerminalWindow.displayName = 'TerminalWindow'

export default TerminalWindow
