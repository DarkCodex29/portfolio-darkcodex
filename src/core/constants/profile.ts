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
    short: 'Building enterprise-grade mobile & web apps for fintech, healthcare, mining & retail sectors.',
    long: 'Senior Mobile Engineer especializado en Flutter y Kotlin con +6 años desarrollando aplicaciones enterprise escalables para sectores críticos. Full Stack Developer con expertise en arquitecturas end-to-end.',
  },
  availability: {
    status: 'available' as AvailabilityStatus,
    label: 'Available for hire',
  },
} as const

export const STATS: StatItem[] = [
  { id: 'years', value: '6+', label: 'Years', description: 'Years of professional experience' },
  { id: 'apps', value: '10+', label: 'Apps', description: 'Applications in production' },
  { id: 'users', value: '10K+', label: 'Users', description: 'Active users across apps' },
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
