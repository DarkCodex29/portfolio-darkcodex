import { memo } from 'react'
import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react'
import { PROFILE } from '@/core/constants/profile'
import { t } from '@/core/constants/translations'

const ContactContent = memo(() => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--window-gap)' }}>
    <div className="text-center">
      <h2 className="font-bold text-white" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
        {t.windows.contact.header}
      </h2>
      <p className="text-gray-400" style={{ fontSize: 'var(--text-sm)' }}>{t.windows.contact.subtitle}</p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <a
        href={`mailto:${PROFILE.contact.email}`}
        className="flex items-center bg-white/5 hover:bg-white/10 transition-colors group"
        style={{
          gap: 'var(--space-3)',
          padding: 'var(--card-padding)',
          borderRadius: 'var(--card-radius)'
        }}
      >
        <div
          className="bg-purple-500/20 flex items-center justify-center"
          style={{ width: 'var(--icon-2xl)', height: 'var(--icon-2xl)', borderRadius: 'var(--radius-md)' }}
        >
          <Mail style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} className="text-purple-400" />
        </div>
        <div>
          <p className="text-gray-400" style={{ fontSize: 'var(--text-xs)' }}>{t.windows.contact.email}</p>
          <p className="text-white group-hover:text-purple-400 transition-colors" style={{ fontSize: 'var(--text-base)' }}>
            {PROFILE.contact.email}
          </p>
        </div>
      </a>

      <a
        href={`tel:${PROFILE.contact.phone.replace(/\s/g, '')}`}
        className="flex items-center bg-white/5 hover:bg-white/10 transition-colors group"
        style={{
          gap: 'var(--space-3)',
          padding: 'var(--card-padding)',
          borderRadius: 'var(--card-radius)'
        }}
      >
        <div
          className="bg-green-500/20 flex items-center justify-center"
          style={{ width: 'var(--icon-2xl)', height: 'var(--icon-2xl)', borderRadius: 'var(--radius-md)' }}
        >
          <Phone style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} className="text-green-400" />
        </div>
        <div>
          <p className="text-gray-400" style={{ fontSize: 'var(--text-xs)' }}>{t.windows.contact.phone}</p>
          <p className="text-white group-hover:text-green-400 transition-colors" style={{ fontSize: 'var(--text-base)' }}>
            {PROFILE.contact.phone}
          </p>
        </div>
      </a>

      <div
        className="flex items-center bg-white/5"
        style={{
          gap: 'var(--space-3)',
          padding: 'var(--card-padding)',
          borderRadius: 'var(--card-radius)'
        }}
      >
        <div
          className="bg-blue-500/20 flex items-center justify-center"
          style={{ width: 'var(--icon-2xl)', height: 'var(--icon-2xl)', borderRadius: 'var(--radius-md)' }}
        >
          <MapPin style={{ width: 'var(--icon-md)', height: 'var(--icon-md)' }} className="text-blue-400" />
        </div>
        <div>
          <p className="text-gray-400" style={{ fontSize: 'var(--text-xs)' }}>{t.windows.contact.location}</p>
          <p className="text-white" style={{ fontSize: 'var(--text-base)' }}>{t.windows.about.location}</p>
        </div>
      </div>
    </div>

    <div className="flex justify-center" style={{ gap: 'var(--space-3)', paddingTop: 'var(--space-2)' }}>
      <a
        href={PROFILE.contact.github}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
        style={{ width: 'var(--icon-3xl)', height: 'var(--icon-3xl)', borderRadius: 'var(--radius-lg)' }}
      >
        <Github style={{ width: 'var(--icon-lg)', height: 'var(--icon-lg)' }} className="text-white" />
      </a>
      <a
        href={PROFILE.contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
        style={{ width: 'var(--icon-3xl)', height: 'var(--icon-3xl)', borderRadius: 'var(--radius-lg)' }}
      >
        <Linkedin style={{ width: 'var(--icon-lg)', height: 'var(--icon-lg)' }} className="text-white" />
      </a>
    </div>

    <div className="border-t border-white/10" style={{ paddingTop: 'var(--space-4)' }}>
      <p className="text-gray-400 text-center" style={{ fontSize: 'var(--text-xs)' }}>{t.windows.contact.languages}</p>
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
