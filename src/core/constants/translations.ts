export const TRANSLATIONS = {
  es: {
    hero: {
      cta: 'Explorar mi trabajo',
      scrollHint: 'Clic para explorar',
      availableForHire: 'Disponible para contratar',
    },
    navigation: {
      back: 'Volver',
      home: 'Inicio',
    },
    loading: {
      default: 'Cargando...',
    },
    windows: {
      projects: {
        title: 'Proyectos — Finder',
        header: 'Proyectos',
        appsInProduction: 'apps en producción',
        sectors: 'Sectores',
        additionalNDA: '+ 8 proyectos adicionales bajo NDA',
      },
      about: {
        title: 'Sobre Mí',
        role: 'Senior Mobile Engineer | Full Stack Developer',
        location: 'Chiclayo, Perú',
        sectorsTitle: 'Sectores de Experiencia',
        bioP1: 'Senior Mobile Engineer especializado en Flutter y Kotlin con +6 años desarrollando aplicaciones enterprise escalables para sectores críticos.',
        bioP2: 'Full Stack Developer con expertise en arquitecturas end-to-end: .NET, NestJS, Angular, React, Laravel.',
        bioP3: 'Experiencia comprobada en Keola Networks (fintech), Software Engineering LATAM, Grupo EBIM, y proyectos enterprise con integración de IA.',
      },
      contact: {
        title: 'Contacto',
        header: 'Contáctame',
        subtitle: 'Disponible para proyectos freelance y oportunidades full-time',
        email: 'Correo',
        phone: 'Teléfono',
        location: 'Ubicación',
        languages: 'Español (Nativo) · English (B2)',
      },
      terminal: {
        title: 'Habilidades — Terminal',
        command: 'mostrar tech-stack --todo',
        categoriesLoaded: 'categorías cargadas exitosamente',
        renderTime: 'Tiempo de render: 3ms | +6 años de experiencia',
      },
    },
    stats: {
      years: 'Años',
      apps: 'Apps',
      users: 'Usuarios',
      yearsExperience: 'Años de Experiencia',
      appsInProduction: 'Apps en Producción',
      activeUsers: 'Usuarios Activos',
      githubRepos: 'Repos en GitHub',
    },
    sectors: {
      Fintech: 'Fintech',
      Healthcare: 'Salud',
      Mining: 'Minería',
      Pharmaceutical: 'Farmacéutico',
      Retail: 'Retail',
      Textile: 'Textil',
      Agroindustrial: 'Agroindustrial',
      Chemical: 'Químico',
    },
    actions: {
      email: 'Correo',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      resume: 'Descargar CV',
    },
    desktop: {
      projects: 'Proyectos',
      aboutMe: 'Sobre Mí',
      resume: 'CV.pdf',
      skills: 'Habilidades',
      contact: 'Contacto',
      experience: 'Experiencia',
      back: 'Volver',
    },
    menu: ['Archivo', 'Editar', 'Ver', 'Ir', 'Ventana', 'Ayuda'],
  },
  en: {
    hero: {
      cta: 'Explore My Work',
      scrollHint: 'Click to explore',
      availableForHire: 'Available for hire',
    },
    navigation: {
      back: 'Back',
      home: 'Home',
    },
    loading: {
      default: 'Loading...',
    },
    windows: {
      projects: {
        title: 'Projects — Finder',
        header: 'Projects',
        appsInProduction: 'apps in production',
        sectors: 'Sectors',
        additionalNDA: '+ 8 additional projects under NDA',
      },
      about: {
        title: 'About Me',
        role: 'Senior Mobile Engineer | Full Stack Developer',
        location: 'Chiclayo, Peru',
        sectorsTitle: 'Experience Sectors',
        bioP1: 'Senior Mobile Engineer specialized in Flutter and Kotlin with 6+ years building scalable enterprise applications for critical sectors.',
        bioP2: 'Full Stack Developer with expertise in end-to-end architectures: .NET, NestJS, Angular, React, Laravel.',
        bioP3: 'Proven experience at Keola Networks (fintech), Software Engineering LATAM, Grupo EBIM, and enterprise projects with AI integration.',
      },
      contact: {
        title: 'Contact',
        header: 'Get in Touch',
        subtitle: 'Open for freelance projects and full-time opportunities',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        languages: 'Spanish (Native) · English (B2)',
      },
      terminal: {
        title: 'Skills — Terminal',
        command: 'show tech-stack --all',
        categoriesLoaded: 'categories loaded successfully',
        renderTime: 'Render time: 3ms | +6 years experience',
      },
    },
    stats: {
      years: 'Years',
      apps: 'Apps',
      users: 'Users',
      yearsExperience: 'Years Experience',
      appsInProduction: 'Apps in Production',
      activeUsers: 'Active Users',
      githubRepos: 'GitHub Repos',
    },
    sectors: {
      Fintech: 'Fintech',
      Healthcare: 'Healthcare',
      Mining: 'Mining',
      Pharmaceutical: 'Pharmaceutical',
      Retail: 'Retail',
      Textile: 'Textile',
      Agroindustrial: 'Agroindustrial',
      Chemical: 'Chemical',
    },
    actions: {
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      resume: 'Download Resume',
    },
    desktop: {
      projects: 'Projects',
      aboutMe: 'About Me',
      resume: 'Resume.pdf',
      skills: 'Skills',
      contact: 'Contact',
      experience: 'Experience',
      back: 'Back',
    },
    menu: ['File', 'Edit', 'View', 'Go', 'Window', 'Help'],
  },
} as const

export type Language = keyof typeof TRANSLATIONS
export type TranslationKeys = typeof TRANSLATIONS.es

export const DEFAULT_LANGUAGE: Language = 'es'

export const t = TRANSLATIONS[DEFAULT_LANGUAGE]
