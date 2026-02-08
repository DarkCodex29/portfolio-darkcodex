import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'

const ContactContent = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">Get in Touch</h2>
        <p className="text-gray-400 text-sm">
          Open for freelance projects and full-time opportunities
        </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-3">
        <a
          href="mailto:gianxs296@gmail.com"
          className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
        >
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Email</p>
            <p className="text-white group-hover:text-purple-400 transition-colors">
              gianxs296@gmail.com
            </p>
          </div>
        </a>

        <a
          href="tel:+51952164832"
          className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
        >
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <Phone className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Phone</p>
            <p className="text-white group-hover:text-green-400 transition-colors">
              +51 952 164 832
            </p>
          </div>
        </a>

        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Location</p>
            <p className="text-white">Chiclayo, Perú</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex gap-3 justify-center pt-2">
        <a
          href="https://github.com/gianxs296"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center transition-colors"
        >
          <Github className="w-6 h-6 text-white" />
        </a>
        <a
          href="https://linkedin.com/in/gianpierre-collazos"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-colors"
        >
          <Linkedin className="w-6 h-6 text-white" />
        </a>
      </div>

      {/* Languages */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-gray-400 text-xs text-center">
          🇪🇸 Español (Nativo) · 🇺🇸 English (B2)
        </p>
      </div>
    </div>
  )
}

export const ContactWindow = () => {
  return (
    <WindowWrapper windowKey="contact" title="Contact" className="w-[400px]">
      <ContactContent />
    </WindowWrapper>
  )
}

export default ContactWindow
