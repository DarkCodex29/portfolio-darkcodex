# 🚀 Portfolio DarkCodex - Gianpierre Collazos

Portfolio 3D interactivo con sistema dual OS (macOS + Windows 11). Experiencia inmersiva construida con React 19, Three.js y arquitectura enterprise.

[![Deploy Status](https://img.shields.io/badge/deploy-ready-brightgreen)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)]()
[![React](https://img.shields.io/badge/React-19.0-61dafb)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

## ✨ Características

- 🎮 **Escena 3D Interactiva** - Gaming setup realista con transición animada
- 💻 **Dual OS System** - Toggle instantáneo entre macOS y Windows 11
- 🎨 **Design System Profesional** - Blue theme con dark/light mode
- 🌐 **Theme Toggle Global** - Accesible desde cualquier pantalla
- 📱 **SEO Optimizado** - Meta tags, Open Graph, Schema.org
- ⚡ **Performance** - Build optimizado (3.86 MB gzipped: 1.31 MB)

## 🛠️ Stack Tecnológico

```
React 19.0.0        - UI Library
TypeScript 5.7      - Type Safety
Vite 6.0            - Build Tool
Three.js + R3F      - 3D Graphics
GSAP                - Animations
Zustand             - State Management
Tailwind CSS 4      - Styling
```

## 🏗️ Arquitectura

Clean Architecture con 4 capas:
- **Domain** - Entities, interfaces, constants
- **Application** - Use cases, stores, services
- **Infrastructure** - APIs, storage, repositories
- **Presentation** - React components, hooks

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/DarkCodex29/portfolio-darkcodex.git
cd portfolio-darkcodex

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🚢 Deploy

Ver instrucciones detalladas en [DEPLOY.md](./DEPLOY.md)

### Deploy rápido en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📁 Estructura del Proyecto

```
portfolio-darkcodex/
├── public/                  # Assets estáticos
│   ├── models/             # Modelos 3D (.glb)
│   ├── icons/              # Iconos macOS/Windows11
│   ├── images/             # Imágenes
│   ├── robots.txt          # SEO
│   └── sitemap.xml         # SEO
├── src/
│   ├── core/               # Domain layer
│   │   ├── constants/      # Configuraciones
│   │   └── types/          # Type definitions
│   ├── application/        # Application layer
│   │   └── store/          # Zustand stores
│   ├── infrastructure/     # Infrastructure layer
│   │   └── storage/        # Local storage
│   └── presentation/       # Presentation layer
│       ├── components/     # React components
│       ├── features/       # Feature modules
│       ├── pages/          # Page components
│       └── three/          # 3D components
├── PLAN.md                 # Project roadmap
├── TODO.md                 # Task list
└── DEPLOY.md               # Deploy instructions
```

## 🎯 Features Principales

### Sistema Dual OS
- **macOS**: TopBar, Dock animado, Spotlight Search, Control Center, Calendar
- **Windows 11**: Taskbar, Start Menu, Search, Action Center, Notifications

### Ventanas Funcionales
- **Terminal** - Tech stack completo con experiencia
- **About** - Perfil profesional con estadísticas
- **Projects** - 6 proyectos destacados con detalles
- **Contact** - Email, teléfono, redes sociales
- **Experience** - Timeline de experiencia laboral
- **Gallery** - Galería de proyectos visuales

## 🎨 Design System

### Paleta de Colores
```css
Primary Blue:   #3b82f6
Accent Cyan:    #06b6d4
Accent Teal:    #14b8a6
Dark Base:      #0a0a0f
Light Base:     #f8fafc
```

### Sistema de Espaciado (4px base)
```css
--space-1: 0.25rem  (4px)   --space-6: 1.5rem   (24px)
--space-2: 0.5rem   (8px)   --space-8: 2rem     (32px)
--space-4: 1rem     (16px)  --space-12: 3rem    (48px)
```

## 📊 Estado del Proyecto

**Versión:** 1.0.0-rc1 (Release Candidate 1)
**Progreso:** 92% completado
**Estado:** ✅ Listo para deploy desktop

Ver [PLAN.md](./PLAN.md) para roadmap completo y [TODO.md](./TODO.md) para tareas pendientes.

## 🔜 Roadmap

### v1.0 - Launch (Actual)
- [x] Escena 3D interactiva
- [x] Dual OS system completo
- [x] 6 ventanas funcionales
- [x] Dark/Light mode
- [x] SEO optimization
- [ ] Deploy a producción

### v1.1 - Mobile (Próximo)
- [ ] Android mode
- [ ] iOS mode
- [ ] Responsive design
- [ ] Touch gestures

### v1.2 - Performance (Futuro)
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Bundle < 3MB
- [ ] Lighthouse score > 90

### v1.3 - Features (Futuro)
- [ ] Contact form
- [ ] Blog section
- [ ] i18n (English)
- [ ] Project gallery con screenshots

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo (http://localhost:5173)
npm run build        # Build producción
npm run preview      # Preview del build
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

## 🤝 Contribuciones

Este es un proyecto personal de portfolio. No se aceptan contribuciones externas.

## 📄 Licencia

Copyright © 2026 Gianpierre Sair Collazos Mio. Todos los derechos reservados.

## 📧 Contacto

- **Email**: gianxs296@gmail.com
- **LinkedIn**: [linkedin.com/in/gianpierre-mio](https://linkedin.com/in/gianpierre-mio)
- **GitHub**: [github.com/DarkCodex29](https://github.com/DarkCodex29)
- **Portfolio**: [giancodex.com](https://giancodex.com) (próximamente)

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**

Hecho con ❤️ usando React, Three.js y mucho café ☕
