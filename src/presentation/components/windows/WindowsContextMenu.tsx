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
  icon?: string
  shortcut?: string
  divider?: boolean
}

const newIcon = '➕'
const viewIcon = '👁️'
const sortIcon = '🔀'
const refreshIcon = '🔄'
const pasteIcon = '📋'
const personalizeIcon = '🎨'
const displayIcon = '🖥️'
const themeIcon = '🌙'

export const WindowsContextMenu = memo(({ isOpen, position, onClose }: WindowsContextMenuProps) => {
  const { theme, toggleTheme } = useThemeStore()

  const MENU_ITEMS: MenuItem[] = [
    { id: 'view', label: 'Ver', icon: viewIcon },
    { id: 'sort', label: 'Ordenar por', icon: sortIcon },
    { id: 'refresh', label: 'Actualizar', icon: refreshIcon },
    { id: 'divider-1', label: '', divider: true },
    { id: 'paste', label: 'Pegar', icon: pasteIcon, shortcut: 'Ctrl+V' },
    { id: 'divider-2', label: '', divider: true },
    { id: 'new', label: 'Nuevo', icon: newIcon },
    { id: 'divider-3', label: '', divider: true },
    { id: 'display', label: 'Configuración de pantalla', icon: displayIcon },
    { id: 'personalize', label: 'Personalizar', icon: personalizeIcon },
    { id: 'toggle-theme', label: `Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`, icon: themeIcon },
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
                {item.icon && <span className="text-base">{item.icon}</span>}
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
