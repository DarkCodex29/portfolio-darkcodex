import { useState, useEffect, useRef, memo } from 'react'

interface WindowsSearchProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  id: string
  title: string
  subtitle: string
  icon: string
  category: string
  action: () => void
}

export const WindowsSearch = memo(({ isOpen, onClose }: WindowsSearchProps) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  const allResults: SearchResult[] = [
    {
      id: 'settings',
      title: 'Configuración',
      subtitle: 'Aplicación del sistema',
      icon: '/icons/win11/settings.png',
      category: 'Aplicaciones',
      action: () => console.log('Abrir Configuración'),
    },
    {
      id: 'explorer',
      title: 'Explorador de archivos',
      subtitle: 'Aplicación del sistema',
      icon: '/icons/win11/explorer.png',
      category: 'Aplicaciones',
      action: () => console.log('Abrir Explorador'),
    },
    {
      id: 'terminal',
      title: 'Terminal',
      subtitle: 'Aplicación del sistema',
      icon: '/icons/win11/notepad.png',
      category: 'Aplicaciones',
      action: () => console.log('Abrir Terminal'),
    },
    {
      id: 'vscode',
      title: 'Visual Studio Code',
      subtitle: 'Aplicación',
      icon: '/icons/win11/vscode.png',
      category: 'Aplicaciones',
      action: () => console.log('Abrir VS Code'),
    },
    {
      id: 'chrome',
      title: 'Google Chrome',
      subtitle: 'Aplicación',
      icon: '/icons/win11/chrome.png',
      category: 'Aplicaciones',
      action: () => console.log('Abrir Chrome'),
    },
    {
      id: 'doc1',
      title: 'CV_Gianpierre.pdf',
      subtitle: 'Documentos',
      icon: '/images/pdf.png',
      category: 'Archivos',
      action: () => console.log('Abrir CV'),
    },
    {
      id: 'folder1',
      title: 'Proyectos',
      subtitle: 'Carpeta',
      icon: '/icons/win11/folder.png',
      category: 'Archivos',
      action: () => console.log('Abrir Proyectos'),
    },
  ]

  const results = query
    ? allResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : allResults.slice(0, 5)

  useEffect(() => {
    if (selectedIndex >= results.length) {
      setSelectedIndex(Math.max(0, results.length - 1))
    }
  }, [results.length, selectedIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        results[selectedIndex].action()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, results, selectedIndex])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" onClick={onClose} />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] bg-black/60 backdrop-blur-3xl rounded-xl border border-white/10 shadow-2xl z-[110] animate-fade-in overflow-hidden">
        <div className="border-b border-white/10" style={{ padding: 'var(--space-4)' }}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar aplicaciones, configuración y documentos"
              className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
            />
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto" style={{ padding: 'var(--space-2)' }}>
          {results.length > 0 ? (
            <>
              <div className="px-3 py-2">
                <p className="text-white/50 text-xs font-medium">
                  {query ? 'Resultados de búsqueda' : 'Sugerencias'}
                </p>
              </div>
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => {
                    result.action()
                    onClose()
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    index === selectedIndex ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={result.icon} alt={result.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white text-sm font-medium">{result.title}</p>
                    <p className="text-white/60 text-xs">{result.subtitle}</p>
                  </div>
                  <span className="text-white/40 text-xs">{result.category}</span>
                </button>
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/50 text-sm">No se encontraron resultados</p>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 bg-white/5 px-4 py-2">
          <p className="text-white/40 text-xs">
            Usa <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">↑↓</kbd> para navegar,{' '}
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/60">Enter</kbd> para abrir
          </p>
        </div>
      </div>
    </>
  )
})
WindowsSearch.displayName = 'WindowsSearch'

export default WindowsSearch
