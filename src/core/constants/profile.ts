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
    linkedin: 'https://linkedin.com/in/gianpierre-mio',
    github: 'https://github.com/DarkCodex29',
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
    id: 'api-sunat-reniec',
    name: 'API SUNAT/RENIEC',
    description: 'API Enterprise para consultas gubernamentales peruanas',
    sector: 'Fintech',
    techStack: ['NestJS 11', 'TypeScript 5.7', 'Prisma 7', 'PostgreSQL 16', 'Redis 7', 'Docker'],
    highlights: ['17.8M+ registros', '11 patrones enterprise', '-93% tiempo sync'],
    year: 'Ene 2026',
    color: '#22c55e',
  },
  {
    id: 'exeos-wallet',
    name: 'EXEOS Wallet',
    description: 'Wallet Ethereum y exit nodes para red descentralizada',
    sector: 'Fintech',
    techStack: ['Flutter 3.32', 'web3dart', 'Drift ORM', 'BLoC', 'FFI', 'Melos'],
    highlights: ['+32K LOC', '7 paquetes monorepo', 'CI/CD -70%'],
    year: 'Ene-Oct 2025',
    color: '#8b5cf6',
  },
  {
    id: 'inclub-fintech',
    name: 'InClub Backoffice',
    description: 'Sistema de gestión financiera multiplataforma iOS + Android',
    sector: 'Fintech',
    techStack: ['Flutter 3.38', 'Cubit/BLoC', 'GoRouter', 'Sentry', 'Shorebird'],
    highlights: ['2,456 tests', '99.5% crash-free', '36 módulos API'],
    year: 'Oct 2024-Feb 2025',
    color: '#3b82f6',
  },
  {
    id: 'chinalco-mining',
    name: 'SGEM Chinalco',
    description: 'Sistema integral de gestión minera para Chinalco (multinacional)',
    sector: 'Mining',
    techStack: ['Flutter', 'GetX', 'GoRouter', 'REST APIs', 'PostgreSQL'],
    highlights: ['99.9% uptime', 'Dashboards real-time', 'Alta disponibilidad'],
    year: 'Ene-Dic 2024',
    color: '#06b6d4',
  },
  {
    id: 'sistema-calera',
    name: 'Sistema Calera / PedidosPapps',
    description: 'Sistema integral de gestión de pedidos para LA CALERA',
    sector: 'Retail',
    techStack: ['Laravel', 'PHP', 'Flutter', 'MySQL', 'Docker'],
    highlights: ['Tracking real-time', 'Reportes ventas', 'Producción'],
    year: 'Oct 2024-Feb 2025',
    color: '#ec4899',
  },
  {
    id: 'sistema-texfina',
    name: 'Sistema Texfina',
    description: 'Sistema integral de gestión textil y manufacturera para TEXFINA',
    sector: 'Textile',
    techStack: ['Angular 18', '.NET 8', 'SQL Server'],
    highlights: ['Inventarios', 'Almacenes', 'Proveedores'],
    year: 'Jul-Sep 2024',
    color: '#f97316',
  },
  {
    id: 'sistema-speed',
    name: 'Sistema Speed',
    description: 'Sistema de gestión documental empresarial para MINERA ARES',
    sector: 'Mining',
    techStack: ['Angular 16', 'NestJS 11', 'PostgreSQL', 'Prisma'],
    highlights: ['Firma electrónica', 'Workflows', 'Dashboards'],
    year: 'Jun 2024',
    color: '#14b8a6',
  },
  {
    id: 'laredo-guias',
    name: 'Guías Laredo',
    description: 'Sistema de guías de remisión con integración EFACT para Agroindustrial Laredo',
    sector: 'Agroindustrial',
    techStack: ['Flutter', '.NET Core', 'Firebase'],
    highlights: ['Integración SUNAT', 'Facturación electrónica', 'Tracking'],
    year: 'Ene-May 2024',
    color: '#f59e0b',
  },
  {
    id: 'pharma-track',
    name: 'Pharma Track',
    description: 'Sistema de trazabilidad farmacéutica para Farmacias Peruanas',
    sector: 'Pharmaceutical',
    techStack: ['Flutter', 'Kotlin', 'Swift', 'Firebase', 'Hive', 'DataWedge'],
    highlights: ['1K+ descargas', 'Offline-first', '99.5% crash-free'],
    year: '2021-2023',
    color: '#ef4444',
  },
  {
    id: 'pharma-reception',
    name: 'Pharma Reception FP',
    description: 'App recepción farmacéutica para Farmacias Peruanas',
    sector: 'Pharmaceutical',
    techStack: ['Flutter', 'Dart', 'Kotlin', 'Swift', 'Firebase'],
    highlights: ['100+ descargas', 'Control calidad', 'Validación'],
    year: '2021-2023',
    color: '#dc2626',
  },
]

export const getProjectById = (id: string): Project | undefined =>
  PROJECTS.find((project) => project.id === id)

export const getProjectsBySector = (sector: Sector): Project[] =>
  PROJECTS.filter((project) => project.sector === sector)
