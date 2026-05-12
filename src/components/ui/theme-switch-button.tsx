'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

declare global {
  interface Document {
    startViewTransition?: (cb: () => void) => void
  }
}

interface ThemeSwitchProps {
  className?: string
}

export function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark')

  React.useEffect(() => {
    const saved = localStorage.getItem('theme')
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const resolved = (saved ?? preferred) as 'light' | 'dark'
    setTheme(resolved)
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [])

  const toggleTheme = React.useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light'
    const root = document.documentElement

    const apply = () => {
      root.classList.toggle('dark', next === 'dark')
      localStorage.setItem('theme', next)
      setTheme(next)
    }

    if (document.startViewTransition) {
      document.startViewTransition(apply)
      return
    }

    // Fallback: add transition class one frame before the theme change
    root.classList.add('theme-transitioning')
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        apply()
        setTimeout(() => root.classList.remove('theme-transitioning'), 500)
      })
    )
  }, [theme])

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-primary)] hover:opacity-80 transition-opacity overflow-hidden ${className}`}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === 'light'
            ? 'scale-100 translate-y-0 opacity-100'
            : 'scale-50 translate-y-5 opacity-0'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === 'dark'
            ? 'scale-100 translate-y-0 opacity-100'
            : 'scale-50 translate-y-5 opacity-0'
        }`}
      />
    </button>
  )
}
