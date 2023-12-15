'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ComponentProps, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export function ButtonDarkMode({ className }: ComponentProps<'button'>) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme, setTheme } = useTheme()

  const icon = theme === 'dark' ? <Sun /> : <Moon />
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null
  }

  return (
    <motion.button
      whileHover={{ scale: 1.5, y: 10 }}
      type="button"
      onClick={toggleTheme}
      className={twMerge(
        'flex h-10 w-10 items-center justify-center rounded-md text-white  transition-colors hover:bg-zinc-900/10',
        className,
      )}
    >
      {icon}
    </motion.button>
  )
}
