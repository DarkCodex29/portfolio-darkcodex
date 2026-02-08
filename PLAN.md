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

### Fase 1: Setup & Arquitectura Base
- [ ] Inicializar proyecto con Vite + React 19 + TypeScript
- [ ] Configurar estructura de carpetas (Clean Architecture)
- [ ] Setup ESLint + Prettier + Husky
- [ ] Configurar Tailwind CSS 4
- [ ] Instalar React Three Fiber + Drei
- [ ] Configurar Zustand stores
- [ ] Configurar i18next
- [ ] Setup path aliases (@core, @infrastructure, etc.)

### Fase 2: Escena 3D Base
- [ ] Seleccionar/crear modelo de habitación en Blender
- [ ] Implementar Scene component con Canvas
- [ ] Configurar luces (ambient, directional, point)
- [ ] Implementar CameraController
- [ ] Cargar modelo GLB/GLTF
- [ ] Animación de entrada

### Fase 3: Interactividad 3D
- [ ] Implementar raycasting para clicks
- [ ] Click en monitor → zoom animado (GSAP)
- [ ] Transición 3D → contenido 2D
- [ ] Hover effects en objetos
- [ ] Responsive camera positions

### Fase 4: Contenido del Portfolio
- [ ] Hero section (overlay sobre 3D)
- [ ] About section
- [ ] Skills visualization (barras/radar chart)
- [ ] Experience timeline
- [ ] Projects showcase con modales
- [ ] Achievements con animaciones CountUp
- [ ] Contact form

### Fase 5: Features Core
- [ ] Dark/Light mode con persistencia
- [ ] i18n (ES/EN) completo
- [ ] Responsive design (breakpoints)
- [ ] Loading screen con progreso
- [ ] Fallback 2D para mobile si necesario

### Fase 6: Polish & Optimización
- [ ] Performance optimization (LOD, lazy loading)
- [ ] Compresión de modelos (Draco)
- [ ] SEO meta tags + Open Graph
- [ ] Accesibilidad (a11y)
- [ ] Testing básico

### Fase 7: Deploy
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
