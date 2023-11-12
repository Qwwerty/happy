import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import NextLink, { LinkProps } from 'next/link'

interface ButtonProps extends LinkProps {
  children: ReactNode
  className?: string
}

export function Link({ children, className = '', ...props }: ButtonProps) {
  return (
    <NextLink
      className={twMerge(
        'flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-400 transition-colors hover:bg-blue-300 lg:bottom-10 lg:right-10',
        className,
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}
