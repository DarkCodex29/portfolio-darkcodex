import { memo, useState, useRef, useEffect, useMemo } from 'react'
import { useWindowStore } from '@/application/store/useWindowStore'
import { DESKTOP_ICONS, SIDEBAR_ICONS } from '@/core/constants/desktop'

interface SpotlightSearchProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  id: string
  name: string
  type: 'app' | 'file' | 'link' | 'action'
  icon: React.ReactNode
  action: () => void
}

const SearchResultItem = memo(({
  result,
  isSelected,
  onClick
}: {
  result: SearchResult
  isSelected: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 rounded-lg transition-colors ${
      isSelected ? 'bg-primary-500/30' : 'hover:bg-white/10'
    }`}
    style={{ padding: 'var(--space-2) var(--space-3)' }}
  >
    <div className="w-8 h-8 flex items-center justify-center">
      {result.icon}
    </div>
    <div className="flex-1 text-left">
      <p className="text-white font-medium" style={{ fontSize: 'var(--text-sm)' }}>
        {result.name}
      </p>
      <p className="text-white/50" style={{ fontSize: 'var(--text-xs)' }}>
        {result.type === 'app' ? 'Aplicación' :
         result.type === 'file' ? 'Archivo' :
         result.type === 'link' ? 'Enlace' : 'Acción'}
      </p>
    </div>
    {isSelected && (
      <span className="text-white/40" style={{ fontSize: 'var(--text-xs)' }}>
        ↵ Abrir
      </span>
    )}
  </button>
))
SearchResultItem.displayName = 'SearchResultItem'

export const SpotlightSearch = memo(({ isOpen, onClose }: SpotlightSearchProps) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { openWindow } = useWindowStore()

  const allItems = useMemo(() => [...DESKTOP_ICONS, ...SIDEBAR_ICONS], [])

  const results = useMemo((): SearchResult[] => {
    if (!query.trim()) {
      return allItems.slice(0, 5).map(item => ({
        id: item.id,
        name: item.name,
        type: item.type as SearchResult['type'],
        icon: item.icon === 'hdd' ? (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-gray-200 to-gray-400 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/>
            </svg>
          </div>
        ) : (
          <img src={item.icon} alt={item.name} className="w-8 h-8 object-contain" />
        ),
        action: () => {
          if (item.action === 'window' && item.windowId) {
            openWindow(item.windowId)
          } else if (item.action === 'link' && item.url) {
            window.open(item.url, '_blank')
          }
          onClose()
        }
      }))
    }

    const filtered = allItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )

    return filtered.map(item => ({
      id: item.id,
      name: item.name,
      type: item.type as SearchResult['type'],
      icon: item.icon === 'hdd' ? (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-gray-200 to-gray-400 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/>
          </svg>
        </div>
      ) : (
        <img src={item.icon} alt={item.name} className="w-8 h-8 object-contain" />
      ),
      action: () => {
        if (item.action === 'window' && item.windowId) {
          openWindow(item.windowId)
        } else if (item.action === 'link' && item.url) {
          window.open(item.url, '_blank')
        }
        onClose()
      }
    }))
  }, [query, allItems, openWindow, onClose])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        results[selectedIndex].action()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, results, selectedIndex])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div
        ref={containerRef}
        className="relative w-[600px] bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in"
      >
        <div className="flex items-center gap-3 border-b border-white/10" style={{ padding: 'var(--space-4)' }}>
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en Spotlight"
            className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-white/40"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div style={{ padding: 'var(--space-2)', maxHeight: '400px', overflowY: 'auto' }}>
            <p className="text-white/40 uppercase tracking-wider px-3 py-2" style={{ fontSize: '10px' }}>
              {query ? 'Resultados' : 'Sugerencias'}
            </p>
            {results.map((result, index) => (
              <SearchResultItem
                key={result.id}
                result={result}
                isSelected={index === selectedIndex}
                onClick={result.action}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-white/40 py-12">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No se encontraron resultados</p>
          </div>
        )}

        <div
          className="border-t border-white/10 flex items-center justify-between text-white/40"
          style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-xs)' }}
        >
          <span>Usa ↑↓ para navegar</span>
          <span>↵ para abrir • Esc para cerrar</span>
        </div>
      </div>
    </div>
  )
})
SpotlightSearch.displayName = 'SpotlightSearch'

export default SpotlightSearch
