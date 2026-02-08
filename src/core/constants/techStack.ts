import type { ComponentType } from 'react'
import {
  Flutter,
  React as ReactIcon,
  CSharp,
  AWS,
  Docker,
  TypeScript,
  NestJS,
  Kotlin,
  Angular,
  NextJs,
  PostgreSQL,
  Firebase,
  Redis,
  GitHubDark,
  Figma,
} from 'developer-icons'

export type TechCategory = 'mobile' | 'frontend' | 'backend' | 'database' | 'devops' | 'tools'

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
  { id: 'react', name: 'React', Icon: ReactIcon, years: 4, category: 'frontend' },
  { id: 'angular', name: 'Angular', Icon: Angular, years: 4, category: 'frontend' },
  { id: 'nextjs', name: 'Next.js', Icon: NextJs, years: 2, category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', Icon: TypeScript, years: 6, category: 'frontend' },
  { id: 'nestjs', name: 'NestJS', Icon: NestJS, years: 3, category: 'backend' },
  { id: 'dotnet', name: '.NET', Icon: CSharp, years: 4, category: 'backend' },
  { id: 'postgresql', name: 'PostgreSQL', Icon: PostgreSQL, years: 5, category: 'database' },
  { id: 'firebase', name: 'Firebase', Icon: Firebase, years: 6, category: 'database' },
  { id: 'redis', name: 'Redis', Icon: Redis, years: 3, category: 'database' },
  { id: 'aws', name: 'AWS', Icon: AWS, years: 3, category: 'devops' },
  { id: 'docker', name: 'Docker', Icon: Docker, years: 4, category: 'devops' },
  { id: 'github', name: 'GitHub', Icon: GitHubDark, years: 6, category: 'tools' },
  { id: 'figma', name: 'Figma', Icon: Figma, years: 3, category: 'tools' },
]

export const getTechByCategory = (category: TechCategory): TechItem[] =>
  TECH_STACK.filter((tech) => tech.category === category)

export const getTechById = (id: string): TechItem | undefined =>
  TECH_STACK.find((tech) => tech.id === id)

export const HERO_TECH_IDS = ['flutter', 'kotlin', 'react', 'nestjs', 'dotnet', 'typescript'] as const

export const HERO_TECH_STACK = HERO_TECH_IDS
  .map((id) => getTechById(id))
  .filter((tech): tech is TechItem => tech !== undefined)
