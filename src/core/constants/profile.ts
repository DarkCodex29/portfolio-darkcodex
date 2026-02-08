import { t } from './translations'

export type AvailabilityStatus = 'available' | 'busy' | 'unavailable'

export interface StatItem {
  id: string
  value: string
  label: string
  description?: string
}

export interface Achievement {
  id: string
  value: string
  label: string
  highlight?: boolean
}

export const PROFILE = {
  name: {
    first: 'Gianpierre',
    last: 'Collazos Mio',
    full: 'Gianpierre Sair Collazos Mio',
  },
  title: {
    primary: 'Senior Mobile Engineer',
    secondary: 'Full Stack Developer',
  },
  location: {
    city: 'Chiclayo',
    country: 'Peru',
    full: 'Chiclayo, Peru',
  },
  contact: {
    email: 'gianxs296@gmail.com',
    phone: '+51 952 164 832',
    linkedin: 'https://linkedin.com/in/gianpierre-collazos',
    github: 'https://github.com/gianxs',
  },
  bio: {
    short: 'Desarrollando aplicaciones móviles y web enterprise para sectores fintech, salud, minería y retail.',
    long: 'Senior Mobile Engineer especializado en Flutter y Kotlin con +6 años desarrollando aplicaciones enterprise escalables para sectores críticos. Full Stack Developer con expertise en arquitecturas end-to-end.',
  },
  availability: {
    status: 'available' as AvailabilityStatus,
    label: t.hero.availableForHire,
  },
} as const

export const STATS: StatItem[] = [
  { id: 'years', value: '6+', label: t.stats.years, description: t.stats.yearsExperience },
  { id: 'apps', value: '10+', label: t.stats.apps, description: t.stats.appsInProduction },
  { id: 'users', value: '10K+', label: t.stats.users, description: t.stats.activeUsers },
]

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'records', value: '17.8M+', label: 'Records processed', highlight: true },
  { id: 'tests', value: '2,456', label: 'Automated tests' },
  { id: 'uptime', value: '99.9%', label: 'Uptime' },
  { id: 'optimization', value: '93%', label: 'Time reduction' },
  { id: 'patterns', value: '11', label: 'Design patterns' },
  { id: 'repos', value: '50+', label: 'GitHub repos' },
]

export const SECTORS = [
  'Fintech',
  'Healthcare',
  'Mining',
  'Pharmaceutical',
  'Retail',
  'Textile',
  'Agroindustrial',
  'Chemical',
] as const

export type Sector = (typeof SECTORS)[number]

export interface Project {
  id: string
  name: string
  description: string
  sector: Sector
  techStack: string[]
  highlights: string[]
  year: string
  color: string
}

export const PROJECTS: Project[] = [
  {
    id: 'evolta-fintech',
    name: 'Evolta Fintech',
    description: 'Payment & invoicing platform for micro-enterprises',
    sector: 'Fintech',
    techStack: ['Flutter', 'Kotlin', 'NestJS', 'PostgreSQL'],
    highlights: ['17.8M+ records', 'Real-time payments', 'Biometric auth'],
    year: '2023-2024',
    color: '#22c55e',
  },
  {
    id: 'laredo-agroindustrial',
    name: 'Laredo ERP',
    description: 'Sugar mill production & inventory management',
    sector: 'Agroindustrial',
    techStack: ['.NET', 'Angular', 'SQL Server', 'Azure'],
    highlights: ['SUNAT integration', '93% time reduction', 'Electronic invoicing'],
    year: '2022-2023',
    color: '#f59e0b',
  },
  {
    id: 'cix-farma',
    name: 'CIX Farma Suite',
    description: 'Pharmaceutical distribution & logistics system',
    sector: 'Pharmaceutical',
    techStack: ['Flutter', '.NET', 'Firebase', 'Docker'],
    highlights: ['8 mobile apps', 'Offline-first', 'GPS tracking'],
    year: '2021-2022',
    color: '#8b5cf6',
  },
  {
    id: 'healthcare-app',
    name: 'Healthcare Platform',
    description: 'Patient management & telemedicine solution',
    sector: 'Healthcare',
    techStack: ['React', 'NestJS', 'PostgreSQL', 'AWS'],
    highlights: ['HIPAA compliant', 'Video calls', '10K+ users'],
    year: '2020-2021',
    color: '#ef4444',
  },
  {
    id: 'mining-ops',
    name: 'Mining Operations',
    description: 'Field operations & safety monitoring system',
    sector: 'Mining',
    techStack: ['Kotlin', 'React', 'Node.js', 'MongoDB'],
    highlights: ['Real-time sensors', 'Offline sync', 'Safety alerts'],
    year: '2019-2020',
    color: '#06b6d4',
  },
  {
    id: 'retail-pos',
    name: 'Retail POS System',
    description: 'Point of sale & inventory for retail chains',
    sector: 'Retail',
    techStack: ['Flutter', 'Firebase', 'Cloud Functions'],
    highlights: ['Multi-store', 'Real-time sync', 'Analytics'],
    year: '2018-2019',
    color: '#ec4899',
  },
]

export const getProjectById = (id: string): Project | undefined =>
  PROJECTS.find((project) => project.id === id)

export const getProjectsBySector = (sector: Sector): Project[] =>
  PROJECTS.filter((project) => project.sector === sector)
