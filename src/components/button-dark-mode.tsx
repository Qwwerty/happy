'use client'

import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ButtonDarkMode({ className }: ComponentProps<'button'>) {
  const { theme, setTheme } = useTheme()

  const icon = theme === 'dark' ? <Sun /> : <Moon />
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

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
