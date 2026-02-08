import { t } from './translations'

export interface DesktopIcon {
  id: string
  name: string
  icon: string
  type: 'folder' | 'file' | 'link' | 'app'
  action?: 'window' | 'link' | 'back' | 'download'
  windowId?: string
  url?: string
  downloadUrl?: string
}

export interface DockApp {
  id: string
  name: string
  icon: string
  windowId?: string
}

export const DESKTOP_ICONS: DesktopIcon[] = [
  { id: 'projects', name: t.desktop.projects, icon: '/images/folder.png', type: 'folder', action: 'window', windowId: 'finder' },
  { id: 'about', name: t.desktop.aboutMe, icon: '/images/txt.png', type: 'file', action: 'window', windowId: 'about' },
  { id: 'resume', name: t.desktop.resume, icon: '/images/pdf.png', type: 'file', action: 'download', downloadUrl: '/CV_Gianpierre_Collazos.pdf' },
  { id: 'github', name: 'GitHub', icon: '/icons/github.svg', type: 'link', action: 'link', url: 'https://github.com/gianxs' },
  { id: 'linkedin', name: 'LinkedIn', icon: '/icons/linkedin.svg', type: 'link', action: 'link', url: 'https://linkedin.com/in/gianpierre-collazos' },
]

export const SIDEBAR_ICONS: DesktopIcon[] = [
  { id: 'macintosh', name: 'Macintosh HD', icon: 'hdd', type: 'app' },
  { id: 'experience', name: t.desktop.experience, icon: '/images/folder.png', type: 'folder', action: 'window', windowId: 'safari' },
  { id: 'skills', name: t.desktop.skills, icon: '/images/terminal.png', type: 'app', action: 'window', windowId: 'terminal' },
  { id: 'contact', name: t.desktop.contact, icon: '/images/contact.png', type: 'app', action: 'window', windowId: 'contact' },
]

export const DOCK_APPS: DockApp[] = [
  { id: 'finder', name: t.desktop.projects, icon: '/images/finder.png', windowId: 'finder' },
  { id: 'terminal', name: t.desktop.skills, icon: '/images/terminal.png', windowId: 'terminal' },
  { id: 'about', name: t.desktop.aboutMe, icon: '/images/contact.png', windowId: 'about' },
  { id: 'safari', name: t.desktop.experience, icon: '/images/safari.png', windowId: 'safari' },
  { id: 'contact', name: t.desktop.contact, icon: '/images/contact.png', windowId: 'contact' },
  { id: 'vscode', name: 'VS Code', icon: '/images/code2.png', windowId: 'vscode' },
  { id: 'photos', name: 'Galería', icon: '/images/photos.png', windowId: 'photos' },
  { id: 'music', name: 'Música', icon: '/images/music.png' },
  { id: 'trash', name: 'Papelera', icon: '/images/trash.png' },
]

export const MENU_ITEMS = t.menu

export const DESKTOP_CONFIG = {
  topBar: {
    height: 28,
    blur: 24,
  },
  dock: {
    iconSize: 48,
    gap: 4,
    padding: 12,
  },
  icon: {
    size: 56,
    labelMaxWidth: 70,
  },
} as const
