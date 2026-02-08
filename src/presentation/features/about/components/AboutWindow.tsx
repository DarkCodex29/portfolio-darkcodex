import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'

const stats = [
  { label: 'Years Experience', value: '6+' },
  { label: 'Apps in Production', value: '10+' },
  { label: 'Active Users', value: '10K+' },
  { label: 'GitHub Repos', value: '50+' },
]

const AboutContent = () => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl">
          👨‍💻
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Gianpierre Sair Collazos Mio</h2>
          <p className="text-purple-400 font-medium">Senior Mobile Engineer | Full Stack Developer</p>
          <p className="text-gray-400 text-sm mt-1">📍 Chiclayo, Perú</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
        <p>
          Senior Mobile Engineer especializado en <span className="text-purple-400">Flutter</span> y{' '}
          <span className="text-purple-400">Kotlin</span> con +6 años desarrollando aplicaciones
          enterprise escalables para sectores críticos.
        </p>
        <p>
          Full Stack Developer con expertise en arquitecturas end-to-end:{' '}
          <span className="text-blue-400">.NET, NestJS, Angular, React, Laravel</span>.
        </p>
        <p>
          Experiencia comprobada en <span className="text-green-400">Keola Networks (fintech)</span>,{' '}
          <span className="text-green-400">Software Engineering LATAM</span>,{' '}
          <span className="text-green-400">Grupo EBIM</span>, y proyectos enterprise con integración de IA.
        </p>
      </div>

      {/* Industries */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-2">Sectores de Experiencia</h3>
        <div className="flex flex-wrap gap-2">
          {['Fintech', 'Salud', 'Minería', 'Retail', 'Agroindustrial', 'Farmacéutico', 'Textil', 'Químico'].map(
            (sector) => (
              <span
                key={sector}
                className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
              >
                {sector}
              </span>
            )
          )}
        </div>
      </div>

      {/* Contact Links */}
      <div className="flex gap-3 pt-2">
        <a
          href="mailto:gianxs296@gmail.com"
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-sm transition-colors"
        >
          ✉️ Email
        </a>
        <a
          href="https://github.com/gianxs296"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors"
        >
          🔗 GitHub
        </a>
        <a
          href="https://linkedin.com/in/gianpierre-collazos"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors"
        >
          💼 LinkedIn
        </a>
      </div>
    </div>
  )
}

export const AboutWindow = () => {
  return (
    <WindowWrapper windowKey="about" title="About Me" className="w-[550px]">
      <AboutContent />
    </WindowWrapper>
  )
}

export default AboutWindow
