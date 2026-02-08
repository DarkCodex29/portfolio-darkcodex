import { memo, useState, useRef, useEffect, useMemo } from 'react'

interface CalendarDropdownProps {
  isOpen: boolean
  onClose: () => void
}

const DAYS_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

export const CalendarDropdown = memo(({ isOpen, onClose }: CalendarDropdownProps) => {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentTime, setCurrentTime] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

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

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1)

    const days: { day: number; isCurrentMonth: boolean; isToday: boolean }[] = []

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false
      })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday
      })
    }

    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: false
      })
    }

    return days
  }, [currentYear, currentMonth, today])

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (!isOpen) return null

  return (
    <div
      ref={containerRef}
      className="absolute top-8 right-2 w-72 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl z-[100] animate-fade-in overflow-hidden"
    >
      <div
        className="text-center border-b border-white/10"
        style={{ padding: 'var(--space-4)' }}
      >
        <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
          {formatFullDate(currentTime).split(',')[0]}
        </p>
        <p className="text-white text-3xl font-light">
          {formatTime(currentTime)}
        </p>
        <p className="text-white/60 text-sm mt-1 capitalize">
          {formatFullDate(currentTime).split(',').slice(1).join(',')}
        </p>
      </div>

      <div style={{ padding: 'var(--space-3)' }}>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={goToPrevMonth}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToToday}
            className="text-white font-medium hover:text-primary-400 transition-colors"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            {MONTHS[currentMonth]} {currentYear}
          </button>
          <button
            onClick={goToNextMonth}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_SHORT.map((day) => (
            <div
              key={day}
              className="text-center text-white/40 font-medium"
              style={{ fontSize: '10px', padding: 'var(--space-1)' }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <button
              key={index}
              className={`
                aspect-square flex items-center justify-center rounded-full transition-all
                ${day.isToday
                  ? 'bg-primary-500 text-white font-bold'
                  : day.isCurrentMonth
                    ? 'text-white/90 hover:bg-white/10'
                    : 'text-white/30'
                }
              `}
              style={{ fontSize: '11px' }}
            >
              {day.day}
            </button>
          ))}
        </div>
      </div>

      <div
        className="border-t border-white/10 flex items-center justify-between"
        style={{ padding: 'var(--space-3)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-white/60" style={{ fontSize: 'var(--text-xs)' }}>
            Sin eventos hoy
          </span>
        </div>
        <button
          className="text-primary-400 hover:text-primary-300 transition-colors"
          style={{ fontSize: 'var(--text-xs)' }}
        >
          Abrir Calendario
        </button>
      </div>
    </div>
  )
})
CalendarDropdown.displayName = 'CalendarDropdown'

export default CalendarDropdown
