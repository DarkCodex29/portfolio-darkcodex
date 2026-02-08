import { memo } from 'react'
import { useThemeStore } from '@/application/store/useThemeStore'

interface WindowsContextMenuProps {
  isOpen: boolean
  position: { x: number; y: number }
  onClose: () => void
}

interface MenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  shortcut?: string
  divider?: boolean
}

const baseIcons = {
  new: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>,
  view: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>,
  sort: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>,
  refresh: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>,
  paste: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>,
  personalize: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>,
  display: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/></svg>,
  themeDark: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54s-2.94 8.27-7 9.54c.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/></svg>,
  themeLight: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>,
}

export const WindowsContextMenu = memo(({ isOpen, position, onClose }: WindowsContextMenuProps) => {
  const { theme, toggleTheme } = useThemeStore()

  const MENU_ITEMS: MenuItem[] = [
    { id: 'view', label: 'Ver', icon: baseIcons.view },
    { id: 'sort', label: 'Ordenar por', icon: baseIcons.sort },
    { id: 'refresh', label: 'Actualizar', icon: baseIcons.refresh },
    { id: 'divider-1', label: '', divider: true },
    { id: 'paste', label: 'Pegar', icon: baseIcons.paste, shortcut: 'Ctrl+V' },
    { id: 'divider-2', label: '', divider: true },
    { id: 'new', label: 'Nuevo', icon: baseIcons.new },
    { id: 'divider-3', label: '', divider: true },
    { id: 'display', label: 'Configuración de pantalla', icon: baseIcons.display },
    { id: 'personalize', label: 'Personalizar', icon: baseIcons.personalize },
    { id: 'toggle-theme', label: `Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`, icon: theme === 'dark' ? baseIcons.themeDark : baseIcons.themeLight },
  ]

  const handleItemClick = (id: string) => {
    if (id === 'toggle-theme') {
      toggleTheme()
    } else {
      console.log('Menu item clicked:', id)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-[70]" onClick={onClose} />
      <div
        className="fixed bg-black/60 backdrop-blur-3xl rounded-lg border border-white/10 shadow-2xl z-[80] min-w-[280px] animate-fade-in overflow-hidden"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div style={{ padding: 'var(--space-1)' }}>
          {MENU_ITEMS.map((item) =>
            item.divider ? (
              <div key={item.id} className="h-px bg-white/10 my-1" />
            ) : (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors text-left"
              >
                {item.icon && <span className="text-white flex-shrink-0">{item.icon}</span>}
                <span className="flex-1 text-white text-sm">{item.label}</span>
                {item.shortcut && (
                  <span className="text-white/50 text-xs">{item.shortcut}</span>
                )}
              </button>
            )
          )}
        </div>
      </div>
    </>
  )
})
WindowsContextMenu.displayName = 'WindowsContextMenu'

export default WindowsContextMenu
