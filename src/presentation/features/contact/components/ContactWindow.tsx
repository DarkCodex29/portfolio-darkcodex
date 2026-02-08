import { memo } from 'react'
import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'
import { PROFILE } from '@/core/constants/profile'
import { t } from '@/core/constants/translations'

const ContactContent = memo(() => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--window-gap)' }}>
    <div className="text-center">
      <h2 className="text-xl font-bold text-white" style={{ marginBottom: 'var(--spacing-sm)' }}>
        {t.windows.contact.header}
      </h2>
      <p className="text-gray-400 text-sm">{t.windows.contact.subtitle}</p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <a
        href={`mailto:${PROFILE.contact.email}`}
        className="flex items-center bg-white/5 hover:bg-white/10 transition-colors group"
        style={{
          gap: 'var(--spacing-md)',
          padding: 'var(--card-padding)',
          borderRadius: 'var(--card-border-radius)'
        }}
      >
        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
          <Mail className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <p className="text-gray-400 text-xs">{t.windows.contact.email}</p>
          <p className="text-white group-hover:text-purple-400 transition-colors">
            {PROFILE.contact.email}
          </p>
        </div>
      </a>

      <a
        href={`tel:${PROFILE.contact.phone.replace(/\s/g, '')}`}
        className="flex items-center bg-white/5 hover:bg-white/10 transition-colors group"
        style={{
          gap: 'var(--spacing-md)',
          padding: 'var(--card-padding)',
          borderRadius: 'var(--card-border-radius)'
        }}
      >
        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
          <Phone className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <p className="text-gray-400 text-xs">{t.windows.contact.phone}</p>
          <p className="text-white group-hover:text-green-400 transition-colors">
            {PROFILE.contact.phone}
          </p>
        </div>
      </a>

      <div
        className="flex items-center bg-white/5"
        style={{
          gap: 'var(--spacing-md)',
          padding: 'var(--card-padding)',
          borderRadius: 'var(--card-border-radius)'
        }}
      >
        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <p className="text-gray-400 text-xs">{t.windows.contact.location}</p>
          <p className="text-white">{t.windows.about.location}</p>
        </div>
      </div>
    </div>

    <div className="flex justify-center" style={{ gap: 'var(--spacing-md)', paddingTop: 'var(--spacing-sm)' }}>
      <a
        href={PROFILE.contact.github}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
        style={{ borderRadius: 'var(--card-border-radius)' }}
      >
        <Github className="w-6 h-6 text-white" />
      </a>
      <a
        href={PROFILE.contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
        style={{ borderRadius: 'var(--card-border-radius)' }}
      >
        <Linkedin className="w-6 h-6 text-white" />
      </a>
    </div>

    <div className="border-t border-white/10" style={{ paddingTop: 'var(--spacing-lg)' }}>
      <p className="text-gray-400 text-xs text-center">{t.windows.contact.languages}</p>
    </div>
  </div>
))
ContactContent.displayName = 'ContactContent'

export const ContactWindow = memo(() => (
  <WindowWrapper windowKey="contact" title={t.windows.contact.title} className="w-[400px]">
    <ContactContent />
  </WindowWrapper>
))
ContactWindow.displayName = 'ContactWindow'

export default ContactWindow
