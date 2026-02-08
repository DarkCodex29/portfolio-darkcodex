import { useState, useEffect, useMemo, memo } from 'react'

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

interface Notification {
  id: string
  app: string
  icon: string
  title: string
  message: string
  time: string
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    app: 'VS Code',
    icon: '/icons/win11/vscode.png',
    title: 'Extensión actualizada',
    message: 'Prettier se actualizó a la versión 9.0.0',
    time: 'Hace 5 min',
  },
  {
    id: '2',
    app: 'Chrome',
    icon: '/icons/win11/chrome.png',
    title: 'Nueva descarga',
    message: 'proyecto-final.zip se descargó correctamente',
    time: 'Hace 1 hora',
  },
]

export const NotificationCenter = memo(({ isOpen, onClose }: NotificationCenterProps) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false })

  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ]

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const days: (number | null)[] = []

    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }, [currentYear, currentMonth])

  const isToday = (day: number | null) => {
    if (!day) return false
    const today = new Date()
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    )
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-[80]" onClick={onClose} />
      <div className="fixed bottom-14 right-2 w-96 bg-black/60 backdrop-blur-3xl rounded-xl border border-white/10 shadow-2xl z-[90] animate-fade-in overflow-hidden">
        <div style={{ padding: 'var(--space-4)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-sm">Notificaciones</h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {MOCK_NOTIFICATIONS.length > 0 ? (
            <div className="space-y-2 mb-4">
              {MOCK_NOTIFICATIONS.map((notif) => (
                <div
                  key={notif.id}
                  className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <img src={notif.icon} alt={notif.app} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white text-xs font-medium">{notif.app}</p>
                        <p className="text-white/50 text-[10px]">{notif.time}</p>
                      </div>
                      <p className="text-white text-xs font-medium mb-0.5">{notif.title}</p>
                      <p className="text-white/70 text-xs">{notif.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/50 text-sm">No hay notificaciones</p>
            </div>
          )}

          <div className="border-t border-white/10 pt-4">
            <div className="text-center mb-4">
              <p className="text-white text-4xl font-light mb-1">{formatTime(currentTime)}</p>
              <p className="text-white/70 text-sm capitalize">{formatDate(currentTime)}</p>
            </div>

            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={handlePrevMonth}
                  className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                >
                  ‹
                </button>
                <span className="text-white text-sm font-medium">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center text-white transition-colors"
                >
                  ›
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
                  <div key={i} className="text-white/50 text-xs font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <button
                    key={index}
                    disabled={!day}
                    className={`aspect-square rounded text-xs transition-colors ${
                      day
                        ? isToday(day)
                          ? 'bg-primary-500 text-white font-bold'
                          : 'text-white hover:bg-white/10'
                        : ''
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})
NotificationCenter.displayName = 'NotificationCenter'

export default NotificationCenter
