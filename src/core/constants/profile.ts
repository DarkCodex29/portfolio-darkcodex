export const CV_FILENAME = 'CV_GIANPIERRE_SAIR_COLLAZOS_MIO.pdf'
export const CV_PATH = `/${CV_FILENAME}`

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
  },
} as const

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
    color: '#3b82f6',
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

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  startDate: string
  endDate: string | null
  description: string
  achievements: string[]
  techStack: string[]
  color: string
  logo?: string
}

export const EXPERIENCE: Experience[] = [
  {
    id: 'keola-networks',
    company: 'Keola Networks',
    role: 'Senior Mobile Engineer',
    period: 'Oct 2024 - Presente',
    startDate: '2024-10',
    endDate: null,
    description: 'Desarrollo de aplicaciones fintech y wallets de criptomonedas con arquitectura enterprise.',
    achievements: [
      'Liderazgo técnico en EXEOS Wallet (+32K LOC)',
      'Arquitectura monorepo con 7 paquetes',
      'Optimización CI/CD con reducción del 70%',
      'InClub Backoffice: 2,456 tests automatizados',
    ],
    techStack: ['Flutter 3.32', 'BLoC', 'web3dart', 'Melos', 'Shorebird'],
    color: '#3b82f6',
  },
  {
    id: 'freelance-senior',
    company: 'Freelance',
    role: 'Senior Full Stack Developer',
    period: 'Ene 2024 - Oct 2024',
    startDate: '2024-01',
    endDate: '2024-10',
    description: 'Consultoría y desarrollo de soluciones enterprise para múltiples sectores.',
    achievements: [
      'API SUNAT/RENIEC: 17.8M+ registros procesados',
      'Sistema SGEM Chinalco: 99.9% uptime',
      'Sistema Calera: tracking real-time',
      'Sistema Texfina: gestión textil integral',
    ],
    techStack: ['NestJS', 'Flutter', 'Angular', '.NET', 'PostgreSQL'],
    color: '#22c55e',
  },
  {
    id: 'software-engineering-latam',
    company: 'Software Engineering LATAM',
    role: 'Mobile Developer',
    period: 'Ene 2023 - Dic 2023',
    startDate: '2023-01',
    endDate: '2023-12',
    description: 'Desarrollo mobile y backend para proyectos agroindustriales y mineros.',
    achievements: [
      'Sistema Guías Laredo con integración SUNAT',
      'Facturación electrónica EFACT',
      'Sistema Speed para gestión documental',
      'Firma electrónica y workflows',
    ],
    techStack: ['Flutter', '.NET Core', 'Angular 16', 'Firebase', 'Prisma'],
    color: '#f59e0b',
  },
  {
    id: 'grupo-ebim',
    company: 'Grupo EBIM',
    role: 'Mobile Developer',
    period: '2021 - 2023',
    startDate: '2021-01',
    endDate: '2023-01',
    description: 'Desarrollo de aplicaciones móviles para el sector farmacéutico y salud.',
    achievements: [
      'Pharma Track: 1K+ descargas, 99.5% crash-free',
      'Pharma Reception FP: control de calidad',
      'Arquitectura offline-first',
      'Integración DataWedge para escáners',
    ],
    techStack: ['Flutter', 'Kotlin', 'Swift', 'Firebase', 'Hive'],
    color: '#ef4444',
  },
]

export interface GalleryImage {
  id: string
  projectId: string
  url: string
  title: string
  category: 'mobile' | 'web' | 'enterprise'
}

export const GALLERY: GalleryImage[] = [
  { id: 'exeos-1', projectId: 'exeos-wallet', url: '/images/gallery/exeos-1.png', title: 'EXEOS Wallet', category: 'mobile' },
  { id: 'inclub-1', projectId: 'inclub-fintech', url: '/images/gallery/inclub-1.png', title: 'InClub Backoffice', category: 'mobile' },
  { id: 'chinalco-1', projectId: 'chinalco-mining', url: '/images/gallery/chinalco-1.png', title: 'SGEM Chinalco', category: 'enterprise' },
  { id: 'calera-1', projectId: 'sistema-calera', url: '/images/gallery/calera-1.png', title: 'Sistema Calera', category: 'web' },
  { id: 'texfina-1', projectId: 'sistema-texfina', url: '/images/gallery/texfina-1.png', title: 'Sistema Texfina', category: 'web' },
  { id: 'speed-1', projectId: 'sistema-speed', url: '/images/gallery/speed-1.png', title: 'Sistema Speed', category: 'web' },
  { id: 'laredo-1', projectId: 'laredo-guias', url: '/images/gallery/laredo-1.png', title: 'Guías Laredo', category: 'mobile' },
  { id: 'pharma-1', projectId: 'pharma-track', url: '/images/gallery/pharma-1.png', title: 'Pharma Track', category: 'mobile' },
]
