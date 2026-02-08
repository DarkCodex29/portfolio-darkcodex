import type { ComponentType } from 'react'
import {
  Flutter,
  Kotlin,
  Swift,
  React as ReactIcon,
  Angular,
  NextJs,
  TypeScript,
  JavaScript,
  TailwindCSS,
  RadixUI,
  MaterialUI,
  CSharp,
  NestJS,
  NodeJs,
  Laravel,
  PHP,
  Java,
  Spring,
  PostgreSQL,
  MicrosoftSQLServer,
  MySQL,
  Firebase,
  MongoDB,
  Redis,
  Supabase,
  Prisma,
  Docker,
  AWS,
  Azure,
  GitHubDark,
  Linux,
  ClaudeAI,
  OpenAI,
  Figma,
} from 'developer-icons'

export type TechCategory = 'mobile' | 'frontend' | 'backend' | 'database' | 'devops' | 'ai' | 'tools'

export interface TechItem {
  id: string
  name: string
  Icon: ComponentType<{ className?: string }>
  years?: number
  category: TechCategory
}

export const TECH_STACK: TechItem[] = [
  { id: 'flutter', name: 'Flutter', Icon: Flutter, years: 6, category: 'mobile' },
  { id: 'kotlin', name: 'Kotlin', Icon: Kotlin, years: 7, category: 'mobile' },
  { id: 'swift', name: 'Swift', Icon: Swift, years: 5, category: 'mobile' },
  { id: 'react-native', name: 'React Native', Icon: ReactIcon, years: 3, category: 'mobile' },

  { id: 'angular', name: 'Angular', Icon: Angular, years: 4, category: 'frontend' },
  { id: 'react', name: 'React', Icon: ReactIcon, years: 4, category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', Icon: NextJs, years: 2, category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', Icon: TypeScript, years: 6, category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', Icon: JavaScript, years: 6, category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', Icon: TailwindCSS, years: 4, category: 'frontend' },
  { id: 'radix', name: 'Radix UI', Icon: RadixUI, category: 'frontend' },
  { id: 'mui', name: 'Material UI', Icon: MaterialUI, category: 'frontend' },

  { id: 'dotnet', name: '.NET / C#', Icon: CSharp, years: 4, category: 'backend' },
  { id: 'nestjs', name: 'NestJS', Icon: NestJS, years: 3, category: 'backend' },
  { id: 'nodejs', name: 'Node.js', Icon: NodeJs, years: 5, category: 'backend' },
  { id: 'laravel', name: 'Laravel', Icon: Laravel, years: 2, category: 'backend' },
  { id: 'php', name: 'PHP', Icon: PHP, years: 2, category: 'backend' },
  { id: 'java', name: 'Java', Icon: Java, years: 6, category: 'backend' },
  { id: 'spring', name: 'Spring Boot', Icon: Spring, years: 4, category: 'backend' },

  { id: 'postgresql', name: 'PostgreSQL', Icon: PostgreSQL, years: 5, category: 'database' },
  { id: 'sqlserver', name: 'SQL Server', Icon: MicrosoftSQLServer, years: 4, category: 'database' },
  { id: 'mysql', name: 'MySQL', Icon: MySQL, years: 3, category: 'database' },
  { id: 'firebase', name: 'Firebase', Icon: Firebase, years: 6, category: 'database' },
  { id: 'mongodb', name: 'MongoDB', Icon: MongoDB, category: 'database' },
  { id: 'redis', name: 'Redis', Icon: Redis, years: 3, category: 'database' },
  { id: 'supabase', name: 'Supabase', Icon: Supabase, category: 'database' },
  { id: 'prisma', name: 'Prisma ORM', Icon: Prisma, category: 'database' },

  { id: 'docker', name: 'Docker', Icon: Docker, years: 4, category: 'devops' },
  { id: 'aws', name: 'AWS', Icon: AWS, years: 3, category: 'devops' },
  { id: 'azure', name: 'Azure', Icon: Azure, years: 2, category: 'devops' },
  { id: 'github-actions', name: 'GitHub Actions', Icon: GitHubDark, years: 5, category: 'devops' },
  { id: 'linux', name: 'Linux', Icon: Linux, category: 'devops' },

  { id: 'claude', name: 'Claude AI', Icon: ClaudeAI, category: 'ai' },
  { id: 'openai', name: 'OpenAI', Icon: OpenAI, category: 'ai' },

  { id: 'figma', name: 'Figma', Icon: Figma, years: 3, category: 'tools' },
]

export const getTechByCategory = (category: TechCategory): TechItem[] =>
  TECH_STACK.filter((tech) => tech.category === category)

export const getTechById = (id: string): TechItem | undefined =>
  TECH_STACK.find((tech) => tech.id === id)

export const CAROUSEL_TECH_IDS = [
  'flutter', 'kotlin', 'swift', 'react-native',
  'angular', 'react', 'nextjs', 'typescript', 'javascript', 'tailwind',
  'dotnet', 'nestjs', 'nodejs', 'java', 'spring', 'laravel',
  'postgresql', 'firebase', 'mongodb', 'redis', 'supabase',
  'docker', 'aws', 'azure', 'github-actions',
  'claude', 'openai',
] as const

export const CAROUSEL_TECH_STACK = CAROUSEL_TECH_IDS
  .map((id) => getTechById(id))
  .filter((tech): tech is TechItem => tech !== undefined)

export const HERO_TECH_IDS = ['flutter', 'kotlin', 'react', 'nestjs', 'dotnet', 'typescript'] as const

export const HERO_TECH_STACK = HERO_TECH_IDS
  .map((id) => getTechById(id))
  .filter((tech): tech is TechItem => tech !== undefined)

export const CATEGORY_LABELS: Record<TechCategory, string> = {
  mobile: 'Mobile',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database & Cache',
  devops: 'DevOps & Cloud',
  ai: 'AI & Real-time',
  tools: 'Tools',
}
