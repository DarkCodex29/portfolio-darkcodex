# Portafolio DarkCodex - Gianpierre Sair Collazos Mio

## Concepto

Portafolio inmersivo 3D con escena de un programador en su espacio de trabajo. Al hacer click en el monitor, la cámara hace zoom y muestra el contenido del portafolio.

---

## Stack Tecnológico (Enterprise Grade)

```
React 19 + TypeScript 5.7 + Vite 6
React Three Fiber + Drei + Three.js
GSAP + ScrollTrigger (animaciones)
Tailwind CSS 4
Zustand (state management)
i18next (internacionalización)
Framer Motion (UI animations)
React Query / TanStack Query (data fetching)
```

---

## Principios de Arquitectura

### SOLID Principles
- **S**ingle Responsibility: Cada componente/hook tiene una única responsabilidad
- **O**pen/Closed: Componentes extensibles sin modificar código existente
- **L**iskov Substitution: Componentes intercambiables mediante interfaces
- **I**nterface Segregation: Props específicas, no interfaces gigantes
- **D**ependency Inversion: Depender de abstracciones, no implementaciones

### Clean Architecture Layers
```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION                         │
│  (React Components, Hooks, Context)                     │
├─────────────────────────────────────────────────────────┤
│                    APPLICATION                          │
│  (Use Cases, State Management, Services)                │
├─────────────────────────────────────────────────────────┤
│                      DOMAIN                             │
│  (Entities, Interfaces, Business Rules)                 │
├─────────────────────────────────────────────────────────┤
│                   INFRASTRUCTURE                        │
│  (API Clients, Storage, External Services)              │
└─────────────────────────────────────────────────────────┘
```

### Design Patterns Aplicados
| Patrón | Uso |
|--------|-----|
| **Repository** | Abstracción de data sources |
| **Factory** | Creación de componentes 3D |
| **Observer** | Event system para interacciones 3D |
| **Strategy** | Diferentes animaciones/transiciones |
| **Singleton** | Store global (Zustand) |
| **Adapter** | Integración con APIs externas |
| **Facade** | Simplificar Three.js API |
| **Composite** | Árbol de componentes 3D |

---

## Arquitectura de Carpetas (Feature-Based + Clean Architecture)

```
portfolio-darkcodex/
├── public/
│   ├── models/                    # Modelos 3D (.glb/.gltf)
│   │   ├── room/
│   │   ├── character/
│   │   └── accessories/
│   ├── textures/
│   ├── fonts/
│   └── locales/
│       ├── es/
│       │   └── translation.json
│       └── en/
│           └── translation.json
│
├── src/
│   │
│   ├── core/                      # DOMAIN LAYER
│   │   ├── entities/              # Business entities
│   │   │   ├── Project.ts
│   │   │   ├── Experience.ts
│   │   │   ├── Skill.ts
│   │   │   └── index.ts
│   │   ├── interfaces/            # Contracts/Ports
│   │   │   ├── IProjectRepository.ts
│   │   │   ├── IAnalyticsService.ts
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   ├── theme.constants.ts
│   │   │   ├── animation.constants.ts
│   │   │   └── index.ts
│   │   └── types/
│   │       ├── common.types.ts
│   │       ├── three.types.ts
│   │       └── index.ts
│   │
│   ├── infrastructure/            # INFRASTRUCTURE LAYER
│   │   ├── api/                   # External API clients
│   │   │   └── github.api.ts
│   │   ├── storage/               # Local storage adapters
│   │   │   ├── ThemeStorage.ts
│   │   │   └── LanguageStorage.ts
│   │   ├── analytics/
│   │   │   └── GoogleAnalytics.ts
│   │   └── repositories/          # Repository implementations
│   │       ├── ProjectRepository.ts
│   │       └── ExperienceRepository.ts
│   │
│   ├── application/               # APPLICATION LAYER
│   │   ├── services/              # Business logic services
│   │   │   ├── ThemeService.ts
│   │   │   ├── LanguageService.ts
│   │   │   └── AnimationService.ts
│   │   ├── store/                 # State management (Zustand)
│   │   │   ├── useThemeStore.ts
│   │   │   ├── useLanguageStore.ts
│   │   │   ├── useCameraStore.ts
│   │   │   ├── useSceneStore.ts
│   │   │   └── index.ts
│   │   └── hooks/                 # Application-level hooks
│   │       ├── useProjects.ts
│   │       ├── useExperiences.ts
│   │       └── useSkills.ts
│   │
│   ├── presentation/              # PRESENTATION LAYER
│   │   │
│   │   ├── components/            # Shared UI components
│   │   │   ├── ui/                # Atomic components
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Card/
│   │   │   │   ├── Badge/
│   │   │   │   ├── Typography/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── layout/            # Layout components
│   │   │   │   ├── Navbar/
│   │   │   │   ├── Footer/
│   │   │   │   ├── Container/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── feedback/          # Feedback components
│   │   │       ├── Loader/
│   │   │       ├── Toast/
│   │   │       └── index.ts
│   │   │
│   │   ├── three/                 # Three.js Components
│   │   │   ├── canvas/            # Main canvas setup
│   │   │   │   ├── Scene.tsx
│   │   │   │   ├── Camera.tsx
│   │   │   │   ├── Lights.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── models/            # 3D Model components
│   │   │   │   ├── Room/
│   │   │   │   │   ├── Room.tsx
│   │   │   │   │   ├── Room.types.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Monitor/
│   │   │   │   ├── Desk/
│   │   │   │   ├── Chair/
│   │   │   │   ├── Character/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── effects/           # Visual effects
│   │   │   │   ├── Particles.tsx
│   │   │   │   ├── PostProcessing.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── controls/          # Camera/interaction controls
│   │   │   │   ├── CameraController.tsx
│   │   │   │   ├── OrbitControls.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── helpers/           # Three.js utilities
│   │   │       ├── useModel.ts
│   │   │       ├── useAnimation.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── features/              # Feature modules
│   │   │   │
│   │   │   ├── hero/
│   │   │   │   ├── components/
│   │   │   │   │   ├── HeroSection.tsx
│   │   │   │   │   └── HeroTitle.tsx
│   │   │   │   ├── hooks/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── about/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AboutSection.tsx
│   │   │   │   │   └── ProfileCard.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── skills/
│   │   │   │   ├── components/
│   │   │   │   │   ├── SkillsSection.tsx
│   │   │   │   │   ├── SkillCard.tsx
│   │   │   │   │   └── SkillBar.tsx
│   │   │   │   ├── data/
│   │   │   │   │   └── skills.data.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── experience/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ExperienceSection.tsx
│   │   │   │   │   ├── Timeline.tsx
│   │   │   │   │   └── ExperienceCard.tsx
│   │   │   │   ├── data/
│   │   │   │   │   └── experience.data.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── projects/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ProjectsSection.tsx
│   │   │   │   │   ├── ProjectCard.tsx
│   │   │   │   │   └── ProjectModal.tsx
│   │   │   │   ├── data/
│   │   │   │   │   └── projects.data.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── achievements/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AchievementsSection.tsx
│   │   │   │   │   └── MetricCounter.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── contact/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ContactSection.tsx
│   │   │   │   │   └── ContactForm.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useContactForm.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── settings/          # Theme & Language toggles
│   │   │       ├── components/
│   │   │       │   ├── ThemeToggle.tsx
│   │   │       │   └── LanguageSwitch.tsx
│   │   │       └── index.ts
│   │   │
│   │   ├── hooks/                 # Presentation hooks
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useScrollPosition.ts
│   │   │   ├── useIntersectionObserver.ts
│   │   │   └── index.ts
│   │   │
│   │   └── pages/                 # Page components
│   │       ├── HomePage.tsx
│   │       └── NotFoundPage.tsx
│   │
│   ├── shared/                    # Shared utilities
│   │   ├── utils/
│   │   │   ├── cn.ts              # className merger (clsx + twMerge)
│   │   │   ├── formatters.ts
│   │   │   └── index.ts
│   │   ├── animations/
│   │   │   ├── gsap.config.ts
│   │   │   ├── variants.ts        # Framer Motion variants
│   │   │   └── index.ts
│   │   └── config/
│   │       ├── i18n.config.ts
│   │       ├── seo.config.ts
│   │       └── index.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── themes/
│   │       ├── light.css
│   │       └── dark.css
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── tests/                         # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .husky/                        # Git hooks
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── eslint.config.js
├── prettier.config.js
├── .env.example
├── .gitignore
├── README.md
└── PLAN.md
```

---

## Features Principales

| Feature | Descripción | Prioridad |
|---------|-------------|-----------|
| **3D Scene** | Escena de programador con escritorio, monitor, silla | P0 |
| **Interactive Camera** | Click en monitor → zoom animado → contenido | P0 |
| **Dark/Light Mode** | Toggle con transición suave, persistencia | P0 |
| **Responsive** | Desktop, tablet, mobile (fallback 2D si necesario) | P0 |
| **i18n** | Español (default) + English | P0 |
| **Performance** | Lazy loading, LOD, compresión de modelos | P1 |
| **SEO** | Meta tags, Open Graph, structured data | P1 |
| **Analytics** | Google Analytics 4 | P2 |
| **PWA** | Service Worker, offline support | P2 |

---

## Repos de Referencia

### Room/Office Scene (Tu idea)
| Repo | Estrellas | Descripción | Link |
|------|-----------|-------------|------|
| **3D-room-portofolio** | - | Room interactivo con Three.js + Blender | [GitHub](https://github.com/maxime-mrl/3D-room-portofolio) |
| **Room_Portfolio** | - | Room con objetos interactivos (Mario, música, etc.) | [GitHub](https://github.com/AT010303/Room_Portfolio) |
| **VenkaTesanPortfolio** | - | Room con GSAP ScrollTrigger + Asscroll | [GitHub](https://github.com/Venkatesan-M/VenkaTesanPortfolio) |

### Hacker Room / Developer Desk (Alternativa)
| Repo | Estrellas | Descripción | Link |
|------|-----------|-------------|------|
| **threejs-portfolio** | 983 | 3D Hacker room que responde al mouse | [GitHub](https://github.com/adrianhajdin/threejs-portfolio) |
| **3d-portfolio** | 530 | React.js + Three.js portfolio tutorial | [GitHub](https://github.com/adrianhajdin/3d-portfolio) |
| **project_3D_developer_portfolio** | High | Desktop 3D + framer motion | [GitHub](https://github.com/adrianhajdin/project_3D_developer_portfolio) |

### Game-like con Avatar (Avanzado)
| Repo | Estrellas | Descripción | Link |
|------|-----------|-------------|------|
| **threejs-portfolio (VinayMatta)** | - | Character con movimiento tipo juego | [GitHub](https://github.com/VinayMatta63/threejs-portfolio) |
| **ThreeJS-Portfolio** | - | Avatar movible en entorno 3D | [GitHub](https://github.com/ShahramShakiba/ThreeJS-Portfolio) |

---

## Secciones del Portafolio (basado en CV)

### 1. Hero / Intro (3D Scene)
- **Escena**: Habitación de programador
- **Interacción**: Click en monitor → zoom
- Nombre: **Gianpierre Sair Collazos Mio**
- Título: **Senior Mobile Engineer | Full Stack Developer**
- CTA: "Ver mi trabajo" / "Contactar"

### 2. About Me
- +6 años desarrollando apps enterprise
- Sectores: fintech, salud, minería, retail, agroindustrial
- 10+ apps en producción, 10K+ usuarios activos
- Foto profesional o avatar 3D

### 3. Skills (Visualización interactiva)

```typescript
const skills = {
  mobile: [
    { name: 'Flutter', years: 6, level: 'Expert' },
    { name: 'Kotlin', years: 7, level: 'Expert' },
    { name: 'Swift', years: 5, level: 'Advanced' },
    { name: 'React Native', years: 3, level: 'Advanced' },
  ],
  frontend: [
    { name: 'React', years: 4, level: 'Expert' },
    { name: 'Angular', years: 4, level: 'Expert' },
    { name: 'Next.js', years: 2, level: 'Advanced' },
    { name: 'TypeScript', years: 6, level: 'Expert' },
  ],
  backend: [
    { name: 'NestJS', years: 3, level: 'Expert' },
    { name: '.NET/C#', years: 4, level: 'Advanced' },
    { name: 'Node.js', years: 5, level: 'Expert' },
    { name: 'Java/Spring', years: 6, level: 'Advanced' },
  ],
  database: [
    { name: 'PostgreSQL', years: 5, level: 'Expert' },
    { name: 'Firebase', years: 6, level: 'Expert' },
    { name: 'Redis', years: 3, level: 'Advanced' },
  ],
  devops: [
    { name: 'Docker', years: 4, level: 'Advanced' },
    { name: 'AWS', years: 3, level: 'Intermediate' },
    { name: 'CI/CD', years: 5, level: 'Expert' },
  ],
  ai: [
    { name: 'Claude AI', level: 'Advanced' },
    { name: 'OpenAI', level: 'Advanced' },
  ],
};
```

### 4. Experience Timeline

| Período | Empresa | Rol | Proyecto Destacado |
|---------|---------|-----|-------------------|
| Ene 2026 | Personal | Senior Backend | API SUNAT/RENIEC (17.8M+ registros) |
| Ene-Oct 2025 | Freelancer | Senior Flutter | EXEOS Wallet Ethereum (+32K LOC) |
| Oct 2024-Feb 2025 | Keola Networks | Senior Mobile | InClub Fintech (2,456 tests) |
| Ene-Dic 2024 | Ayesa | Senior Full Stack | Chinalco Mining System |
| Ene 2024-Feb 2025 | Grupo EBIM | Senior Full Stack | 6 proyectos enterprise |
| 2021-2023 | Grupo EBIM | Mobile Developer | Farmacias Peruanas Apps |

### 5. Projects Showcase

**Proyectos Públicos Verificables:**
1. **API SUNAT/RENIEC** - https://api-reniec-sunat.darkcodex.dev/
2. **InClub** - Play Store & App Store
3. **Pharma Track** - Play Store (1K+ descargas)
4. **Pharma Reception** - Play Store

### 6. Achievements (Métricas animadas con CountUp)
- 17.8M+ registros procesados
- 2,456 tests automatizados
- 10K+ usuarios activos
- 93% reducción en tiempos
- 11 patrones de diseño
- 50+ repos en GitHub

### 7. Contact
- Email: gianxs296@gmail.com
- Phone: +51 952 164 832
- LinkedIn, GitHub
- Formulario de contacto

---

## Fases de Desarrollo

### Fase 1: Setup & Arquitectura Base ✅ COMPLETADO
- [x] Inicializar proyecto con Vite + React 19 + TypeScript
- [x] Configurar estructura de carpetas (Feature-based)
- [x] Setup ESLint + Prettier
- [x] Configurar Tailwind CSS 4
- [x] Instalar React Three Fiber + Drei + Rapier
- [x] Configurar Zustand stores (theme, scene, window)
- [x] Setup path aliases (@/, @core, @application, @presentation)
- [x] Configurar design tokens en CSS

### Fase 2: Escena 3D Base ✅ COMPLETADO
- [x] Badge 3D con física (Rapier)
- [x] Gaming Setup 3D (gaming-setup.glb)
- [x] Implementar Canvas con Suspense + Loading
- [x] Configurar luces (ambient, directional, point)
- [x] Cargar modelos GLB/GLTF con useGLTF
- [x] Animaciones de rotación con useFrame

### Fase 3: Interactividad 3D ✅ COMPLETADO
- [x] Click en Gaming Setup → transición a Desktop
- [x] Transición animada con GSAP (scale + opacity)
- [x] Hover effects (cursor pointer)
- [x] Botón CTA 3D integrado en el setup
- [x] Rotación CSS sincronizada con el modelo 3D

### Fase 4: macOS Desktop UI ✅ COMPLETADO
- [x] TopBar con reloj en tiempo real
- [x] Control Center (WiFi, Bluetooth, Brightness, Volume, Dark Mode)
- [x] Calendar Dropdown con navegación de meses
- [x] Spotlight Search (Cmd+Space) con navegación por teclado
- [x] Context Menu (click derecho)
- [x] Dock animado con indicadores
- [x] Window system (draggable, maximize, minimize, close)
- [x] Terminal Window (Skills con categorías)
- [x] About Window (Perfil + Bio + Stats)
- [x] Projects Window (Finder-style con proyectos)
- [x] Contact Window (Información de contacto)
- [x] Experience Window (Safari-style timeline)
- [x] Gallery Window (Photos-style con proyectos)

### Fase 5: Features Core ✅ COMPLETADO
- [x] Dark/Light mode con persistencia (Zustand)
- [x] Theme toggle en Control Center y Context Menu
- [x] Design tokens CSS variables
- [x] Loading screen con progreso (useProgress)
- [x] Keyboard shortcuts (Cmd+Space para Spotlight)
- [x] Responsive design tokens

### Fase 6: Windows 11 Mode ✅ COMPLETADO
- [x] OS Toggle Store (useOSStore) con persistencia
- [x] Windows 11 Desktop View base
- [x] Taskbar con Start, Search, System Tray, Clock
- [x] Start Menu con apps grid y recommended section (iconos PNG)
- [x] Action Center con iconos SVG (WiFi, Bluetooth, Brightness, Volume)
- [x] NotificationCenter con iconos PNG (VS Code, Chrome)
- [x] WindowsSearch (equivalente a Spotlight)
- [x] WindowsContextMenu (click derecho)
- [x] OS Toggle en Dock (macOS) y Taskbar (Windows 11)
- [x] Desktop Icons (Volver, Projects, About, Resume, GitHub, LinkedIn, Skills, Contact, Experience)
- [x] Window components (Terminal, About, Projects, Contact, Experience, Gallery)
- [x] Start Menu integrado con ventanas (6 apps funcionales)
- [x] Iconos Windows 11 (27 iconos PNG de repos oficiales)
- [x] Eliminación de emojis - reemplazados por iconos SVG/PNG en todos los componentes
  - [x] Start Menu (PNG icons)
  - [x] NotificationCenter (PNG icons: VS Code, Chrome)
  - [x] ActionCenter (SVG icons: WiFi, Bluetooth, Brightness, Volume, Theme)
  - [x] WindowsSearch (PNG icons: Settings, Explorer, Terminal, VS Code, Chrome, PDF, Folder)
  - [x] WindowsContextMenu (SVG icons: View, Sort, Refresh, Paste, New, Display, Personalize, Theme)
- [x] Coherencia de iconos Windows vs macOS (iconos específicos por OS)
- [x] WindowsWindowWrapper - Modal de Windows 11 con estilo nativo
  - [x] Title bar con botones de control en la esquina superior derecha
  - [x] Botones minimize, maximize, close con estilo Windows 11
  - [x] Hover effect en close button (fondo rojo)
  - [x] Soporte para iconos de aplicación en title bar
  - [x] Draggable y animaciones con GSAP
- [x] Ventanas de Windows 11 con contenido específico
  - [x] Terminal Window (Skills con notepad icon)
  - [x] About Window (Perfil con file icon)
  - [x] Projects Window (Proyectos con projects icon)
  - [x] Contact Window (Contacto con user-folder icon)
  - [x] Experience Window (Experiencia con chrome icon)
  - [x] Gallery Window (Galería con folder-pictures icon)
- [ ] Widgets panel lateral (opcional)

### Fase 7: Polish & Optimización
- [ ] Performance optimization (LOD, lazy loading)
- [ ] Compresión de modelos (Draco)
- [ ] SEO meta tags + Open Graph
- [ ] Accesibilidad (a11y)
- [ ] Testing básico
- [ ] Animaciones mejoradas (Framer Motion)
- [ ] Micro-interacciones

### Fase 8: Deploy
- [ ] Build production
- [ ] Deploy a Vercel/Netlify
- [ ] Configurar dominio custom
- [ ] Analytics setup

---

## Dependencias Principales

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@react-three/fiber": "^9.0.0",
    "@react-three/drei": "^10.0.0",
    "three": "^0.170.0",
    "gsap": "^3.12.0",
    "zustand": "^5.0.0",
    "i18next": "^24.0.0",
    "react-i18next": "^15.0.0",
    "framer-motion": "^11.0.0",
    "tailwind-merge": "^2.0.0",
    "clsx": "^2.0.0",
    "react-countup": "^6.0.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "@vitejs/plugin-react-swc": "^3.0.0",
    "tailwindcss": "^4.0.0",
    "eslint": "^9.0.0",
    "prettier": "^3.0.0",
    "husky": "^9.0.0"
  }
}
```

---

## Recursos

### Documentación
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Drei](https://github.com/pmndrs/drei)
- [GSAP](https://greensock.com/docs/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [i18next](https://www.i18next.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Modelos 3D Gratuitos
- [Sketchfab](https://sketchfab.com/) - Modelos de oficina/escritorio
- [Poly Pizza](https://poly.pizza/) - Low poly assets
- [Kenney Assets](https://kenney.nl/assets)

### Inspiración
- [Bruno Simon](https://bruno-simon.com/)
- [Awwwards](https://www.awwwards.com/websites/3d/)
- [Three.js Journey](https://threejs-journey.com/)

---

## Notas Técnicas

- Si el 3D es muy pesado en mobile, implementar fallback 2D elegante
- Usar `Suspense` y `useProgress` de Drei para loading
- Implementar LOD (Level of Detail) para modelos complejos
- Comprimir modelos con Draco
- Precargar assets críticos
- Usar `useGLTF.preload()` para mejor UX

---

## Próximos Pasos

1. **Revisar repos de referencia** y elegir estilo visual
2. **Buscar/crear modelo 3D** de la habitación
3. **Iniciar setup del proyecto** con arquitectura definida

---

**Última actualización:** Febrero 2026

---

## ESTADO ACTUAL DEL PROYECTO (Feb 2026)

### ✅ Componentes Implementados

#### 1. **3D Scene Components**
```
src/presentation/three/models/
├── Badge3D.tsx          - Carnet 3D con física (Rapier)
├── GamingSetup.tsx      - Setup de escritorio con rotación animada
└── CTA Button 3D        - Integrado en Gaming Setup con rotación CSS
```

**Features:**
- Física realista con @react-three/rapier
- Rotación animada con useFrame
- Click handlers para transiciones
- CTA button sincronizado con rotación del setup

#### 2. **macOS Desktop UI**
```
src/presentation/pages/
└── DesktopView.tsx      - Escritorio macOS completo

src/presentation/components/desktop/
├── ControlCenter.tsx    - Panel de control (WiFi, Bluetooth, etc.)
├── CalendarDropdown.tsx - Calendario con navegación de meses
├── SpotlightSearch.tsx  - Búsqueda estilo Spotlight (Cmd+Space)
└── ContextMenu.tsx      - Menú contextual (click derecho)

src/presentation/features/
├── settings/components/Dock.tsx
├── skills/components/TerminalWindow.tsx
├── about/components/AboutWindow.tsx
├── projects/components/ProjectsWindow.tsx
├── contact/components/ContactWindow.tsx
├── experience/components/ExperienceWindow.tsx
└── gallery/components/GalleryWindow.tsx
```

**TopBar Features:**
- Reloj en tiempo real
- Apple logo
- Menú de navegación
- Batería 100%
- WiFi indicator
- Spotlight Search button
- Control Center button (grid icon)
- Fecha y hora (clickeable → calendario)

**Control Center:**
- WiFi toggle (azul activo)
- Bluetooth toggle (azul activo)
- AirDrop toggle (azul activo)
- Dark/Light Mode toggle (conectado a theme store)
- Stage Manager toggle
- Brightness slider
- Volume slider
- Perfil de usuario con avatar
- Separadores visuales entre secciones

**Calendar Dropdown:**
- Hora en tiempo real (segundos incluidos)
- Fecha completa en español
- Navegación entre meses (← →)
- Grid de días del mes
- Highlight del día actual
- Indicador de eventos

**Spotlight Search:**
- Búsqueda de apps/archivos
- Navegación con ↑↓ y Enter
- Sugerencias cuando vacío
- Cierre con Esc
- Keyboard shortcut: **Cmd/Ctrl + Space**
- Click outside to close

**Context Menu:**
- Click derecho en escritorio
- Nueva Carpeta
- Obtener Información
- Cambiar Fondo de Escritorio
- Usar Pilas
- Ordenar Por
- Limpiar
- Mostrar Opciones de Visualización
- Cambiar Tema (integrado)
- Shortcuts visuales (⌘, ⇧)

#### 3. **Window System**
```
src/application/store/
├── useWindowStore.ts    - Estado de ventanas (open, minimize, maximize, zIndex)
├── useThemeStore.ts     - Dark/Light mode con persistencia
└── useSceneStore.ts     - Navegación entre vistas (home, desktop)

src/presentation/components/layout/
└── WindowWrapper.tsx    - HOC para ventanas draggables
```

**Características:**
- Draggable con GSAP
- Maximize/Minimize/Close
- Z-index management (focus)
- Traffic lights (⚫🟡🟢)
- Resize handles
- Double-click title → maximize

#### 4. **Design System**
```
src/index.css            - Design tokens centralizados

Tokens implementados:
--space-1 a --space-12   (4px - 48px)
--text-xs a --text-5xl   (11px - 48px)
--icon-xs a --icon-3xl   (12px - 48px)
--radius-sm a --radius-full
--color-primary-50 a --color-primary-900
--duration-fast/normal/slow
--ease-default/bounce
```

**Theme Switching:**
- Dark mode (default)
- Light mode
- Persistencia con Zustand + localStorage
- Transiciones suaves
- data-theme attribute en HTML

### 📊 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| Componentes React | 40+ |
| Stores Zustand | 3 (theme, scene, window) |
| Ventanas Desktop | 6 |
| Modales/Dropdowns | 4 |
| Design Tokens | 80+ |
| Archivos TypeScript | 50+ |

### 🎨 Assets Actuales

```
public/
├── models/
│   ├── gaming-setup.glb     ✅ Setup de escritorio
│   ├── hacker-room.glb      ✅ Habitación (futuro)
│   └── animations/
├── images/
│   ├── folder.png
│   ├── safari.png
│   ├── finder.png
│   ├── photos.png
│   ├── terminal.png
│   ├── contact.png
│   ├── txt.png
│   ├── pdf.png
│   └── plain.png
└── icons/
    ├── github.svg
    └── linkedin.svg
```

### 🔄 Flujo de Navegación Actual

```
┌─────────────────────────────────────────────┐
│         LANDING PAGE (Hero 3D)              │
│  ┌────────────┐    ┌──────────────────┐    │
│  │  Badge 3D  │    │  Gaming Setup 3D │    │
│  │  (física)  │    │   (rotación)     │    │
│  └────────────┘    └──────────────────┘    │
│         │                    │              │
│         │         ┌──────────┴──────────┐   │
│         │         │  CTA Button 3D      │   │
│         │         │  (sincronizado)     │   │
│         │         └──────────┬──────────┘   │
│         │                    │              │
│         └────────────────────┘              │
│                     │                        │
│                 Click/Enter                  │
│                     ↓                        │
│         GSAP Transition (scale + opacity)   │
│                     ↓                        │
├─────────────────────────────────────────────┤
│            macOS DESKTOP VIEW               │
│  ┌────────────────────────────────────┐    │
│  │ TopBar (Clock, Spotlight, CC, Cal) │    │
│  ├────────────────────────────────────┤    │
│  │  ← Back   🗂️ Projects  📄 About    │    │
│  │           🗂️ Resume    🔗 GitHub    │    │
│  │           🔗 LinkedIn               │    │
│  ├────────────────────────────────────┤    │
│  │  💻 Macintosh HD    📂 Experience  │    │
│  │  💻 Skills          ✉️ Contact     │    │
│  ├────────────────────────────────────┤    │
│  │      [ Ventanas Flotantes ]        │    │
│  │  - Terminal (Skills)               │    │
│  │  - About (Profile)                 │    │
│  │  - Finder (Projects)               │    │
│  │  - Safari (Experience)             │    │
│  │  - Photos (Gallery)                │    │
│  │  - Contact (Info)                  │    │
│  └────────────────────────────────────┘    │
│  ┌────────────────────────────────────┐    │
│  │ Dock: 🗂️ 🌐 📸 🗑️                  │    │
│  └────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### 🎯 Windows 11 Mode - Estado Actual

#### ✅ Componentes Creados:
```
src/presentation/pages/
└── Windows11View.tsx      - Desktop completo de Windows 11

src/presentation/components/windows/
├── ActionCenter.tsx       - Configuración rápida (WiFi, Bluetooth, Brillo, Volumen)
├── NotificationCenter.tsx - Notificaciones + Calendario integrado
├── WindowsSearch.tsx      - Búsqueda tipo Windows (Ctrl+Space)
└── WindowsContextMenu.tsx - Menú contextual click derecho

src/application/store/
└── useOSStore.ts         - Toggle macOS ↔ Windows 11 con persistencia
```

#### 🔄 Componentes Integrados:
- **Taskbar**: Start, Search, OS Toggle (Apple icon), System Tray (WiFi, Volume, Battery), Clock
- **Start Menu**: Apps grid (12 apps), Recommended section, User profile
- **Keyboard Shortcuts**: Ctrl/Cmd+Space (Search), Esc (cerrar modales)
- **OS Toggle**: En Dock (macOS) y Taskbar (Windows 11)

#### 📋 Próximo a Implementar:

#### ✅ Features Implementadas:
1. **Start Menu** ✅
   - Apps grid 6x2 (12 apps: Edge, Explorer, Settings, Store, Terminal, Photos, Mail, Calendar, Music, VS Code, Chrome, Spotify)
   - Recommended section (2 items)
   - User profile con avatar en footer
   - Animación fade-in

2. **Taskbar** ✅
   - Centrado estilo Windows 11
   - Start button (4 cuadrados)
   - Search button
   - OS Toggle (Apple icon)
   - System tray (WiFi, Volume, Battery)
   - Clock con fecha y hora en tiempo real

3. **Action Center** ✅
   - Quick settings (WiFi, Bluetooth, Airplane Mode, Dark Mode, Battery, Focus)
   - Sliders (Brightness, Volume)
   - User profile + Settings button

4. **NotificationCenter** ✅
   - Notificaciones con mock data
   - Calendario con navegación de meses
   - Reloj en tiempo real
   - Highlight del día actual

5. **WindowsSearch** ✅
   - Búsqueda de apps/archivos
   - Navegación con ↑↓ Enter
   - Sugerencias cuando vacío
   - Keyboard shortcut: Ctrl/Cmd+Space

6. **WindowsContextMenu** ✅
   - Ver, Ordenar, Actualizar, Pegar
   - Nuevo (submenu)
   - Configuración de pantalla, Personalizar
   - Toggle de tema integrado

7. **OS Toggle** ✅
   - En Dock (macOS): Ícono Windows azul
   - En Taskbar (Windows 11): Ícono Apple
   - Persistencia con localStorage

#### ✅ Features Completadas (Windows 11):
1. **Desktop Icons** ✅
   - 9 iconos en escritorio (Volver, Projects, About, Resume, GitHub, LinkedIn, Skills, Contact, Experience)
   - Double-click para abrir ventanas o enlaces
   - Selección con click simple
   - Descarga de CV funcional

2. **Window Components** ✅
   - Terminal (Skills)
   - About (Profile)
   - Projects (Finder-style)
   - Contact (Información)
   - Experience (Safari-style)
   - Gallery (Photos-style)

3. **Start Menu Integration** ✅
   - 6 apps funcionales: Experiencia, Proyectos, Sobre Mí, Contacto, Skills, Galería
   - Click en app → abre ventana correspondiente
   - Cierra Start Menu automáticamente

#### 🔜 Opcional (Futuras Mejoras):
1. **Widgets Panel**
   - Panel lateral deslizable
   - Widgets de clima, calendario, proyectos destacados

2. **Snap Layouts**
   - Arrastrar ventanas a bordes
   - Layouts predefinidos (2 cols, 3 cols, grid)

#### Repos de Referencia:
- [programming-with-ia/windows-11](https://github.com/programming-with-ia/windows-11)
- [VrajVyas11/React_Windows_11](https://github.com/VrajVyas11/React_Windows_11)

---

## ANÁLISIS DE REPOS DE REFERENCIA

### 1. Badge 3D (Carnet Vercel) - `badge-3d/`

**Archivos Clave:**
- `app/page.tsx` - Componente principal del badge

**Tecnologías:**
```
@react-three/rapier (física)
  - useRopeJoint → lanyard que cuelga
  - useSphericalJoint → rotación del carnet
  - RigidBody, BallCollider, CuboidCollider
meshline → línea del lanyard
@react-three/drei → Text3D, RenderTexture, useGLTF
```

**Componente Band (lo que necesitamos):**
- Física realista con gravedad
- Arrastrable con mouse
- Material iridiscente (clearcoat, iridescence)
- Texto 3D personalizable
- Modelo GLB de Vercel: `https://assets.vercel.com/image/upload/.../tag.glb`

**Adaptar para tu portfolio:**
- Cambiar texto por tu nombre
- Añadir tu foto con RenderTexture
- Personalizar colores

---

### 2. Setup Dev 3D (Hacker Room) - `setup-dev-3d/`

**Archivos Clave:**
- `src/components/HackerRoom.jsx` - Modelo de la habitación
- `src/components/HeroCamera.jsx` - Cámara que sigue mouse
- `src/sections/Hero.jsx` - Sección hero con Canvas

**Modelos 3D Copiados:** ✅
```
public/models/
├── hacker-room.glb    ← PRINCIPAL (escritorio completo)
├── computer.glb
├── desk.glb
├── cube.glb
├── react.glb
└── animations/
    └── developer.glb  ← Avatar animado
```

**Texturas Copiadas:** ✅
```
public/textures/
├── desk/
│   ├── monitor.png    ← Textura del monitor
│   └── screen.png     ← Contenido de pantalla
├── project/
└── rings.png
```

**Características:**
- Responsive (mobile/tablet/desktop)
- Mouse tracking con easing (`maath`)
- Loader con Suspense
- Múltiples objetos flotantes (React logo, Cube, Rings)

---

### 3. macOS UI - `macos-ui/`

**Archivos Clave:**
- `src/components/Dock.jsx` - Dock con animación GSAP
- `src/hoc/WindowWrapper.jsx` - HOC para ventanas draggables
- `src/windows/Terminal.jsx` - Ventana de skills
- `src/store/window.js` - Zustand store para ventanas
- `src/constants/index.js` - Configuración de apps y datos

**Tecnologías:**
```
Zustand + Immer (state management)
GSAP + Draggable (animaciones y drag)
react-tooltip (tooltips)
lucide-react (iconos)
```

**Sistema de Ventanas:**
```javascript
// Store con Zustand
{
  windows: {
    finder: { isOpen, isMaximized, zIndex },
    terminal: { isOpen, isMaximized, zIndex },
    // ...
  },
  openWindow(key),
  closeWindow(key),
  focusWindow(key),
  toggleMaximizeWindow(key)
}
```

**Dock Animado (GSAP):**
- Iconos que escalan al hover
- Efecto de proximidad al mouse
- Tooltips con nombres

**Apps/Ventanas disponibles:**
| App | Uso en tu portfolio |
|-----|---------------------|
| Finder | Projects |
| Terminal | Skills/Tech Stack |
| Safari | Blog/Articles |
| Photos | Gallery |
| Contact | Formulario |
| Resume | CV/PDF |
| VSCode | Code samples |
| Music | Easter egg |

---

## ASSETS EXTRAÍDOS

```
portfolio-darkcodex/
├── public/
│   ├── models/
│   │   ├── hacker-room.glb      ✅ Copiado
│   │   ├── computer.glb         ✅ Copiado
│   │   ├── desk.glb             ✅ Copiado
│   │   ├── cube.glb             ✅ Copiado
│   │   ├── react.glb            ✅ Copiado
│   │   └── animations/
│   │       └── developer.glb    ✅ Copiado
│   └── textures/
│       ├── desk/                ✅ Copiado
│       ├── project/             ✅ Copiado
│       └── rings.png            ✅ Copiado
```

---

## PRÓXIMOS PASOS DE IMPLEMENTACIÓN

### Fase 1: Dependencias
```bash
npm install @react-three/fiber @react-three/drei @react-three/rapier three gsap @gsap/react zustand immer meshline maath react-responsive
```

### Fase 2: Componentes a Crear

1. **Badge3D.tsx** (adaptar de badge-3d)
   - Tu foto + nombre + título
   - Física de lanyard

2. **HackerRoom.tsx** (adaptar de setup-dev-3d)
   - Cargar hacker-room.glb
   - Texturas personalizadas

3. **HeroCamera.tsx** (copiar de setup-dev-3d)
   - Mouse tracking

4. **MacOSDesktop/** (adaptar de macos-ui)
   - Dock.tsx
   - WindowWrapper.tsx
   - Windows: Terminal, Finder, Contact, etc.
   - useWindowStore.ts

### Fase 3: Flujo del Portfolio

```
[Badge 3D] → click → [Hacker Room 3D] → click monitor → [macOS UI]
     │                      │                              │
   Tu foto              Escritorio                    Ventanas
   Nombre               Monitor                       - Projects
   Título               Silla                         - Skills
                        Accesorios                    - Contact
                                                      - Resume
```
