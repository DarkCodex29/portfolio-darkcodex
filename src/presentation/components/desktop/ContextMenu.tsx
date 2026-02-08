import { memo, useEffect, useRef } from 'react'
import { useThemeStore } from '@/application/store/useThemeStore'

interface ContextMenuProps {
  isOpen: boolean
  position: { x: number; y: number }
  onClose: () => void
  onAction: (action: string) => void
}

interface MenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  shortcut?: string
  divider?: boolean
  disabled?: boolean
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'new-folder',
    label: 'Nueva Carpeta',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
    shortcut: '⇧⌘N'
  },
  { id: 'divider-1', label: '', divider: true },
  {
    id: 'get-info',
    label: 'Obtener Información',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    shortcut: '⌘I'
  },
  {
    id: 'change-wallpaper',
    label: 'Cambiar Fondo de Escritorio',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  { id: 'divider-2', label: '', divider: true },
  {
    id: 'use-stacks',
    label: 'Usar Pilas',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: 'sort-by',
    label: 'Ordenar Por',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    )
  },
  {
    id: 'clean-up',
    label: 'Limpiar',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    )
  },
  { id: 'divider-3', label: '', divider: true },
  {
    id: 'show-view-options',
    label: 'Mostrar Opciones de Visualización',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    shortcut: '⌘J'
  },
  { id: 'divider-4', label: '', divider: true },
  {
    id: 'toggle-theme',
    label: 'Cambiar Tema',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  }
]

export const ContextMenu = memo(({ isOpen, position, onClose, onAction }: ContextMenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { toggleTheme } = useThemeStore()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return

    if (item.id === 'toggle-theme') {
      toggleTheme()
    }

    onAction(item.id)
    onClose()
  }

  if (!isOpen) return null

  const menuStyle = {
    left: Math.min(position.x, window.innerWidth - 250),
    top: Math.min(position.y, window.innerHeight - 400)
  }

  return (
    <div
      ref={containerRef}
      className="fixed bg-black/60 backdrop-blur-2xl rounded-lg border border-white/10 shadow-2xl z-[150] animate-fade-in overflow-hidden"
      style={{ ...menuStyle, minWidth: '220px' }}
    >
      <div style={{ padding: 'var(--space-1)' }}>
        {MENU_ITEMS.map((item) => {
          if (item.divider) {
            return (
              <div
                key={item.id}
                className="h-px bg-white/10 my-1 mx-2"
              />
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={`w-full flex items-center gap-3 rounded-md transition-colors ${
                item.disabled
                  ? 'text-white/30 cursor-not-allowed'
                  : 'text-white/90 hover:bg-primary-500/40'
              }`}
              style={{ padding: 'var(--space-2) var(--space-3)' }}
            >
              {item.icon && (
                <span className="text-white/60">{item.icon}</span>
              )}
              <span className="flex-1 text-left" style={{ fontSize: 'var(--text-sm)' }}>
                {item.label}
              </span>
              {item.shortcut && (
                <span className="text-white/40" style={{ fontSize: 'var(--text-xs)' }}>
                  {item.shortcut}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
})
ContextMenu.displayName = 'ContextMenu'

export default ContextMenu
