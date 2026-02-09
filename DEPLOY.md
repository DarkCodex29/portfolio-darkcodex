# 🚀 Guía de Deploy - Portfolio DarkCodex

Esta guía te llevará paso a paso para deployar tu portfolio en producción usando Vercel.

## 📋 Pre-requisitos

- [x] Código completo y funcionando localmente
- [x] Meta tags SEO agregados
- [x] robots.txt y sitemap.xml creados
- [ ] Cuenta en GitHub (para versión control)
- [ ] Cuenta en Vercel (gratis)
- [ ] Favicons generados (opcional pero recomendado)

---

## 🎯 Opción 1: Deploy Directo desde GitHub (Recomendado)

### Paso 1: Subir código a GitHub

```bash
# Si aún no has inicializado git
git init

# Agregar .gitignore si no existe
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnpm-store/

# Build output
dist/
build/

# Environment
.env
.env.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
EOF

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "feat: initial portfolio setup - ready for production

- 3D interactive scene with gaming setup
- Dual OS system (macOS + Windows 11)
- 6 functional windows
- Dark/Light mode with global toggle
- Professional blue theme
- SEO optimized
- Ready for deploy"

# Crear repositorio en GitHub
# Ve a https://github.com/new
# Nombre sugerido: portfolio-darkcodex
# Descripción: "3D Interactive Portfolio with Dual OS System"
# Público o Privado (tu elección)

# Conectar con el repositorio remoto
git remote add origin https://github.com/TU-USUARIO/portfolio-darkcodex.git
git branch -M main
git push -u origin main
```

### Paso 2: Deploy en Vercel

1. **Ir a Vercel**
   - Visita https://vercel.com
   - Click en "Sign Up" o "Login"
   - Elige "Continue with GitHub"

2. **Importar Proyecto**
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio `portfolio-darkcodex`
   - Click en "Import"

3. **Configurar Proyecto**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Variables de Entorno** (si aplica)
   - Por ahora no necesitas ninguna
   - En el futuro puedes agregar:
     - `VITE_GA_TRACKING_ID` (Google Analytics)
     - `VITE_API_URL` (si agregas backend)

5. **Deploy**
   - Click en "Deploy"
   - Espera 2-3 minutos
   - ✅ Tu sitio estará en: `https://portfolio-darkcodex.vercel.app`

---

## 🌐 Opción 2: Deploy con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login en Vercel
vercel login

# Deploy
vercel

# Responder las preguntas:
# ? Set up and deploy? Yes
# ? Which scope? [Tu cuenta]
# ? Link to existing project? No
# ? What's your project's name? portfolio-darkcodex
# ? In which directory is your code located? ./
# ? Want to modify these settings? No

# Primer deploy (preview)
# Vercel te dará una URL temporal

# Deploy a producción
vercel --prod
```

---

## 🔧 Configuración de Dominio Custom

### Opción A: Comprar Dominio en Vercel

1. En tu proyecto en Vercel → Settings → Domains
2. Click en "Buy a domain"
3. Busca disponibilidad (sugerencias):
   - `giancodex.com`
   - `gianpierre.dev`
   - `darkcodex.dev`
4. Completa la compra ($15-20 USD/año)
5. DNS se configura automáticamente ✅

### Opción B: Usar Dominio Existente

1. En tu proyecto en Vercel → Settings → Domains
2. Click en "Add"
3. Ingresa tu dominio: `tudominio.com`
4. Vercel te dará registros DNS para configurar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Ve a tu proveedor de dominio (GoDaddy, Namecheap, etc.)
6. Agrega los registros DNS
7. Espera 24-48h para propagación completa
8. ✅ SSL automático con Let's Encrypt

---

## 📊 Post-Deploy: Configurar Analytics

### Google Analytics 4

1. **Crear Propiedad**
   - Ve a https://analytics.google.com
   - Admin → Create Property
   - Nombre: "Portfolio DarkCodex"
   - Timezone: Peru (GMT-5)
   - Industry: Technology
   - Create → Web Stream

2. **Obtener Measurement ID**
   - Copia tu `G-XXXXXXXXXX`

3. **Agregar al Proyecto**

   Crear archivo `src/utils/analytics.ts`:
   ```typescript
   export const initGA = () => {
     const script = document.createElement('script')
     script.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`
     script.async = true
     document.head.appendChild(script)

     window.dataLayer = window.dataLayer || []
     function gtag(...args: any[]) {
       window.dataLayer.push(args)
     }
     gtag('js', new Date())
     gtag('config', 'G-XXXXXXXXXX')
   }
   ```

   En `src/main.tsx`:
   ```typescript
   import { initGA } from './utils/analytics'

   // Después del ReactDOM.createRoot
   if (import.meta.env.PROD) {
     initGA()
   }
   ```

4. **Deploy Cambios**
   ```bash
   git add .
   git commit -m "feat: add Google Analytics tracking"
   git push
   ```

---

## ✅ Checklist Post-Deploy

### Inmediato (Día 1)
- [ ] Verificar que el sitio carga correctamente
- [ ] Probar en Chrome, Firefox, Safari
- [ ] Verificar que todas las ventanas abren
- [ ] Probar dark/light mode toggle
- [ ] Verificar que CV se descarga
- [ ] Probar links a GitHub/LinkedIn
- [ ] Verificar favicons en diferentes dispositivos

### SEO Validation (Día 2-3)
- [ ] Google Search Console
  - Agregar propiedad
  - Verificar ownership
  - Submit sitemap
- [ ] Bing Webmaster Tools
- [ ] Probar meta tags con:
  - https://www.opengraph.xyz/
  - https://cards-dev.twitter.com/validator
- [ ] Lighthouse audit (score > 90)

### Monitoring (Semana 1)
- [ ] Configurar Google Analytics
- [ ] Configurar Sentry para error tracking (opcional)
- [ ] Monitorear métricas:
  - Page views
  - Bounce rate
  - Average session duration
  - CV downloads

---

## 🔄 Workflow de Actualización

Después del deploy inicial, para actualizar:

```bash
# Hacer cambios en el código
# ...

# Commit y push
git add .
git commit -m "feat: descripción del cambio"
git push

# Vercel auto-deploy en segundos ✅
# No necesitas hacer nada más!
```

---

## 🐛 Troubleshooting

### Build falla en Vercel

```bash
# Verificar que build funciona localmente
npm run build

# Si hay errores de TypeScript
npm run type-check

# Si hay errores de dependencias
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Sitio no carga después de deploy

1. Vercel Dashboard → Deployment → View Function Logs
2. Buscar errores en la consola
3. Verificar que `dist/index.html` existe

### Dominio custom no funciona

1. Verificar DNS con: https://dnschecker.org
2. Esperar 24-48h para propagación
3. Revisar que los registros sean exactos
4. Contact Vercel support si persiste

---

## 📈 Optimizaciones Futuras

### Performance
- [ ] Lazy load de ventanas
- [ ] Image optimization (WebP)
- [ ] Code splitting
- [ ] Service Worker para PWA

### Features
- [ ] Contact form con EmailJS
- [ ] Blog section
- [ ] Project gallery con screenshots
- [ ] Testimonials

### Analytics
- [ ] Heatmaps (Hotjar)
- [ ] User recordings
- [ ] A/B testing

---

## 🎉 Deploy Completado!

Tu portfolio está ahora en producción! 🚀

**Siguiente pasos recomendados:**
1. Compartir en LinkedIn
2. Actualizar tu GitHub README con el link
3. Agregar a tu firma de email
4. Compartir en comunidades de desarrolladores

---

## 📞 Soporte

Si tienes problemas:
- Vercel Discord: https://vercel.com/discord
- Vercel Docs: https://vercel.com/docs

---

**¡Felicitaciones por tu deploy! 🎊**
