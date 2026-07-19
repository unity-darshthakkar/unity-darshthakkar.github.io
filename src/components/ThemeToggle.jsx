import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 text-fg backdrop-blur transition-colors hover:border-accent/60 cursor-pointer"
    >
      <span className="relative block h-[18px] w-[18px]">
        <Sun
          size={18}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          size={18}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </span>
    </button>
  )
}
