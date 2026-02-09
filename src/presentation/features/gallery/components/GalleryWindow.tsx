import { memo, useState, useCallback, useMemo } from 'react'
import { WindowWrapper } from '@/presentation/components/layout/WindowWrapper'
import { GALLERY, PROJECTS, type GalleryImage } from '@/core/constants/profile'
import { useLanguageStore } from '@/application/store/useLanguageStore'
import { Search, Grid, LayoutGrid, Image, Smartphone, Globe, Building2 } from 'lucide-react'

type Category = 'all' | 'mobile' | 'web' | 'enterprise'

interface CategoryItem {
  id: Category
  icon: React.ReactNode
  label: string
}

const GalleryToolbar = memo(() => {
  const { translations } = useLanguageStore()

  return (
  <div
    className="flex items-center justify-between bg-gray-800/30 border-b border-white/10"
    style={{ padding: 'var(--space-2) var(--space-4)' }}
  >
    <div className="flex items-center" style={{ gap: 'var(--space-2)' }}>
      <button className="rounded hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors" style={{ padding: 'var(--space-1)' }}>
        <Grid style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
      </button>
    </div>
    <h2 className="font-medium text-white/80" style={{ fontSize: 'var(--text-sm)' }}>{translations.windows.gallery.header}</h2>
    <div className="flex items-center" style={{ gap: 'var(--space-2)' }}>
      <Search style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} className="text-white/40" />
    </div>
  </div>
  )
})
GalleryToolbar.displayName = 'GalleryToolbar'

interface GallerySidebarProps {
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
}

const GallerySidebar = memo(({ selectedCategory, onCategoryChange }: GallerySidebarProps) => {
  const { translations } = useLanguageStore()

  const categories: CategoryItem[] = useMemo(() => [
    { id: 'all', icon: <LayoutGrid style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />, label: translations.windows.gallery.all },
    { id: 'mobile', icon: <Smartphone style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />, label: translations.windows.gallery.mobile },
    { id: 'web', icon: <Globe style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />, label: translations.windows.gallery.web },
    { id: 'enterprise', icon: <Building2 style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />, label: translations.windows.gallery.enterprise },
  ], [translations])

  return (
  <div
    className="w-40 shrink-0 border-r border-white/10 overflow-y-auto"
    style={{ paddingRight: 'var(--space-4)', minHeight: 0 }}
  >
    <p
      className="text-white/40 uppercase tracking-wider font-medium"
      style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-4)' }}
    >
      {translations.windows.gallery.categories}
    </p>
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
      {categories.map((category) => (
        <li key={category.id}>
          <button
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left transition-colors flex items-center ${
              selectedCategory === category.id
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            style={{
              fontSize: 'var(--text-sm)',
              padding: 'var(--sidebar-item-padding-y) var(--sidebar-item-padding-x)',
              gap: 'var(--sidebar-item-gap)',
              borderRadius: 'var(--sidebar-item-radius)'
            }}
          >
            {category.icon}
            <span>{category.label}</span>
          </button>
        </li>
      ))}
    </ul>
  </div>
  )
})
GallerySidebar.displayName = 'GallerySidebar'

interface GalleryItemProps {
  image: GalleryImage
  onClick: () => void
}

const GalleryItem = memo(({ image, onClick }: GalleryItemProps) => {
  const project = PROJECTS.find(p => p.id === image.projectId)

  return (
    <button
      onClick={onClick}
      className="group relative aspect-video overflow-hidden bg-gray-800/50 border border-white/10 hover:border-white/30 transition-all duration-200 hover:scale-[1.02]"
      style={{ borderRadius: 'var(--radius-lg)' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center justify-center"
          style={{ width: 'var(--icon-3xl)', height: 'var(--icon-3xl)', borderRadius: 'var(--radius-xl)', backgroundColor: `${project?.color}20` }}
        >
          <Image style={{ width: 'var(--icon-xl)', height: 'var(--icon-xl)', color: project?.color }} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent" style={{ padding: 'var(--space-3)' }}>
        <p className="text-white font-medium truncate" style={{ fontSize: 'var(--text-sm)' }}>{image.title}</p>
        <p className="text-white/50" style={{ fontSize: 'var(--text-xs)' }}>{project?.sector}</p>
      </div>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: `${project?.color}10` }}
      />
    </button>
  )
})
GalleryItem.displayName = 'GalleryItem'

interface GalleryGridProps {
  images: GalleryImage[]
  onImageClick: (image: GalleryImage) => void
}

const GalleryGrid = memo(({ images, onImageClick }: GalleryGridProps) => {
  const { translations } = useLanguageStore()

  return (
  <div
    style={{
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      paddingLeft: 'var(--space-4)',
    }}
  >
    <div className="grid grid-cols-2" style={{ gap: 'var(--space-4)' }}>
      {images.map((image) => (
        <GalleryItem
          key={image.id}
          image={image}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
    {images.length === 0 && (
      <div className="flex flex-col items-center justify-center h-full text-white/40">
        <Image style={{ width: 'var(--icon-3xl)', height: 'var(--icon-3xl)', marginBottom: 'var(--space-3)' }} />
        <p style={{ fontSize: 'var(--text-sm)' }}>{translations.windows.gallery.noImages}</p>
      </div>
    )}
  </div>
  )
})
GalleryGrid.displayName = 'GalleryGrid'

const GalleryHeader = memo(() => {
  const { translations } = useLanguageStore()

  return (
  <div
    className="flex items-center border-b border-white/10 shrink-0"
    style={{ gap: 'var(--space-4)', paddingBottom: 'var(--window-gap)' }}
  >
    <div
      className="rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center shadow-lg"
      style={{ width: 'var(--icon-3xl)', height: 'var(--icon-3xl)' }}
    >
      <svg style={{ width: 'var(--icon-lg)', height: 'var(--icon-lg)' }} className="text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <div>
      <h2 className="font-semibold text-white" style={{ fontSize: 'var(--text-lg)' }}>{translations.windows.gallery.header}</h2>
      <p className="text-white/50" style={{ fontSize: 'var(--text-sm)' }}>{GALLERY.length} {translations.windows.gallery.screenshotsCount}</p>
    </div>
  </div>
  )
})
GalleryHeader.displayName = 'GalleryHeader'

const GalleryContent = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const filteredImages = selectedCategory === 'all'
    ? GALLERY
    : GALLERY.filter(img => img.category === selectedCategory)

  const handleImageClick = useCallback((image: GalleryImage) => {
    setSelectedImage(image)
  }, [])

  const handleCategoryChange = useCallback((category: Category) => {
    setSelectedCategory(category)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <GalleryToolbar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: 'var(--window-gap)', padding: 'var(--window-padding)' }}>
        <GalleryHeader />
        <div style={{ display: 'flex', flex: 1, gap: 'var(--window-gap)', minHeight: 0 }}>
          <GallerySidebar
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <GalleryGrid
            images={filteredImages}
            onImageClick={handleImageClick}
          />
        </div>
      </div>
    </div>
  )
})
GalleryContent.displayName = 'GalleryContent'

export const GalleryWindow = memo(() => {
  const { translations } = useLanguageStore()

  return (
    <WindowWrapper windowKey="photos" title={translations.windows.gallery.title} className="w-[700px] h-[500px]">
      <GalleryContent />
    </WindowWrapper>
  )
})
GalleryWindow.displayName = 'GalleryWindow'

export default GalleryWindow
